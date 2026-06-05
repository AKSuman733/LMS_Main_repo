import Mentor from "../models/Mentor.js";

export const getMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: mentors.length,
      data: mentors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch mentors",
      error: error.message,
    });
  }
};

export const createMentor = async (req, res) => {
  try {
    const mentor = await Mentor.create(req.body);

    res.status(201).json({
      success: true,
      message: "Mentor created successfully",
      data: mentor,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create mentor",
      error: error.message,
    });
  }
};

export const updateMentor = async (req, res) => {
  try {
    const mentor = await Mentor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: "Mentor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Mentor updated successfully",
      data: mentor,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update mentor",
      error: error.message,
    });
  }
};

export const deleteMentor = async (req, res) => {
  try {
    const mentor = await Mentor.findByIdAndDelete(req.params.id);

    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: "Mentor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Mentor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete mentor",
      error: error.message,
    });
  }
};