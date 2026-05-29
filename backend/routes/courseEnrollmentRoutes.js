import express from "express";
import {
  getCourseEnrollments,
  getEnrollmentsByStudentEmail,
  createCourseEnrollment,
  updateCourseEnrollment,
  deleteCourseEnrollment,
} from "../controllers/courseEnrollmentController.js";

const router = express.Router();

router.route("/").get(getCourseEnrollments).post(createCourseEnrollment);

router.route("/student/:email").get(getEnrollmentsByStudentEmail);

router
  .route("/:id")
  .put(updateCourseEnrollment)
  .delete(deleteCourseEnrollment);

export default router;