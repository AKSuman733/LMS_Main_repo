import Course from "../models/Course.js";
import CourseEnrollment from "../models/CourseEnrollment.js";
import Student from "../models/Student.js";

const buildLearningData = (course) => {
  const learningTopics = [];
  const learningSubTopics = [];

  for (const topic of course.curriculum || []) {
    const topicId = String(topic._id);
    learningTopics.push({ topicId, title: topic.title, isCompleted: false, completedAt: null });

    for (const subTopic of topic.subTopics || []) {
      learningSubTopics.push({
        topicId,
        subTopicId: String(subTopic._id),
        title: subTopic.title,
        isCompleted: false,
        completedAt: null,
      });
    }
  }

  return { learningTopics, learningSubTopics };
};

const syncLearningData = (enrollment) => {
  const course = enrollment.courseId;
  if (!course || !Array.isArray(course.curriculum)) return;

  const topicMap = new Map(enrollment.learningTopics.map((item) => [item.topicId, item]));
  const subTopicMap = new Map(
    enrollment.learningSubTopics.map((item) => [`${item.topicId}:${item.subTopicId}`, item])
  );

  enrollment.learningTopics = course.curriculum.map((topic) => {
    const topicId = String(topic._id);
    const saved = topicMap.get(topicId);
    return {
      topicId,
      title: topic.title,
      isCompleted: saved?.isCompleted || false,
      completedAt: saved?.completedAt || null,
    };
  });

  enrollment.learningSubTopics = course.curriculum.flatMap((topic) => {
    const topicId = String(topic._id);
    return (topic.subTopics || []).map((subTopic) => {
      const subTopicId = String(subTopic._id);
      const saved = subTopicMap.get(`${topicId}:${subTopicId}`);
      return {
        topicId,
        subTopicId,
        title: subTopic.title,
        isCompleted: saved?.isCompleted || false,
        completedAt: saved?.completedAt || null,
      };
    });
  });
};

const calculateProgress = (enrollment) => {
  const course = enrollment.courseId;
  if (!course?.curriculum?.length) return 0;

  const leafItems = [];
  for (const topic of course.curriculum) {
    const topicId = String(topic._id);
    if (topic.subTopics?.length) {
      for (const subTopic of topic.subTopics) {
        leafItems.push({ type: "subTopic", topicId, subTopicId: String(subTopic._id) });
      }
    } else {
      leafItems.push({ type: "topic", topicId });
    }
  }

  if (!leafItems.length) return 0;

  const completed = leafItems.filter((item) => {
    if (item.type === "topic") {
      return enrollment.learningTopics.some(
        (topic) => topic.topicId === item.topicId && topic.isCompleted
      );
    }
    return enrollment.learningSubTopics.some(
      (sub) =>
        sub.topicId === item.topicId &&
        sub.subTopicId === item.subTopicId &&
        sub.isCompleted
    );
  }).length;

  return Math.round((completed / leafItems.length) * 100);
};

const updateParentTopics = (enrollment) => {
  const course = enrollment.courseId;
  if (!course?.curriculum?.length) return;

  for (const topic of course.curriculum) {
    if (!topic.subTopics?.length) continue;
    const topicId = String(topic._id);
    const children = enrollment.learningSubTopics.filter((sub) => sub.topicId === topicId);
    const allDone = children.length > 0 && children.every((sub) => sub.isCompleted);
    const parent = enrollment.learningTopics.find((item) => item.topicId === topicId);
    if (parent) {
      parent.isCompleted = allDone;
      parent.completedAt = allDone ? parent.completedAt || new Date() : null;
    }
  }
};

const updateCertificateEligibility = (enrollment) => {
  const course = enrollment.courseId;
  const rules = course?.certificateRules || {};
  const minProgress = Number(rules.minimumProgress ?? 100);
  const passingPercentage = Number(rules.passingPercentage ?? 70);
  const quizRequired = rules.quizRequired !== false;
  const assignmentRequired = rules.assignmentRequired !== false;

  const quizPassed =
    !quizRequired ||
    (enrollment.quiz.status === "Completed" && enrollment.quiz.percentage >= passingPercentage);
  const assignmentDone = !assignmentRequired || ["Submitted", "Reviewed"].includes(enrollment.assignment.status);

  enrollment.certificateEligible =
    Boolean(course?.certificateIncluded) &&
    enrollment.progress >= minProgress &&
    quizPassed &&
    assignmentDone;

  enrollment.enrollmentStatus = enrollment.progress >= 100 ? "Completed" : "Active";
  enrollment.completedAt = enrollment.progress >= 100 ? enrollment.completedAt || new Date() : null;
};

