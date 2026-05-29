import CourseEnrollment from "../models/CourseEnrollment.js";
import Course from "../models/Course.js";
import Certificate from "../models/Certificate.js";

const getTodayDate = () => {
  return new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const generateCertificateNumber = () => {
  return `UPTO-CERT-${Date.now()}`;
};

const getTopicKey = (topicId, subTopicId = "") => {
  return subTopicId ? `${topicId}:${subTopicId}` : `${topicId}`;
};

const getCourseTotalItems = (course) => {
  if (!course || !Array.isArray(course.curriculum)) return 0;

  let total = 0;

  course.curriculum.forEach((topic) => {
    if (topic.subTopics && topic.subTopics.length > 0) {
      total += topic.subTopics.length;
    } else {
      total += 1;
    }
  });

  return total;
};

const calculateProgress = (enrollment) => {
  const course = enrollment.courseId;
  const totalItems = getCourseTotalItems(course);

  if (totalItems === 0) {
    return 0;
  }

  const completedCount = enrollment.completedTopics.length;
  const progress = Math.round((completedCount / totalItems) * 100);

  return Math.min(progress, 100);
};

const updateEnrollmentStatusByProgress = (enrollment) => {
  if (enrollment.progress >= 100) {
    enrollment.progress = 100;
    enrollment.status = "Completed";
    enrollment.certificateEligible = true;
    return;
  }

  if (enrollment.progress > 0) {
    enrollment.status = "Ongoing";
    enrollment.certificateEligible = false;
    return;
  }

  enrollment.status = "Enrolled";
  enrollment.certificateEligible = false;
};

const createCertificateIfEligible = async (enrollment) => {
  const existingCertificate = await Certificate.findOne({
    email: enrollment.email,
    title: enrollment.courseTitle,
    certificateType: "Course",
  });

  if (existingCertificate) {
    return existingCertificate;
  }

  const certificate = await Certificate.create({
    certificateNumber: generateCertificateNumber(),
    studentName: enrollment.studentName,
    email: enrollment.email,
    certificateType: "Course",
    title: enrollment.courseTitle,
    issuedDate: getTodayDate(),
    validTill: "Lifetime",
    status: "Valid",
    score: "100%",
    description: `Successfully completed the course ${enrollment.courseTitle}.`,
  });

  enrollment.certificateNumber = certificate.certificateNumber;
  enrollment.certificateEligible = true;
  await enrollment.save();

  return certificate;
};

export const getCourseEnrollments = async (req, res) => {
  try {
    const enrollments = await CourseEnrollment.find()
      .populate("courseId")
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

export const getEnrollmentsByStudentEmail = async (req, res) => {
  try {
    const email = req.params.email;

    const enrollments = await CourseEnrollment.find({ email })
      .populate("courseId")
      .sort({
        createdAt: -1,
      });

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
    const { courseId, studentName, email, phone } = req.body;

    if (!courseId || !studentName || !email) {
      return res.status(400).json({
        success: false,
        message: "courseId, studentName and email are required",
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const alreadyEnrolled = await CourseEnrollment.findOne({
      courseId,
      email,
    });

    if (alreadyEnrolled) {
      return res.status(400).json({
        success: false,
        message: "You are already enrolled in this course",
      });
    }

    const enrollment = await CourseEnrollment.create({
      courseId,
      courseTitle: course.title,
      studentName,
      email,
      phone: phone || "",
      completedTopics: [],
      progress: 0,
      status: "Enrolled",
      certificateEligible: false,
      certificateNumber: "",
      enrolledDate: getTodayDate(),
    });

    const populatedEnrollment = await CourseEnrollment.findById(
      enrollment._id
    ).populate("courseId");

    res.status(201).json({
      success: true,
      message: "Course enrollment successful",
      data: populatedEnrollment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to enroll in course",
      error: error.message,
    });
  }
};

export const toggleCourseTopicCompletion = async (req, res) => {
  try {
    const { topicId, subTopicId = "" } = req.body;

    if (!topicId) {
      return res.status(400).json({
        success: false,
        message: "topicId is required",
      });
    }

    const enrollment = await CourseEnrollment.findById(req.params.id).populate(
      "courseId"
    );

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found",
      });
    }

    const course = enrollment.courseId;

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course data not found",
      });
    }

    const topic = course.curriculum.find(
      (item) => String(item._id) === String(topicId)
    );

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: "Topic not found",
      });
    }

    let title = topic.title;

    if (subTopicId) {
      const subTopic = topic.subTopics.find(
        (item) => String(item._id) === String(subTopicId)
      );

      if (!subTopic) {
        return res.status(404).json({
          success: false,
          message: "Subtopic not found",
        });
      }

      title = `${topic.title} - ${subTopic.title}`;
    }

    const topicKey = getTopicKey(topicId, subTopicId);

    const alreadyCompleted = enrollment.completedTopics.some(
      (item) => item.topicKey === topicKey
    );

    if (alreadyCompleted) {
      enrollment.completedTopics = enrollment.completedTopics.filter(
        (item) => item.topicKey !== topicKey
      );
    } else {
      enrollment.completedTopics.push({
        topicKey,
        topicId,
        subTopicId,
        title,
        completedAt: new Date(),
      });
    }

    enrollment.progress = calculateProgress(enrollment);
    updateEnrollmentStatusByProgress(enrollment);

    await enrollment.save();

    let generatedCertificate = null;

    if (enrollment.progress >= 100) {
      generatedCertificate = await createCertificateIfEligible(enrollment);
    }

    const updatedEnrollment = await CourseEnrollment.findById(
      enrollment._id
    ).populate("courseId");

    res.status(200).json({
      success: true,
      message:
        updatedEnrollment.progress >= 100
          ? "Course completed and certificate generated successfully"
          : "Topic progress updated successfully",
      data: updatedEnrollment,
      certificate: generatedCertificate,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update topic completion",
      error: error.message,
    });
  }
};

export const updateCourseEnrollment = async (req, res) => {
  try {
    const payload = { ...req.body };

    if (payload.progress !== undefined) {
      const progress = Number(payload.progress);

      if (progress >= 100) {
        payload.progress = 100;
        payload.status = "Completed";
        payload.certificateEligible = true;
      } else if (progress > 0) {
        payload.progress = progress;
        payload.status = "Ongoing";
        payload.certificateEligible = false;
      } else {
        payload.progress = 0;
        payload.status = "Enrolled";
        payload.certificateEligible = false;
      }
    }

    let enrollment = await CourseEnrollment.findByIdAndUpdate(
      req.params.id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    ).populate("courseId");

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found",
      });
    }

    let generatedCertificate = null;

    if (Number(enrollment.progress) >= 100) {
      generatedCertificate = await createCertificateIfEligible(enrollment);

      enrollment = await CourseEnrollment.findById(enrollment._id).populate(
        "courseId"
      );
    }

    res.status(200).json({
      success: true,
      message:
        Number(enrollment.progress) >= 100
          ? "Enrollment completed and certificate generated successfully"
          : "Enrollment updated successfully",
      data: enrollment,
      certificate: generatedCertificate,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update enrollment",
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