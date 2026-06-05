import express from "express";
import {
  getCourseEnrollments,
  getCourseEnrollmentById,
  getEnrollmentsByStudentEmail,
  createCourseEnrollment,
  updateLearningProgress,
  updateQuizStatus,
  updateAssignmentStatus,
  deleteCourseEnrollment,
} from "../controllers/courseEnrollmentController.js";

const router = express.Router();

router.route("/").get(getCourseEnrollments).post(createCourseEnrollment);

router.get("/student/:email", getEnrollmentsByStudentEmail);

router
  .route("/:id")
  .get(getCourseEnrollmentById)
  .delete(deleteCourseEnrollment);

router.put("/:id/progress", updateLearningProgress);
router.put("/:id/quiz", updateQuizStatus);
router.put("/:id/assignment", updateAssignmentStatus);

export default router;