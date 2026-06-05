import jwt from "jsonwebtoken";
import { Resend } from "resend";
import Student from "../models/Student.js";

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const createStudentToken = (student) => {
  return jwt.sign(
    {
      id: student._id,
      email: student.email,
      role: "student",
    },
    process.env.JWT_SECRET || "uptoskills_student_secret_key",
    {
      expiresIn: "7d",
    }
  );
};

const sendOtpEmail = async ({ email, name, otp }) => {
  if (!process.env.RESEND_API_KEY) {
    console.log("====================================");
    console.log(`OTP for ${email}: ${otp}`);
    console.log("RESEND_API_KEY not configured. OTP printed in console.");
    console.log("====================================");
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "UptoSkills <onboarding@resend.dev>",
    to: [email],
    subject: "Your UptoSkills OTP Code",
    html: `
      <div style="font-family: Arial, sans-serif; background:#0f172a; padding:30px; color:#ffffff;">
        <div style="max-width:600px; margin:auto; background:#111827; border-radius:20px; padding:30px; border:1px solid rgba(255,255,255,0.1);">
          <h2 style="color:#22d3ee;">UptoSkills LMS Verification</h2>
          <p>Hello ${name || "Student"},</p>
          <p>Your OTP code is:</p>

          <div style="background:#020617; border-radius:16px; padding:20px; text-align:center; margin:20px 0;">
            <h1 style="letter-spacing:8px; color:#fb923c; margin:0;">${otp}</h1>
          </div>

          <p>This OTP is valid for 10 minutes.</p>
          <p style="color:#94a3b8;">If you did not request this, please ignore this email.</p>
        </div>
      </div>
    `,
  });

  if (error) {
    console.log("Resend email error:", error);
    throw new Error(error.message || "Failed to send OTP email");
  }

  console.log("OTP email sent:", data?.id);
};

export const sendStudentOtp = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const otp = generateOtp();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    let student = await Student.findOne({ email: normalizedEmail });

    if (!student) {
      student = await Student.create({
        name: name?.trim() || normalizedEmail.split("@")[0],
        email: normalizedEmail,
        phone: phone || "",
        status: "Active",
        joinedDate: new Date().toLocaleDateString("en-IN"),
        isEmailVerified: false,
        authProvider: "otp",
        otpCode: otp,
        otpExpiresAt,
        otpAttempts: 0,
      });
    } else {
      if (student.status === "Blocked") {
        return res.status(403).json({
          success: false,
          message: "Your account is blocked. Please contact admin.",
        });
      }

      student.name = name?.trim() || student.name;
      student.phone = phone || student.phone;
      student.status = student.status || "Active";
      student.authProvider = "otp";
      student.otpCode = otp;
      student.otpExpiresAt = otpExpiresAt;
      student.otpAttempts = 0;

      if (!student.joinedDate) {
        student.joinedDate = new Date().toLocaleDateString("en-IN");
      }

      await student.save();
    }

    await sendOtpEmail({
      email: normalizedEmail,
      name: student.name,
      otp,
    });

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      data: {
        email: student.email,
        name: student.name,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send OTP",
      error: error.message,
    });
  }
};

export const verifyStudentOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const student = await Student.findOne({ email: normalizedEmail });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found. Please request OTP again.",
      });
    }

    if (student.status === "Blocked") {
      return res.status(403).json({
        success: false,
        message: "Your account is blocked. Please contact admin.",
      });
    }

    if (!student.otpCode || !student.otpExpiresAt) {
      return res.status(400).json({
        success: false,
        message: "OTP not requested. Please request OTP again.",
      });
    }

    if (new Date() > student.otpExpiresAt) {
      student.otpCode = "";
      student.otpExpiresAt = null;
      await student.save();

      return res.status(400).json({
        success: false,
        message: "OTP expired. Please request a new OTP.",
      });
    }

    if (student.otpCode !== String(otp).trim()) {
      student.otpAttempts += 1;
      await student.save();

      return res.status(400).json({
        success: false,
        message: "Invalid OTP. Please try again.",
      });
    }

    student.isEmailVerified = true;
    student.otpCode = "";
    student.otpExpiresAt = null;
    student.otpAttempts = 0;
    student.lastLoginAt = new Date();

    if (!student.joinedDate) {
      student.joinedDate = new Date().toLocaleDateString("en-IN");
    }

    await student.save();

    const token = createStudentToken(student);

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      token,
      data: {
        _id: student._id,
        name: student.name,
        email: student.email,
        phone: student.phone,
        status: student.status,
        progress: student.progress,
        totalSpent: student.totalSpent,
        certificateEarned: student.certificateEarned,
        joinedDate: student.joinedDate,
        isEmailVerified: student.isEmailVerified,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to verify OTP",
      error: error.message,
    });
  }
};

export const getStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .select("-otpCode -otpExpiresAt -otpAttempts")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch students",
      error: error.message,
    });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).select(
      "-otpCode -otpExpiresAt -otpAttempts"
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch student",
      error: error.message,
    });
  }
};

export const createStudent = async (req, res) => {
  try {
    const { name, email, phone, courseId, courseName, status } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingStudent = await Student.findOne({ email: normalizedEmail });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Student with this email already exists",
      });
    }

    const student = await Student.create({
      name,
      email: normalizedEmail,
      phone: phone || "",
      courseId: courseId || null,
      courseName: courseName || "",
      status: status || "Active",
      joinedDate: new Date().toLocaleDateString("en-IN"),
      isEmailVerified: true,
      authProvider: "manual",
    });

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: student,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create student",
      error: error.message,
    });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const protectedFields = ["otpCode", "otpExpiresAt", "otpAttempts"];

    protectedFields.forEach((field) => {
      if (field in req.body) {
        delete req.body[field];
      }
    });

    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select("-otpCode -otpExpiresAt -otpAttempts");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: student,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update student",
      error: error.message,
    });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete student",
      error: error.message,
    });
  }
};