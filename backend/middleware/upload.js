import fs from "fs";
import path from "path";
import multer from "multer";

const uploadDir = path.resolve("uploads", "assignments");
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const allowed = new Set([
  "application/pdf",
  "application/zip",
  "application/x-zip-compressed",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg",
]);

export const assignmentUpload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!allowed.has(file.mimetype)) {
      return cb(new Error("Only PDF, DOC, DOCX, ZIP, PNG and JPG files are allowed."));
    }
    cb(null, true);
  },
});
