import mongoose from "mongoose";

const completedTopicSchema = new mongoose.Schema(
  {
    topicKey: {
      type: String,
      required: true,
    },

    topicId: {
      type: String,
      required: true,
    },

    subTopicId: {
      type: String,
      default: "",
    },

    title: {
      type: String,
      default: "",
    },

    completedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  }
);

const courseEnrollmentSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    courseTitle: {
      type: String,
      required: true,
      trim: true,
    },

    studentName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      default: "",
    },

    completedTopics: {
      type: [completedTopicSchema],
      default: [],
    },

    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    status: {
      type: String,
      enum: ["Enrolled", "Ongoing", "Completed"],
      default: "Enrolled",
    },

    certificateEligible: {
      type: Boolean,
      default: false,
    },

    certificateNumber: {
      type: String,
      default: "",
    },

    enrolledDate: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const CourseEnrollment = mongoose.model(
  "CourseEnrollment",
  courseEnrollmentSchema
);

export default CourseEnrollment;