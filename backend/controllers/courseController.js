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

const normalizeCurriculum = (curriculum = []) => {
  if (!Array.isArray(curriculum)) {
    return [];
  }

  return curriculum
    .filter((topic) => topic && topic.title)
    .map((topic, topicIndex) => ({
      title: topic.title || "",
      description: topic.description || "",
      duration: topic.duration || "",
      videoUrl: topic.videoUrl || "",
      order: Number(topic.order || topicIndex + 1),
      subTopics: Array.isArray(topic.subTopics)
        ? topic.subTopics
            .filter((subTopic) => subTopic && subTopic.title)
            .map((subTopic, subTopicIndex) => ({
              title: subTopic.title || "",
              description: subTopic.description || "",
              duration: subTopic.duration || "",
              videoUrl: subTopic.videoUrl || "",
              order: Number(subTopic.order || subTopicIndex + 1),
            }))
        : [],
    }));
};

export const createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      level,
      duration,
      isFree,
      price,
      mentorId,
      mentorName,
      certificateIncluded,
      status,
      videoUrl,
      thumbnailUrl,
      curriculum,
    } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, description and category are required",
      });
    }

    const course = await Course.create({
      title,
      description,
      category,
      level: level || "Beginner",
      duration: duration || "",
      isFree: isFree === true || isFree === "true",
      price: isFree === true || isFree === "true" ? "0" : price || "0",
      mentorId: mentorId || null,
      mentorName: mentorName || "",
      certificateIncluded:
        certificateIncluded === undefined
          ? true
          : certificateIncluded === true || certificateIncluded === "true",
      status: status || "Active",
      videoUrl: videoUrl || "",
      thumbnailUrl: thumbnailUrl || "",
      curriculum: normalizeCurriculum(curriculum),
    });

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
    const payload = { ...req.body };

    if (payload.isFree !== undefined) {
      payload.isFree = payload.isFree === true || payload.isFree === "true";

      if (payload.isFree) {
        payload.price = "0";
      }
    }

    if (payload.certificateIncluded !== undefined) {
      payload.certificateIncluded =
        payload.certificateIncluded === true ||
        payload.certificateIncluded === "true";
    }

    if (payload.mentorId === "") {
      payload.mentorId = null;
    }

    if (payload.curriculum !== undefined) {
      payload.curriculum = normalizeCurriculum(payload.curriculum);
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