const updateStudentLearningSummary = async (enrollment, addPayment = false) => {
  const student = await Student.findOne({ email: enrollment.email });
  if (!student) return;

  student.courseId = enrollment.courseId?._id || enrollment.courseId;
  student.courseName = enrollment.courseTitle;
  student.progress = enrollment.progress;
  if (addPayment) {
    student.totalSpent = Number(student.totalSpent || 0) + Number(enrollment.amountPaid || 0);
  }
  student.certificateEarned = enrollment.certificateIssued || false;
  await student.save();
};

const populatedEnrollment = (id) =>
  CourseEnrollment.findById(id).populate("courseId").populate("mentorId");

export const getCourseEnrollments = async (_req, res) => {
  try {
    const enrollments = await CourseEnrollment.find()
      .populate("courseId")
      .populate("mentorId")
      .sort({ createdAt: -1 });
    res.json({ success: true, count: enrollments.length, data: enrollments });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch course enrollments", error: error.message });
  }
};

export const getCourseEnrollmentById = async (req, res) => {
  try {
    const enrollment = await populatedEnrollment(req.params.id);
    if (!enrollment) return res.status(404).json({ success: false, message: "Enrollment not found" });

    syncLearningData(enrollment);
    enrollment.progress = calculateProgress(enrollment);
    updateParentTopics(enrollment);
    updateCertificateEligibility(enrollment);
    await enrollment.save();

    const refreshed = await populatedEnrollment(enrollment._id);
    res.json({ success: true, data: refreshed });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch enrollment", error: error.message });
  }
};

export const getEnrollmentsByStudentEmail = async (req, res) => {
  try {
    const email = req.params.email?.toLowerCase()?.trim();
    const enrollments = await CourseEnrollment.find({ email })
      .populate("courseId")
      .populate("mentorId")
      .sort({ createdAt: -1 });
    res.json({ success: true, count: enrollments.length, data: enrollments });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch student enrollments", error: error.message });
  }
};

export const createCourseEnrollment = async (req, res) => {
  try {
    const { studentName, email, phone, courseId, mentorId, mentorName, mentorRole, paymentStatus, amountPaid } = req.body || {};
    if (!studentName || !email || !courseId) {
      return res.status(400).json({ success: false, message: "Student name, email and courseId are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ success: false, message: "Course not found" });

    const alreadyEnrolled = await CourseEnrollment.findOne({ email: normalizedEmail, courseId });
    if (alreadyEnrolled) {
      const existing = await populatedEnrollment(alreadyEnrolled._id);
      return res.json({ success: true, message: "Already enrolled in this course", data: existing });
    }

    const learningData = buildLearningData(course);
    const enrollment = await CourseEnrollment.create({
      studentName,
      email: normalizedEmail,
      phone: phone || "",
      courseId,
      courseTitle: course.title,
      courseCategory: course.category || "",
      courseLevel: course.level || "",
      courseDuration: course.duration || "",
      mentorId: mentorId || course.mentorId || null,
      mentorName: mentorName || course.mentorName || "",
      mentorRole: mentorRole || "",
      paymentStatus: paymentStatus || (course.isFree ? "Free" : "Paid"),
      amountPaid: Number(amountPaid || 0),
      ...learningData,
    });

    await updateStudentLearningSummary(enrollment, true);
    const result = await populatedEnrollment(enrollment._id);
    res.status(201).json({ success: true, message: "Course enrolled successfully", data: result });
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ success: true, message: "Already enrolled in this course" });
    }
    res.status(400).json({ success: false, message: "Failed to enroll course", error: error.message });
  }
};

