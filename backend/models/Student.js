import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      default: null,
    },

    courseName: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: ["Active", "Pending", "Blocked"],
      default: "Active",
    },

    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    totalSpent: {
      type: Number,
      default: 0,
    },

    certificateEarned: {
      type: Boolean,
      default: false,
    },

    joinedDate: {
      type: String,
      default: "",
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    authProvider: {
      type: String,
      enum: ["otp", "google", "manual"],
      default: "otp",
    },

    otpCode: {
      type: String,
      default: "",
    },

    otpExpiresAt: {
      type: Date,
      default: null,
    },

    otpAttempts: {
      type: Number,
      default: 0,
    },

    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;