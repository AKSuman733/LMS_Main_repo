import Course from "../models/Course.js";
import CourseEnrollment from "../models/CourseEnrollment.js";
import Student from "../models/Student.js";

const buildLearningData = (course) => {
  const learningTopics = [];
  const learningSubTopics = [];

  if (Array.isArray(course.curriculum)) {
    course.curriculum.forEach((topic) => {
      const topicId = String(topic._id);

      learningTopics.push({
        topicId,
        title: topic.title,
        isCompleted: false,
        completedAt: null,
      });

      if (Array.isArray(topic.subTopics)) {
        topic.subTopics.forEach((subTopic) => {
          learningSubTopics.push({
            topicId,
            subTopicId: String(subTopic._id),
            title: subTopic.title,
            isCompleted: false,
            completedAt: null,
          });
        });
      }
    });
  }

  return {
    learningTopics,
    learningSubTopics,
  };
};

const calculateProgress = (enrollment) => {
  const totalTopics = enrollment.learningTopics.length;
  const totalSubTopics = enrollment.learningSubTopics.length;
  const totalItems = totalTopics + totalSubTopics;

  if (totalItems === 0) {
    return 0;
  }

  const completedTopics = enrollment.learningTopics.filter(
    (topic) => topic.isCompleted
  ).length;

  const completedSubTopics = enrollment.learningSubTopics.filter(
    (subTopic) => subTopic.isCompleted
  ).length;

  return Math.round(((completedTopics + completedSubTopics) / totalItems) * 100);
};

const updateStudentLearningSummary = async (enrollment) => {
  const student = await Student.findOne({ email: enrollment.email });

  if (!student) return;

  student.courseId = enrollment.courseId;
  student.courseName = enrollment.courseTitle;
  student.progress = enrollment.progress;
  student.totalSpent = Number(student.totalSpent || 0) + Number(enrollment.amountPaid || 0);
  student.certificateEarned = enrollment.certificateIssued || false;

  await student.save();
};

export const getCourseEnrollments = async (req, res) => {
  try {
    const enrollments = await CourseEnrollment.find()
      .populate("courseId")
      .populate("mentorId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: enrollments.length,
      data: enrollments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch course enrollments",
      error: error.message,
    });
  }
};

export const getCourseEnrollmentById = async (req, res) => {
  try {
    const enrollment = await CourseEnrollment.findById(req.params.id)
      .populate("courseId")
      .populate("mentorId");

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found",
      });
    }

    res.status(200).json({
      success: true,
      data: enrollment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch enrollment",
      error: error.message,
    });
  }
};

export const getEnrollmentsByStudentEmail = async (req, res) => {
  try {
    const email = req.params.email?.toLowerCase()?.trim();

    const enrollments = await CourseEnrollment.find({ email })
      .populate("courseId")
      .populate("mentorId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: enrollments.length,
      data: enrollments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch student enrollments",
      error: error.message,
    });
  }
};

export const createCourseEnrollment = async (req, res) => {
  try {
    const {
      studentName,
      email,
      phone,
      courseId,
      mentorId,
      mentorName,
      mentorRole,
      paymentStatus,
      amountPaid,
    } = req.body || {};

    if (!studentName || !email || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Student name, email and courseId are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const alreadyEnrolled = await CourseEnrollment.findOne({
      email: normalizedEmail,
      courseId,
    });

    if (alreadyEnrolled) {
      return res.status(200).json({
        success: true,
        message: "Already enrolled in this course",
        data: alreadyEnrolled,
      });
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
      learningTopics: learningData.learningTopics,
      learningSubTopics: learningData.learningSubTopics,
      progress: 0,
      enrollmentStatus: "Active",
    });

    await updateStudentLearningSummary(enrollment);

    res.status(201).json({
      success: true,
      message: "Course enrolled successfully",
      data: enrollment,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(200).json({
        success: true,
        message: "Already enrolled in this course",
      });
    }

    res.status(400).json({
      success: false,
      message: "Failed to enroll course",
      error: error.message,
    });
  }
};

export const updateLearningProgress = async (req, res) => {
  try {
    const { type, topicId, subTopicId, isCompleted } = req.body || {};

    const enrollment = await CourseEnrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found",
      });
    }

    if (type === "topic") {
      enrollment.learningTopics = enrollment.learningTopics.map((topic) => {
        if (topic.topicId === topicId) {
          return {
            ...topic.toObject?.() || topic,
            isCompleted: Boolean(isCompleted),
            completedAt: isCompleted ? new Date() : null,
          };
        }

        return topic;
      });
    }

    if (type === "subTopic") {
      enrollment.learningSubTopics = enrollment.learningSubTopics.map((subTopic) => {
        if (
          subTopic.topicId === topicId &&
          subTopic.subTopicId === subTopicId
        ) {
          return {
            ...subTopic.toObject?.() || subTopic,
            isCompleted: Boolean(isCompleted),
            completedAt: isCompleted ? new Date() : null,
          };
        }

        return subTopic;
      });
    }

    enrollment.progress = calculateProgress(enrollment);

    if (enrollment.progress >= 100) {
      enrollment.enrollmentStatus = "Completed";
      enrollment.certificateEligible = true;
      enrollment.completedAt = enrollment.completedAt || new Date();
    } else {
      enrollment.enrollmentStatus = "Active";
      enrollment.certificateEligible = false;
      enrollment.completedAt = null;
    }

    await enrollment.save();

    res.status(200).json({
      success: true,
      message: "Progress updated successfully",
      data: enrollment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update progress",
      error: error.message,
    });
  }
};

export const updateQuizStatus = async (req, res) => {
  try {
    const { status, score, totalMarks } = req.body || {};

    const enrollment = await CourseEnrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found",
      });
    }

    enrollment.quiz.status = status || enrollment.quiz.status;
    enrollment.quiz.score = Number(score || enrollment.quiz.score || 0);
    enrollment.quiz.totalMarks = Number(totalMarks || enrollment.quiz.totalMarks || 0);

    if (status === "In Progress") {
      enrollment.quiz.attemptedAt = new Date();
    }

    if (status === "Completed") {
      enrollment.quiz.completedAt = new Date();
    }

    await enrollment.save();

    res.status(200).json({
      success: true,
      message: "Quiz updated successfully",
      data: enrollment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update quiz",
      error: error.message,
    });
  }
};

export const updateAssignmentStatus = async (req, res) => {
  try {
    const { status, title, submissionUrl, feedback, marks } = req.body || {};

    const enrollment = await CourseEnrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found",
      });
    }

    enrollment.assignment.status = status || enrollment.assignment.status;
    enrollment.assignment.title = title || enrollment.assignment.title;
    enrollment.assignment.submissionUrl =
      submissionUrl || enrollment.assignment.submissionUrl;
    enrollment.assignment.feedback = feedback || enrollment.assignment.feedback;
    enrollment.assignment.marks = Number(marks || enrollment.assignment.marks || 0);

    if (status === "Submitted") {
      enrollment.assignment.submittedAt = new Date();
    }

    if (status === "Reviewed") {
      enrollment.assignment.reviewedAt = new Date();
    }

    await enrollment.save();

    res.status(200).json({
      success: true,
      message: "Assignment updated successfully",
      data: enrollment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update assignment",
      error: error.message,
    });
  }
};

export const deleteCourseEnrollment = async (req, res) => {
  try {
    const enrollment = await CourseEnrollment.findByIdAndDelete(req.params.id);

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Enrollment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete enrollment",
      error: error.message,
    });
  }
};