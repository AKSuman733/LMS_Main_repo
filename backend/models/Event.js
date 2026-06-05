import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    eventDate: {
      type: String,
      required: true,
    },

    eventTime: {
      type: String,
      required: true,
    },

    mode: {
      type: String,
      enum: ["Online", "Offline", "Hybrid"],
      default: "Online",
    },

    location: {
      type: String,
      default: "",
    },

    speaker: {
      type: String,
      default: "",
    },

    maxSeats: {
      type: Number,
      default: 100,
    },

    registeredCount: {
      type: Number,
      default: 0,
    },

    certificateIncluded: {
      type: Boolean,
      default: true,
    },

    attendanceRequired: {
      type: Boolean,
      default: true,
    },

    status: {
      type: String,
      enum: ["Upcoming", "Ongoing", "Completed", "Cancelled"],
      default: "Upcoming",
    },

    bannerUrl: {
      type: String,
      default: "",
    },

    meetingLink: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;