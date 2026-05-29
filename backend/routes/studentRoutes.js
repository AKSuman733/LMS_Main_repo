import express from "express";
import {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  sendStudentOtp,
  verifyStudentOtp,
} from "../controllers/studentController.js";

const router = express.Router();

router.post("/send-otp", sendStudentOtp);
router.post("/verify-otp", verifyStudentOtp);

router.route("/").get(getStudents).post(createStudent);

router.route("/:id").get(getStudentById).put(updateStudent).delete(deleteStudent);

export default router;