export const updateLearningProgress = async (req, res) => {
  try {
    const { type, topicId, subTopicId, isCompleted } = req.body || {};
    const enrollment = await populatedEnrollment(req.params.id);
    if (!enrollment) return res.status(404).json({ success: false, message: "Enrollment not found" });

    syncLearningData(enrollment);

    if (type === "topic") {
      const topic = enrollment.learningTopics.find((item) => item.topicId === String(topicId));
      if (!topic) return res.status(404).json({ success: false, message: "Topic not found" });
      topic.isCompleted = Boolean(isCompleted);
      topic.completedAt = isCompleted ? new Date() : null;
    } else if (type === "subTopic") {
      const sub = enrollment.learningSubTopics.find(
        (item) => item.topicId === String(topicId) && item.subTopicId === String(subTopicId)
      );
      if (!sub) return res.status(404).json({ success: false, message: "Subtopic not found" });
      sub.isCompleted = Boolean(isCompleted);
      sub.completedAt = isCompleted ? new Date() : null;
    } else {
      return res.status(400).json({ success: false, message: "Invalid progress type" });
    }

    updateParentTopics(enrollment);
    enrollment.progress = calculateProgress(enrollment);
    updateCertificateEligibility(enrollment);
    await enrollment.save();
    await updateStudentLearningSummary(enrollment);

    const result = await populatedEnrollment(enrollment._id);
    res.json({ success: true, message: "Progress updated successfully", data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to update progress", error: error.message });
  }
};

export const updateQuizStatus = async (req, res) => {
  try {
    const { status, score, totalMarks } = req.body || {};
    const enrollment = await populatedEnrollment(req.params.id);
    if (!enrollment) return res.status(404).json({ success: false, message: "Enrollment not found" });

    enrollment.quiz.status = status || enrollment.quiz.status;
    enrollment.quiz.score = Number(score ?? enrollment.quiz.score ?? 0);
    enrollment.quiz.totalMarks = Number(totalMarks ?? enrollment.quiz.totalMarks ?? 0);
    enrollment.quiz.percentage = enrollment.quiz.totalMarks > 0
      ? Math.round((enrollment.quiz.score / enrollment.quiz.totalMarks) * 100)
      : 0;

    if (status === "In Progress") enrollment.quiz.attemptedAt = new Date();
    if (status === "Completed") enrollment.quiz.completedAt = new Date();

    updateCertificateEligibility(enrollment);
    await enrollment.save();
    const result = await populatedEnrollment(enrollment._id);
    res.json({ success: true, message: "Quiz updated successfully", data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to update quiz", error: error.message });
  }
};

export const updateAssignmentStatus = async (req, res) => {
  try {
    const { status, title, submissionUrl, feedback, marks } = req.body || {};
    const enrollment = await populatedEnrollment(req.params.id);
    if (!enrollment) return res.status(404).json({ success: false, message: "Enrollment not found" });

    enrollment.assignment.status = status || enrollment.assignment.status;
    enrollment.assignment.title = title ?? enrollment.assignment.title;
    enrollment.assignment.submissionUrl = submissionUrl ?? enrollment.assignment.submissionUrl;
    enrollment.assignment.feedback = feedback ?? enrollment.assignment.feedback;
    enrollment.assignment.marks = Number(marks ?? enrollment.assignment.marks ?? 0);
    if (status === "Submitted") enrollment.assignment.submittedAt = new Date();
    if (status === "Reviewed") enrollment.assignment.reviewedAt = new Date();

    updateCertificateEligibility(enrollment);
    await enrollment.save();
    const result = await populatedEnrollment(enrollment._id);
    res.json({ success: true, message: "Assignment updated successfully", data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to update assignment", error: error.message });
  }
};

export const uploadAssignmentFile = async (req, res) => {
  try {
    const enrollment = await populatedEnrollment(req.params.id);
    if (!enrollment) return res.status(404).json({ success: false, message: "Enrollment not found" });
    if (!req.file) return res.status(400).json({ success: false, message: "Please select a file" });

    enrollment.assignment.status = "Submitted";
    enrollment.assignment.uploadedFileUrl = `/uploads/assignments/${req.file.filename}`;
    enrollment.assignment.originalFileName = req.file.originalname;
    enrollment.assignment.submittedAt = new Date();
    updateCertificateEligibility(enrollment);
    await enrollment.save();

    const result = await populatedEnrollment(enrollment._id);
    res.json({ success: true, message: "Assignment file uploaded successfully", data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to upload assignment", error: error.message });
  }
};

export const saveNotes = async (req, res) => {
  try {
    const enrollment = await CourseEnrollment.findById(req.params.id);
    if (!enrollment) return res.status(404).json({ success: false, message: "Enrollment not found" });
    enrollment.notes = String(req.body?.notes || "");
    await enrollment.save();
    res.json({ success: true, message: "Notes saved", data: enrollment.notes });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to save notes", error: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { name, email, message } = req.body || {};
    if (!message?.trim()) return res.status(400).json({ success: false, message: "Comment is required" });
    const enrollment = await CourseEnrollment.findById(req.params.id);
    if (!enrollment) return res.status(404).json({ success: false, message: "Enrollment not found" });

    enrollment.comments.unshift({ name: name || "Student", email: email || "", message: message.trim() });
    await enrollment.save();
    res.status(201).json({ success: true, message: "Comment added", data: enrollment.comments });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to add comment", error: error.message });
  }
};

export const deleteCourseEnrollment = async (req, res) => {
  try {
    const enrollment = await CourseEnrollment.findByIdAndDelete(req.params.id);
    if (!enrollment) return res.status(404).json({ success: false, message: "Enrollment not found" });
    res.json({ success: true, message: "Enrollment deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete enrollment", error: error.message });
  }
};
