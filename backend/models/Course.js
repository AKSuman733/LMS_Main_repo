import mongoose from "mongoose";

const courseResourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
      trim: true,
    },

    type: {
      type: String,
      enum: ["PDF", "Video", "Link", "Image", "Code", "Other"],
      default: "Link",
    },

    url: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    _id: true,
  }
);

const courseSubTopicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    content: {
      type: String,
      default: "",
      trim: true,
    },

    duration: {
      type: String,
      default: "",
      trim: true,
    },

    videoUrl: {
      type: String,
      default: "",
      trim: true,
    },

    resourceUrl: {
      type: String,
      default: "",
      trim: true,
    },

    xp: {
      type: Number,
      default: 10,
      min: 0,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: true,
  }
);

const courseTopicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    content: {
      type: String,
      default: "",
      trim: true,
    },

    duration: {
      type: String,
      default: "",
      trim: true,
    },

    videoUrl: {
      type: String,
      default: "",
      trim: true,
    },

    resourceUrl: {
      type: String,
      default: "",
      trim: true,
    },

    xp: {
      type: Number,
      default: 20,
      min: 0,
    },

    order: {
      type: Number,
      default: 0,
    },

    subTopics: {
      type: [courseSubTopicSchema],
      default: [],
    },
  },
  {
    _id: true,
  }
);

const quizQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      default: "",
      trim: true,
    },

    options: {
      type: [String],
      default: ["", "", "", ""],
    },

    correctAnswer: {
      type: String,
      default: "",
      trim: true,
    },

    marks: {
      type: Number,
      default: 1,
      min: 0,
    },
  },
  {
    _id: true,
  }
);

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
      trim: true,
    },

    question: {
      type: String,
      default: "",
      trim: true,
    },

    instructions: {
      type: String,
      default: "",
      trim: true,
    },

    allowedFileTypes: {
      type: [String],
      default: ["PDF", "DOC", "ZIP", "Image", "Link"],
    },

    maxMarks: {
      type: Number,
      default: 100,
      min: 0,
    },
  },
  {
    _id: false,
  }
);

const certificateRulesSchema = new mongoose.Schema(
  {
    passingPercentage: {
      type: Number,
      default: 70,
      min: 0,
      max: 100,
    },

    minimumProgress: {
      type: Number,
      default: 100,
      min: 0,
      max: 100,
    },

    quizRequired: {
      type: Boolean,
      default: true,
    },

    assignmentRequired: {
      type: Boolean,
      default: true,
    },
  },
  {
    _id: false,
  }
);

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    shortDescription: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    language: {
      type: String,
      default: "English",
      trim: true,
    },

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },

    duration: {
      type: String,
      default: "",
      trim: true,
    },

    totalLessons: {
      type: Number,
      default: 0,
      min: 0,
    },

    isFree: {
      type: Boolean,
      default: true,
    },

    price: {
      type: String,
      default: "0",
      trim: true,
    },

    discountPrice: {
      type: String,
      default: "",
      trim: true,
    },

    mentorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mentor",
      default: null,
    },

    mentorName: {
      type: String,
      default: "",
      trim: true,
    },

    learningOutcomes: {
      type: [String],
      default: [],
    },

    requirements: {
      type: [String],
      default: [],
    },

    resources: {
      type: [courseResourceSchema],
      default: [],
    },

    certificateIncluded: {
      type: Boolean,
      default: true,
    },

    certificateRules: {
      type: certificateRulesSchema,
      default: () => ({}),
    },

    status: {
      type: String,
      enum: ["Active", "Draft", "Archived", "Coming Soon"],
      default: "Active",
    },

    videoUrl: {
      type: String,
      default: "",
      trim: true,
    },

    thumbnailUrl: {
      type: String,
      default: "",
      trim: true,
    },

    bannerUrl: {
      type: String,
      default: "",
      trim: true,
    },

    curriculum: {
      type: [courseTopicSchema],
      default: [],
    },

    quizQuestions: {
      type: [quizQuestionSchema],
      default: [],
    },

    assignment: {
      type: assignmentSchema,
      default: () => ({}),
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;