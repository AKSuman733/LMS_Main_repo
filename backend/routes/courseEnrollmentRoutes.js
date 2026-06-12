import express from "express";
import {
  addComment,
  createCourseEnrollment,
  deleteCourseEnrollment,
  getCourseEnrollmentById,
  getCourseEnrollments,
  getEnrollmentsByStudentEmail,
  saveNotes,
  updateAssignmentStatus,
  updateLearningProgress,
  updateQuizStatus,
  uploadAssignmentFile,
} from "../controllers/courseEnrollmentController.js";
import { assignmentUpload } from "../middleware/upload.js";

const router = express.Router();

router.route("/").get(getCourseEnrollments).post(createCourseEnrollment);
router.get("/student/:email", getEnrollmentsByStudentEmail);
router.route("/:id").get(getCourseEnrollmentById).delete(deleteCourseEnrollment);
router.put("/:id/progress", updateLearningProgress);
router.put("/:id/quiz", updateQuizStatus);
router.put("/:id/assignment", updateAssignmentStatus);
router.post("/:id/assignment/upload", assignmentUpload.single("assignment"), uploadAssignmentFile);
router.put("/:id/notes", saveNotes);
router.post("/:id/comments", addComment);

export default router;