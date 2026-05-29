import express from "express";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";

const router = express.Router();

router.route("/").get(getEvents).post(createEvent);

router.route("/:id").put(updateEvent).delete(deleteEvent);

export default router;