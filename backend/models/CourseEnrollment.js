import mongoose from "mongoose";

const learningTopicSchema = new mongoose.Schema({
  topicId: { type: String, required: true },
  title: { type: String, required: true, trim: true },
  isCompleted: { type: Boolean, default: false },
  completedAt: { type: Date, default: null },
}, { _id: false });

const learningSubTopicSchema = new mongoose.Schema({
  topicId: { type: String, required: true },
  subTopicId: { type: String, required: true },
  title: { type: String, required: true, trim: true },
  isCompleted: { type: Boolean, default: false },
  completedAt: { type: Date, default: null },
}, { _id: false });

const quizSchema = new mongoose.Schema({
  status: { type: String, enum: ["Not Started", "In Progress", "Completed"], default: "Not Started" },
  score: { type: Number, default: 0, min: 0 },
  totalMarks: { type: Number, default: 0, min: 0 },
  percentage: { type: Number, default: 0, min: 0, max: 100 },
  attemptedAt: { type: Date, default: null },
  completedAt: { type: Date, default: null },
}, { _id: false });

const assignmentSchema = new mongoose.Schema({
  status: { type: String, enum: ["Not Submitted", "Submitted", "Reviewed"], default: "Not Submitted" },
  title: { type: String, default: "", trim: true },
  submissionUrl: { type: String, default: "", trim: true },
  uploadedFileUrl: { type: String, default: "", trim: true },
  originalFileName: { type: String, default: "", trim: true },
  feedback: { type: String, default: "", trim: true },
  marks: { type: Number, default: 0, min: 0 },
  submittedAt: { type: Date, default: null },
  reviewedAt: { type: Date, default: null },
}, { _id: false });

const commentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, default: "", trim: true, lowercase: true },
  message: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

const courseEnrollmentSchema = new mongoose.Schema({
  studentName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, default: "", trim: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  courseTitle: { type: String, required: true, trim: true },
  courseCategory: { type: String, default: "", trim: true },
  courseLevel: { type: String, default: "", trim: true },
  courseDuration: { type: String, default: "", trim: true },
  mentorId: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor", default: null },
  mentorName: { type: String, default: "", trim: true },
  mentorRole: { type: String, default: "", trim: true },
  paymentStatus: { type: String, enum: ["Free", "Pending", "Paid", "Failed"], default: "Free" },
  amountPaid: { type: Number, default: 0, min: 0 },
  enrollmentStatus: { type: String, enum: ["Active", "Completed", "Cancelled"], default: "Active" },
  progress: { type: Number, default: 0, min: 0, max: 100 },
  learningTopics: { type: [learningTopicSchema], default: [] },
  learningSubTopics: { type: [learningSubTopicSchema], default: [] },
  quiz: { type: quizSchema, default: () => ({}) },
  assignment: { type: assignmentSchema, default: () => ({}) },
  notes: { type: String, default: "" },
  comments: { type: [commentSchema], default: [] },
  certificateEligible: { type: Boolean, default: false },
  certificateIssued: { type: Boolean, default: false },
  certificateId: { type: mongoose.Schema.Types.ObjectId, ref: "Certificate", default: null },
  enrolledAt: { type: Date, default: Date.now },
  completedAt: { type: Date, default: null },
}, { timestamps: true });

courseEnrollmentSchema.index({ email: 1, courseId: 1 }, { unique: true });

export default mongoose.model("CourseEnrollment", courseEnrollmentSchema);