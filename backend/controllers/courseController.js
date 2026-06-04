import Course from "../models/Course.js";

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("mentorId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
      error: error.message,
    });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("mentorId");

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch course",
      error: error.message,
    });
  }
};

const normalizeStringArray = (items = []) => {
  if (!Array.isArray(items)) return [];

  return items
    .map((item) => String(item || "").trim())
    .filter(Boolean);
};

const normalizeResources = (resources = []) => {
  if (!Array.isArray(resources)) return [];

  return resources
    .filter((item) => item && (item.title || item.url))
    .map((item) => ({
      title: item.title || "",
      type: item.type || "Link",
      url: item.url || "",
    }));
};

const normalizeCurriculum = (curriculum = []) => {
  if (!Array.isArray(curriculum)) {
    return [];
  }

  return curriculum
    .filter((topic) => topic && topic.title)
    .map((topic, topicIndex) => ({
      title: topic.title || "",
      description: topic.description || "",
      content: topic.content || "",
      duration: topic.duration || "",
      videoUrl: topic.videoUrl || "",
      resourceUrl: topic.resourceUrl || "",
      xp: Number(topic.xp || 20),
      order: Number(topic.order || topicIndex + 1),
      subTopics: Array.isArray(topic.subTopics)
        ? topic.subTopics
            .filter((subTopic) => subTopic && subTopic.title)
            .map((subTopic, subTopicIndex) => ({
              title: subTopic.title || "",
              description: subTopic.description || "",
              content: subTopic.content || "",
              duration: subTopic.duration || "",
              videoUrl: subTopic.videoUrl || "",
              resourceUrl: subTopic.resourceUrl || "",
              xp: Number(subTopic.xp || 10),
              order: Number(subTopic.order || subTopicIndex + 1),
            }))
        : [],
    }));
};

const normalizeQuizQuestions = (questions = []) => {
  if (!Array.isArray(questions)) return [];

  return questions
    .filter((item) => item && item.question)
    .map((item) => ({
      question: item.question || "",
      options: Array.isArray(item.options)
        ? item.options.map((option) => String(option || ""))
        : ["", "", "", ""],
      correctAnswer: item.correctAnswer || "",
      marks: Number(item.marks || 1),
    }));
};

const normalizeAssignment = (assignment = {}) => {
  return {
    title: assignment.title || "",
    question: assignment.question || "",
    instructions: assignment.instructions || "",
    allowedFileTypes: Array.isArray(assignment.allowedFileTypes)
      ? assignment.allowedFileTypes
      : ["PDF", "DOC", "ZIP", "Image", "Link"],
    maxMarks: Number(assignment.maxMarks || 100),
  };
};

const normalizeCertificateRules = (rules = {}) => {
  return {
    passingPercentage: Number(rules.passingPercentage || 70),
    minimumProgress: Number(rules.minimumProgress || 100),
    quizRequired:
      rules.quizRequired === undefined
        ? true
        : rules.quizRequired === true || rules.quizRequired === "true",
    assignmentRequired:
      rules.assignmentRequired === undefined
        ? true
        : rules.assignmentRequired === true ||
          rules.assignmentRequired === "true",
  };
};

const countLessons = (curriculum = []) => {
  return curriculum.reduce((total, topic) => {
    if (topic.subTopics && topic.subTopics.length > 0) {
      return total + topic.subTopics.length;
    }

    return total + 1;
  }, 0);
};

const buildCoursePayload = (body) => {
  const isFree = body.isFree === true || body.isFree === "true";
  const curriculum = normalizeCurriculum(body.curriculum);

  return {
    title: body.title,
    shortDescription: body.shortDescription || "",
    description: body.description,
    category: body.category,
    tags: normalizeStringArray(body.tags),
    language: body.language || "English",
    level: body.level || "Beginner",
    duration: body.duration || "",
    totalLessons: countLessons(curriculum),
    isFree,
    price: isFree ? "0" : body.price || "0",
    discountPrice: body.discountPrice || "",
    mentorId: body.mentorId || null,
    mentorName: body.mentorName || "",
    learningOutcomes: normalizeStringArray(body.learningOutcomes),
    requirements: normalizeStringArray(body.requirements),
    resources: normalizeResources(body.resources),
    certificateIncluded:
      body.certificateIncluded === undefined
        ? true
        : body.certificateIncluded === true ||
          body.certificateIncluded === "true",
    certificateRules: normalizeCertificateRules(body.certificateRules),
    status: body.status || "Active",
    videoUrl: body.videoUrl || "",
    thumbnailUrl: body.thumbnailUrl || "",
    bannerUrl: body.bannerUrl || "",
    curriculum,
    quizQuestions: normalizeQuizQuestions(body.quizQuestions),
    assignment: normalizeAssignment(body.assignment),
  };
};

export const createCourse = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, description and category are required",
      });
    }

    const payload = buildCoursePayload(req.body);

    const course = await Course.create(payload);

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: course,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const payload = buildCoursePayload(req.body);

    if (payload.mentorId === "") {
      payload.mentorId = null;
    }

    const course = await Course.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: course,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update course",
      error: error.message,
    });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete course",
      error: error.message,
    });
  }
};