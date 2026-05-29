import express from "express";
import {
  getMentors,
  createMentor,
  updateMentor,
  deleteMentor,
} from "../controllers/mentorController.js";

const router = express.Router();

router.route("/").get(getMentors).post(createMentor);

router.route("/:id").put(updateMentor).delete(deleteMentor);

export default router;