import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    certificateNumber: {
      type: String,
      required: true,
      unique: true,
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

    certificateType: {
      type: String,
      enum: ["Course", "Event"],
      default: "Course",
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    issuedDate: {
      type: String,
      required: true,
    },

    validTill: {
      type: String,
      default: "Lifetime",
    },

    status: {
      type: String,
      enum: ["Valid", "Revoked"],
      default: "Valid",
    },

    score: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Certificate = mongoose.model("Certificate", certificateSchema);

export default Certificate;