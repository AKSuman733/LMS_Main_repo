import express from "express";
import {
  getEventRegistrations,
  createEventRegistration,
  updateEventRegistration,
  deleteEventRegistration,
} from "../controllers/eventRegistrationController.js";

const router = express.Router();

router.route("/").get(getEventRegistrations).post(createEventRegistration);

router.route("/:id").put(updateEventRegistration).delete(deleteEventRegistration);

export default router;