import express from "express";
import {
  getCertificates,
  getCertificatesByStudentEmail,
  createCertificate,
  updateCertificate,
  deleteCertificate,
  verifyCertificate,
} from "../controllers/certificateController.js";

const router = express.Router();

router.route("/").get(getCertificates).post(createCertificate);

router.route("/student/:email").get(getCertificatesByStudentEmail);

router.route("/verify/:certificateNumber").get(verifyCertificate);

router.route("/:id").put(updateCertificate).delete(deleteCertificate);

export default router;