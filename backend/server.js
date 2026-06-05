require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const multer = require("multer");
const fs = require("fs");
const nodemailer = require("nodemailer");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/assets", express.static(path.join(__dirname, "../student-portal/public/assets")));
app.use("/uploads", express.static(path.join(__dirname, "../student-portal/public/assets/uploads")));

const uploadDir = path.join(__dirname, "../student-portal/public/assets/uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type. Only JPG, PNG, and WebP are allowed."));
        }
    }
});

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
});

const initDb = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS instructors (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                bio TEXT,
                image TEXT
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                role TEXT DEFAULT 'student',
                full_name TEXT,
                approved BOOLEAN DEFAULT FALSE
            )
        `);
        await pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS approved BOOLEAN DEFAULT FALSE");
        await pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS selected_instructor_id INTEGER REFERENCES instructors(id) ON DELETE SET NULL");
        await pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP");

        await pool.query(`
            CREATE TABLE IF NOT EXISTS enrollments (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                course_id INTEGER NOT NULL,
                enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                progress INTEGER DEFAULT 0,
                completed BOOLEAN DEFAULT FALSE,
                certificate_url TEXT,
                last_video_index INTEGER DEFAULT 0
            )
        `);

        await pool.query("ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS last_video_index INTEGER DEFAULT 0");
        await pool.query("ALTER TABLE courses ALTER COLUMN duration DROP NOT NULL");
        await pool.query("ALTER TABLE courses ADD COLUMN IF NOT EXISTS rating_count INTEGER DEFAULT 0");

        await pool.query(`
            CREATE TABLE IF NOT EXISTS courses (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                level TEXT NOT NULL,
                duration TEXT,
                enrollments INTEGER DEFAULT 0,
                rating DECIMAL(3,1) DEFAULT 0.0,
                rating_count INTEGER DEFAULT 0,
                image TEXT,
                about TEXT,
                description TEXT,
                outcomes TEXT[],
                requirements TEXT[],
                instructor_name TEXT,
                instructor_bio TEXT,
                instructor_image TEXT,
                topic TEXT,
                curriculum JSONB DEFAULT '[]'
            )
        `);
        await pool.query("ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS archived BOOLEAN DEFAULT FALSE");
        await pool.query("ALTER TABLE courses ADD COLUMN IF NOT EXISTS archived BOOLEAN DEFAULT FALSE");
        await pool.query(`
            CREATE TABLE IF NOT EXISTS reviews (
                id SERIAL PRIMARY KEY,
                course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
                user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
                comment TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS tasks (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                description TEXT,
                assigned_to INTEGER REFERENCES users(id) ON DELETE CASCADE,
                status TEXT DEFAULT 'pending',
                due_date TIMESTAMP,
                submission_link TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        await pool.query("ALTER TABLE tasks ADD COLUMN IF NOT EXISTS submission_link TEXT");
        await pool.query("ALTER TABLE tasks ADD COLUMN IF NOT EXISTS submitted_at TIMESTAMP");

        await pool.query(`
            CREATE TABLE IF NOT EXISTS queries (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                subject TEXT NOT NULL,
                message TEXT NOT NULL,
                reply TEXT DEFAULT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                replied_at TIMESTAMP DEFAULT NULL
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS otps (
                email TEXT PRIMARY KEY,
                otp TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log("Database tables verified.");
    } catch (err) {
        console.error("DB Init Error:", err.message);
    }
};

initDb();

app.get("/api/courses", async (req, res) => {
    const { search, topic, level, includeArchived } = req.query;
    let query = `
        SELECT c.*, 
        COALESCE(r.avg_rating, 0) as rating, 
        COALESCE(r.total_reviews, 0) as rating_count,
        COALESCE(e.total_enrolls, 0) as enrollments
        FROM courses c
        LEFT JOIN (
            SELECT course_id, 
            ROUND(AVG(rating), 1) as avg_rating, 
            COUNT(*) as total_reviews
            FROM reviews
            GROUP BY course_id
        ) r ON c.id = r.course_id
        LEFT JOIN (
            SELECT course_id, COUNT(*) as total_enrolls 
            FROM enrollments 
            GROUP BY course_id
        ) e ON c.id = e.course_id
        WHERE 1=1`;
    let params = [];
    let idx = 1;
    if (includeArchived !== "true") {
        query += ` AND c.archived = FALSE`;
    }
    if (search) { query += ` AND (c.title ILIKE $${idx} OR c.instructor_name ILIKE $${idx})`; params.push(`%${search}%`); idx++; }
    if (topic) { query += ` AND c.topic = ANY($${idx})`; params.push(Array.isArray(topic) ? topic : [topic]); idx++; }
    if (level) { query += ` AND c.level = ANY($${idx})`; params.push(Array.isArray(level) ? level : [level]); idx++; }
    query += " ORDER BY c.id ASC";
    try { const result = await pool.query(query, params); res.json(result.rows); } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get("/api/courses/:id", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT c.*, 
            COALESCE(r.avg_rating, 0) as rating, 
            COALESCE(r.total_reviews, 0) as rating_count
            FROM courses c
            LEFT JOIN (
                SELECT course_id, 
                ROUND(AVG(rating), 1) as avg_rating, 
                COUNT(*) as total_reviews
                FROM reviews
                GROUP BY course_id
            ) r ON c.id = r.course_id
            WHERE c.id = $1`, [req.params.id]);
        res.json(result.rows[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post("/api/courses", upload.fields([{ name: 'image', maxCount: 1 }, { name: 'instructor_image', maxCount: 1 }]), async (req, res) => {
    const { title, level, about, description, topic, instructor_name, instructor_bio, outcomes, requirements, curriculum } = req.body;
    let image = req.body.image;
    let instructor_image = req.body.instructor_image;

    if (req.files && req.files['image']) {
        image = `/uploads/${req.files['image'][0].filename}`;
    }
    if (req.files && req.files['instructor_image']) {
        instructor_image = `/uploads/${req.files['instructor_image'][0].filename}`;
    }

    try {
        const parsedCurriculum = typeof curriculum === 'string' ? JSON.parse(curriculum) : curriculum;
        const parsedOutcomes = typeof outcomes === 'string' ? JSON.parse(outcomes) : outcomes;
        const parsedRequirements = typeof requirements === 'string' ? JSON.parse(requirements) : requirements;

        const result = await pool.query(
            `INSERT INTO courses (title, level, image, about, description, topic, instructor_name, instructor_bio, instructor_image, outcomes, requirements, curriculum) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id`,
            [title, level, image, about, description, topic, instructor_name, instructor_bio, instructor_image, parsedOutcomes || [], parsedRequirements || [], JSON.stringify(parsedCurriculum || [])]
        );
        res.status(201).json({ id: result.rows[0].id, image, instructor_image });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put("/api/courses/:id", upload.fields([{ name: 'image', maxCount: 1 }, { name: 'instructor_image', maxCount: 1 }]), async (req, res) => {
    const { title, level, about, description, topic, instructor_name, instructor_bio, outcomes, requirements, curriculum } = req.body;
    let image = req.body.image;
    let instructor_image = req.body.instructor_image;

    if (req.files && req.files['image']) {
        image = `/uploads/${req.files['image'][0].filename}`;
    }
    if (req.files && req.files['instructor_image']) {
        instructor_image = `/uploads/${req.files['instructor_image'][0].filename}`;
    }

    try {
        const parsedCurriculum = typeof curriculum === 'string' ? JSON.parse(curriculum) : curriculum;
        const parsedOutcomes = typeof outcomes === 'string' ? JSON.parse(outcomes) : outcomes;
        const parsedRequirements = typeof requirements === 'string' ? JSON.parse(requirements) : requirements;

        await pool.query(
            `UPDATE courses SET title=$1, level=$2, image=$3, about=$4, description=$5, topic=$6, instructor_name=$7, instructor_bio=$8, instructor_image=$9, outcomes=$10, requirements=$11, curriculum=$12 WHERE id=$13`,
            [title, level, image, about, description, topic, instructor_name, instructor_bio, instructor_image, parsedOutcomes, parsedRequirements, JSON.stringify(parsedCurriculum || []), req.params.id]
        );
        res.json({ message: "Updated", image, instructor_image });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete("/api/courses/:id", async (req, res) => {
    try { await pool.query("DELETE FROM courses WHERE id = $1", [req.params.id]); res.json({ message: "Deleted" }); } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get("/api/courses/:id/reviews", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT r.*, u.full_name as user_name 
            FROM reviews r 
            JOIN users u ON r.user_id = u.id 
            WHERE r.course_id = $1 
            ORDER BY r.created_at DESC`, [req.params.id]);
        res.json(result.rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post("/api/reviews", async (req, res) => {
    const { course_id, user_id, rating, comment } = req.body;
    try {
        await pool.query("INSERT INTO reviews (course_id, user_id, rating, comment) VALUES ($1, $2, $3, $4)", [course_id, user_id, rating, comment]);

        const stats = await pool.query("SELECT AVG(rating)::numeric(3,1) as avg_rating, COUNT(*) as count FROM reviews WHERE course_id = $1", [course_id]);
        await pool.query("UPDATE courses SET rating = $1, rating_count = $2 WHERE id = $3", [stats.rows[0].avg_rating, stats.rows[0].count, course_id]);

        res.status(201).json({ message: "Review added" });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post("/api/auth/register", async (req, res) => {
    const { username, email, password, role, fullName } = req.body;
    try {
        const hash = await bcrypt.hash(password, 10);
        const result = await pool.query("INSERT INTO users (username, email, password, role, full_name) VALUES ($1, $2, $3, $4, $5) RETURNING id", [username || email, email, hash, role || 'student', fullName]);
        res.status(201).json({ userId: result.rows[0].id });
    } catch (err) { res.status(400).json({ error: "Email exists" }); }
});

app.post("/api/auth/login", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [req.body.email]);
        const user = result.rows[0];
        if (user && await bcrypt.compare(req.body.password, user.password)) {
            res.json({ user: { id: user.id, email: user.email, role: user.role, fullName: user.full_name, approved: user.approved, selectedInstructorId: user.selected_instructor_id } });
        } else { res.status(401).json({ error: "Invalid credentials" }); }
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put("/api/auth/profile", async (req, res) => {
    const { id, fullName, email } = req.body;
    try {
        await pool.query("UPDATE users SET full_name = $1, email = $2 WHERE id = $3", [fullName, email, id]);
        res.json({ message: "Profile updated" });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get("/api/users/:id", async (req, res) => {
    try {
        const result = await pool.query("SELECT id, email, role, full_name, approved, selected_instructor_id FROM users WHERE id = $1", [req.params.id]);
        if (result.rows.length > 0) {
            res.json({ user: { id: result.rows[0].id, email: result.rows[0].email, role: result.rows[0].role, fullName: result.rows[0].full_name, approved: result.rows[0].approved, selectedInstructorId: result.rows[0].selected_instructor_id } });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get("/api/enrollments/:userId", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.*, c.title as course_title, c.image as course_image, c.instructor_name, c.duration, c.curriculum 
            FROM enrollments e 
            JOIN courses c ON e.course_id = c.id 
            WHERE e.user_id = $1 AND e.archived = FALSE`, [req.params.userId]);
        res.json(result.rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post("/api/enrollments", async (req, res) => {
    const { userId, courseId } = req.body;
    try {
        await pool.query("INSERT INTO enrollments (user_id, course_id, progress) VALUES ($1, $2, 0) ON CONFLICT DO NOTHING", [userId, courseId]);
        res.json({ message: "Enrolled" });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post("/api/enrollments/complete", async (req, res) => {
    const { userId, courseId } = req.body;
    const cert = `https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf`;
    try {
        await pool.query("UPDATE enrollments SET completed = TRUE, progress = 100, certificate_url = $1 WHERE user_id = $2 AND course_id = $3", [cert, userId, courseId]);
        res.json({ message: "Done" });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get("/api/enrollment/:id", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.*, c.title as course_title, c.image as course_image, c.duration, c.curriculum,
                   c.instructor_name as default_instructor_name,
                   c.instructor_bio as default_instructor_bio,
                   c.instructor_image as default_instructor_image,
                   u.full_name as user_fullname, 
                   i.name as selected_instructor_name,
                   i.bio as selected_instructor_bio,
                   i.image as selected_instructor_image
            FROM enrollments e 
            JOIN courses c ON e.course_id = c.id 
            JOIN users u ON e.user_id = u.id
            LEFT JOIN instructors i ON u.selected_instructor_id = i.id
            WHERE e.id = $1 AND e.archived = FALSE`, [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Enrollment not found or archived" });
        }
        res.json(result.rows[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get("/api/enrollments/:userId/:courseId", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM enrollments WHERE user_id = $1 AND course_id = $2 AND archived = FALSE",
            [req.params.userId, req.params.courseId]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/api/admin/reviews", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT r.*, c.title as course_title, u.full_name as user_name
            FROM reviews r
            JOIN courses c ON r.course_id = c.id
            JOIN users u ON r.user_id = u.id
            ORDER BY r.created_at DESC
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/api/admin/reviews/recent", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT r.*, c.title as course_title, u.full_name as user_name
            FROM reviews r
            JOIN courses c ON r.course_id = c.id
            JOIN users u ON r.user_id = u.id
            ORDER BY r.created_at DESC
            LIMIT 5
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete("/api/admin/reviews/:id", async (req, res) => {
    try {
        await pool.query("DELETE FROM reviews WHERE id = $1", [req.params.id]);
        res.json({ message: "Review deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put("/api/enrollments/:id/progress", async (req, res) => {
    const { progress, last_video_index } = req.body;
    try {
        await pool.query(
            "UPDATE enrollments SET progress = $1, last_video_index = $2, completed = $3 WHERE id = $4",
            [progress, last_video_index, progress >= 100, req.params.id]
        );
        res.json({ message: "Progress updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/api/instructors", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM instructors ORDER BY id ASC");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/api/instructors", upload.single("image"), async (req, res) => {
    const { name, bio } = req.body;
    let image = null;
    if (req.file) {
        image = `/uploads/${req.file.filename}`;
    }
    try {
        const result = await pool.query(
            "INSERT INTO instructors (name, bio, image) VALUES ($1, $2, $3) RETURNING *",
            [name, bio, image]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put("/api/instructors/:id", upload.single("image"), async (req, res) => {
    const { name, bio } = req.body;
    let image = req.body.image;
    if (req.file) {
        image = `/uploads/${req.file.filename}`;
    }
    try {
        const result = await pool.query(
            "UPDATE instructors SET name = $1, bio = $2, image = $3 WHERE id = $4 RETURNING *",
            [name, bio, image, req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Instructor not found" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete("/api/instructors/:id", async (req, res) => {
    try {
        const result = await pool.query("DELETE FROM instructors WHERE id = $1 RETURNING *", [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Instructor not found" });
        }
        res.json({ message: "Instructor deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put("/api/users/:id/instructor", async (req, res) => {
    const { selected_instructor_id } = req.body;
    try {
        const result = await pool.query(
            "UPDATE users SET selected_instructor_id = $1 WHERE id = $2 RETURNING id, email, role, full_name, approved, selected_instructor_id as \"selectedInstructorId\"",
            [selected_instructor_id, req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ message: "Instructor updated successfully", user: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/api/admin/stats", async (req, res) => {
    try {
        const users = await pool.query("SELECT COUNT(*) FROM users WHERE role = 'student'");
        const courses = await pool.query("SELECT COUNT(*) FROM courses");
        const enrolls = await pool.query("SELECT COUNT(*) FROM enrollments");

        const pendingUsers = await pool.query("SELECT COUNT(*) FROM users WHERE role = 'student' AND approved = false");
        const weeklyEnrolls = await pool.query("SELECT COUNT(*) FROM enrollments WHERE enrolled_at >= NOW() - INTERVAL '7 days'");

        const completedEnrolls = await pool.query("SELECT COUNT(*) FROM enrollments WHERE completed = true");
        const totalE = parseInt(enrolls.rows[0].count);
        const compE = parseInt(completedEnrolls.rows[0].count);
        const completionRate = totalE > 0 ? Math.round((compE / totalE) * 100) : 0;

        const instructorStats = await pool.query(`
            SELECT i.id, i.name, i.image, i.bio, COUNT(u.id) as student_count
            FROM instructors i
            LEFT JOIN users u ON u.selected_instructor_id = i.id AND u.role = 'student'
            GROUP BY i.id, i.name, i.image, i.bio
            ORDER BY student_count DESC
        `);

        res.json({
            totalStudents: parseInt(users.rows[0].count),
            totalCourses: parseInt(courses.rows[0].count),
            totalEnrollments: totalE,
            enrollmentsThisWeek: parseInt(weeklyEnrolls.rows[0].count),
            completionRate: completionRate,
            pendingApprovals: parseInt(pendingUsers.rows[0].count),
            systemHealth: "Optimal",
            instructorStats: instructorStats.rows
        });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get("/api/admin/reports", async (req, res) => {
    try {
        const enrollmentsRes = await pool.query("SELECT id, enrolled_at FROM enrollments");
        const enrollments = enrollmentsRes.rows;

        const studentsRes = await pool.query("SELECT id, created_at FROM users WHERE role = 'student'");
        const students = studentsRes.rows;

        const now = new Date();

        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

        const enrollsThisWeek = enrollments.filter(e => new Date(e.enrolled_at) >= sevenDaysAgo).length;
        const enrollsLastWeek = enrollments.filter(e => {
            const d = new Date(e.enrolled_at);
            return d >= fourteenDaysAgo && d < sevenDaysAgo;
        }).length;

        let enrollmentGrowth = 0;
        if (enrollsLastWeek > 0) {
            enrollmentGrowth = Math.round(((enrollsThisWeek - enrollsLastWeek) / enrollsLastWeek) * 100);
        } else if (enrollsThisWeek > 0) {
            enrollmentGrowth = 100;
        }

        const studentsThisWeek = students.filter(s => new Date(s.created_at || 0) >= sevenDaysAgo).length;
        const studentsLastWeek = students.filter(s => {
            const d = new Date(s.created_at || 0);
            return d >= fourteenDaysAgo && d < sevenDaysAgo;
        }).length;

        let studentGrowth = 0;
        if (studentsLastWeek > 0) {
            studentGrowth = Math.round(((studentsThisWeek - studentsLastWeek) / studentsLastWeek) * 100);
        } else if (studentsThisWeek > 0) {
            studentGrowth = 100;
        }

        const weeklyTrends = [];
        for (let i = 5; i >= 0; i--) {
            const start = new Date(now.getTime() - (i + 1) * 7 * 24 * 60 * 60 * 1000);
            const end = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000);
            const label = `W-${i === 0 ? "Now" : i}`;
            const value = enrollments.filter(e => {
                const d = new Date(e.enrolled_at);
                return d >= start && d < end;
            }).length;
            weeklyTrends.push({ label, value });
        }

        const monthlyTrends = [];
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        for (let i = 5; i >= 0; i--) {
            const tempDate = new Date();
            tempDate.setMonth(now.getMonth() - i);
            const year = tempDate.getFullYear();
            const month = tempDate.getMonth();
            
            const label = `${monthNames[month]} ${String(year).slice(-2)}`;
            const value = enrollments.filter(e => {
                const d = new Date(e.enrolled_at);
                return d.getMonth() === month && d.getFullYear() === year;
            }).length;
            monthlyTrends.push({ label, value });
        }

        const completedRes = await pool.query("SELECT COUNT(*) FROM enrollments WHERE completed = true");
        const completedCount = parseInt(completedRes.rows[0].count);
        const totalEnrollments = enrollments.length;
        const completionRate = totalEnrollments > 0 ? Math.round((completedCount / totalEnrollments) * 100) : 0;

        const coursesRes = await pool.query(`
            SELECT c.title, COUNT(e.id) as enrollment_count
            FROM courses c
            LEFT JOIN enrollments e ON e.course_id = c.id
            GROUP BY c.id, c.title
            ORDER BY enrollment_count DESC
            LIMIT 5
        `);

        const recentActivityRes = await pool.query(`
            SELECT e.id, u.full_name, c.title, e.enrolled_at, e.progress, e.completed
            FROM enrollments e
            JOIN users u ON e.user_id = u.id
            JOIN courses c ON e.course_id = c.id
            ORDER BY e.enrolled_at DESC
            LIMIT 5
        `);

        const topicRes = await pool.query(`
            SELECT c.topic, COUNT(e.id) as enrollment_count, ROUND(AVG(COALESCE(e.progress, 0))) as avg_progress, COUNT(DISTINCT c.id) as course_count
            FROM courses c
            LEFT JOIN enrollments e ON e.course_id = c.id
            GROUP BY c.topic
            ORDER BY enrollment_count DESC
        `);

        res.json({
            enrollmentsCount: totalEnrollments,
            enrollmentGrowth,
            studentsCount: students.length,
            studentGrowth,
            completionRate,
            weeklyTrends,
            monthlyTrends,
            topCourses: coursesRes.rows,
            recentActivity: recentActivityRes.rows,
            topicDistribution: topicRes.rows
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/api/admin/users", async (req, res) => {
    try { const result = await pool.query("SELECT id, full_name, email, role, approved FROM users ORDER BY id DESC"); res.json(result.rows); } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put("/api/admin/users/:id/approve", async (req, res) => {
    try {
        await pool.query("UPDATE users SET approved = TRUE WHERE id = $1", [req.params.id]);
        res.json({ message: "User approved" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put("/api/admin/users/:id/suspend", async (req, res) => {
    try {
        await pool.query("UPDATE users SET approved = FALSE WHERE id = $1", [req.params.id]);
        res.json({ message: "User suspended" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put("/api/admin/users/:id", async (req, res) => {
    const { full_name, email } = req.body;
    try {
        const result = await pool.query(
            "UPDATE users SET full_name = $1, email = $2, username = $2 WHERE id = $3 RETURNING *",
            [full_name, email, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: "User not found" });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/api/admin/enrollments", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.*, u.full_name as user_name, u.email as user_email, c.title as course_title 
            FROM enrollments e 
            JOIN users u ON e.user_id = u.id 
            JOIN courses c ON e.course_id = c.id 
            ORDER BY e.enrolled_at DESC`);
        res.json(result.rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put("/api/admin/enrollments/:id", async (req, res) => {
    const { progress, completed } = req.body;
    try {
        const result = await pool.query(
            "UPDATE enrollments SET progress = $1, completed = $2 WHERE id = $3 RETURNING *",
            [progress, completed, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: "Enrollment not found" });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete("/api/admin/enrollments/:id", async (req, res) => {
    try { await pool.query("DELETE FROM enrollments WHERE id = $1", [req.params.id]); res.json({ message: "Deleted" }); } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put("/api/admin/courses/:id/archive", async (req, res) => {
    try {
        await pool.query("UPDATE courses SET archived = TRUE WHERE id = $1", [req.params.id]);
        res.json({ message: "Course archived" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put("/api/admin/courses/:id/unarchive", async (req, res) => {
    try {
        await pool.query("UPDATE courses SET archived = FALSE WHERE id = $1", [req.params.id]);
        res.json({ message: "Course unarchived" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put("/api/admin/enrollments/:id/archive", async (req, res) => {
    try {
        await pool.query("UPDATE enrollments SET archived = TRUE WHERE id = $1", [req.params.id]);
        res.json({ message: "Enrollment archived" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put("/api/admin/enrollments/:id/unarchive", async (req, res) => {
    try {
        await pool.query("UPDATE enrollments SET archived = FALSE WHERE id = $1", [req.params.id]);
        res.json({ message: "Enrollment unarchived" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete("/api/admin/users/:id", async (req, res) => {
    try {
        await pool.query("DELETE FROM users WHERE id = $1", [req.params.id]);
        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/api/admin/users", async (req, res) => {
    const { email, password, full_name, role } = req.body;
    try {
        const hash = await bcrypt.hash(password, 10);
        const result = await pool.query(
            "INSERT INTO users (username, email, password, role, full_name, approved) VALUES ($1, $2, $3, $4, $5, TRUE) RETURNING *",
            [email, email, hash, role || 'student', full_name]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(400).json({ error: "Email might already exist or invalid data" });
    }
});

app.get("/api/admin/tasks", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT t.*, u.full_name as assigned_to_name, u.email as assigned_to_email
            FROM tasks t
            LEFT JOIN users u ON t.assigned_to = u.id
            ORDER BY t.created_at DESC
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/api/admin/tasks", async (req, res) => {
    const { title, description, assigned_to, due_date } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO tasks (title, description, assigned_to, due_date) VALUES ($1, $2, $3, $4) RETURNING *",
            [title, description, assigned_to, due_date]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put("/api/admin/tasks/:id", async (req, res) => {
    const { title, description, assigned_to, status, due_date } = req.body;
    try {
        await pool.query(
            "UPDATE tasks SET title=$1, description=$2, assigned_to=$3, status=$4, due_date=$5 WHERE id=$6",
            [title, description, assigned_to, status, due_date, req.params.id]
        );
        res.json({ message: "Task updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete("/api/admin/tasks/:id", async (req, res) => {
    try {
        await pool.query("DELETE FROM tasks WHERE id = $1", [req.params.id]);
        res.json({ message: "Task deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/api/tasks/user/:userId", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM tasks WHERE assigned_to = $1 ORDER BY created_at DESC",
            [req.params.userId]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put("/api/tasks/:taskId/status", async (req, res) => {
    const { status, submission_link } = req.body;
    try {
        await pool.query(
            "UPDATE tasks SET status = $1, submission_link = $2, submitted_at = CASE WHEN $1 = 'completed' THEN CURRENT_TIMESTAMP ELSE NULL END WHERE id = $3",
            [status, submission_link, req.params.taskId]
        );
        res.json({ message: "Task status updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/api/queries", async (req, res) => {
    const { user_id, name, email, subject, message } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO queries (user_id, name, email, subject, message) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [user_id || null, name, email, subject, message]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/api/queries/user/:userId", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM queries WHERE user_id = $1 ORDER BY created_at DESC",
            [req.params.userId]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put("/api/queries/:id", async (req, res) => {
    const { subject, message } = req.body;
    try {
        const result = await pool.query(
            "UPDATE queries SET subject = $1, message = $2 WHERE id = $3 RETURNING *",
            [subject, message, req.params.id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete("/api/queries/:id", async (req, res) => {
    try {
        await pool.query("DELETE FROM queries WHERE id = $1", [req.params.id]);
        res.json({ message: "Query deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/api/admin/queries", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT q.*, u.full_name as student_name FROM queries q LEFT JOIN users u ON q.user_id = u.id ORDER BY q.created_at DESC"
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put("/api/admin/queries/:id/reply", async (req, res) => {
    const { reply } = req.body;
    try {
        const result = await pool.query(
            "UPDATE queries SET reply = $1, replied_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
            [reply, req.params.id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

app.post("/api/auth/forgot-password", async (req, res) => {
    const { email } = req.body;
    try {
        const userRes = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (userRes.rows.length === 0) {
            return res.status(404).json({ error: "No user found with this email" });
        }
        
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        
        await pool.query(
            "INSERT INTO otps (email, otp, created_at) VALUES ($1, $2, CURRENT_TIMESTAMP) ON CONFLICT (email) DO UPDATE SET otp = $2, created_at = CURRENT_TIMESTAMP",
            [email, otp]
        );
        
        console.log("\n==============================================");
        console.log(`[OTP VERIFICATION CODE FOR ${email}]: ${otp}`);
        console.log("==============================================\n");

        if (process.env.SMTP_USER && process.env.SMTP_PASS) {
            const mailOptions = {
                from: `"UptoSkills AI Learn" <${process.env.SMTP_USER}>`,
                to: email,
                subject: "UptoSkills Verification Code",
                html: `
                    <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #0b0f19; color: white; padding: 30px; border-radius: 16px; max-width: 500px; margin: 0 auto; border: 1px solid rgba(255,255,255,0.08);">
                        <h2 style="color: #f97316; margin-top: 0; text-align: center;">UptoSkills AI Learn</h2>
                        <p style="color: #cbd5e1; font-size: 1rem; line-height: 1.5;">You requested a verification OTP to reset your password. Please enter this code in the portal to set a new password:</p>
                        <div style="background: rgba(249, 115, 22, 0.1); border: 1px solid #f97316; padding: 15px; border-radius: 12px; text-align: center; margin: 25px 0;">
                            <span style="font-size: 32px; font-weight: 800; letter-spacing: 6px; color: #f97316;">${otp}</span>
                        </div>
                        <p style="color: #94a3b8; font-size: 0.8rem; line-height: 1.4; margin: 0;">This code will expire in 15 minutes. If you did not make this request, please secure your account immediately.</p>
                    </div>
                `
            };
            await transporter.sendMail(mailOptions);
            res.json({ message: "OTP verification code sent to your email" });
        } else {
            console.warn("[SMTP WARNING] SMTP_USER or SMTP_PASS not set in backend/.env!");
            res.json({ message: "OTP verification code printed in backend console logs (configure SMTP to send email)", otp: otp });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/api/auth/google", (req, res) => {
    const client_id = process.env.GOOGLE_CLIENT_ID;
    const redirect_uri = "http://localhost:5000/api/auth/google/callback";
    const state = req.query.portal || "student";
    if (!client_id) {
        return res.send(`
            <html>
              <body style="font-family: sans-serif; background: #0b0f19; color: white; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0;">
                <div style="background: #151d30; padding: 40px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.08); text-align: center; max-width: 500px;">
                  <h2 style="color: #f97316; margin-top: 0;">Google OAuth Client ID Missing</h2>
                  <p style="color: #cbd5e1; line-height: 1.6;">Please add your <strong>GOOGLE_CLIENT_ID</strong> and <strong>GOOGLE_CLIENT_SECRET</strong> to your <code>backend/.env</code> file to enable real Google authentication.</p>
                  <button onclick="window.close()" style="background: #f97316; color: white; border: none; padding: 10px 24px; border-radius: 8px; font-weight: bold; cursor: pointer; margin-top: 15px;">Close Window</button>
                </div>
              </body>
            </html>
        `);
    }
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&scope=profile%20email&state=${state}`;
    res.redirect(url);
});

app.get("/api/auth/google/callback", async (req, res) => {
    const { code, state } = req.query;
    const client_id = process.env.GOOGLE_CLIENT_ID;
    const client_secret = process.env.GOOGLE_CLIENT_SECRET;
    const redirect_uri = "http://localhost:5000/api/auth/google/callback";
    const portalUrl = state === "admin" ? "http://localhost:5174/login" : "http://localhost:5173/login";

    try {
        const tokenRes = await axios.post("https://oauth2.googleapis.com/token", {
            code,
            client_id,
            client_secret,
            redirect_uri,
            grant_type: "authorization_code"
        });

        const { access_token } = tokenRes.data;

        const userRes = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
            headers: { Authorization: `Bearer ${access_token}` }
        });

        const googleUser = userRes.data;
        const email = googleUser.email;
        const fullName = googleUser.name || googleUser.given_name || "Google User";
        const role = state === "admin" ? "admin" : "student";

        let dbUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (dbUser.rows.length === 0) {
            const hash = await bcrypt.hash(Math.random().toString(36), 10);
            const isApproved = role === "admin";
            const insertRes = await pool.query(
                "INSERT INTO users (username, email, password, role, full_name, approved) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
                [email, email, hash, role, fullName, isApproved]
            );
            dbUser = insertRes;
        }

        const authenticatedUser = {
            id: dbUser.rows[0].id,
            email: dbUser.rows[0].email,
            role: dbUser.rows[0].role,
            fullName: dbUser.rows[0].full_name,
            approved: dbUser.rows[0].approved,
            provider: "google"
        };

        res.redirect(`${portalUrl}?oauth_success=true&user=${encodeURIComponent(JSON.stringify(authenticatedUser))}`);
    } catch (err) {
        console.error("Google OAuth Error:", err.message);
        res.redirect(`${portalUrl}?oauth_error=${encodeURIComponent(err.message)}`);
    }
});

app.get("/api/auth/github", (req, res) => {
    const client_id = process.env.GITHUB_CLIENT_ID;
    const redirect_uri = "http://localhost:5000/api/auth/github/callback";
    const state = req.query.portal || "student";
    if (!client_id) {
        return res.send(`
            <html>
              <body style="font-family: sans-serif; background: #0b0f19; color: white; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0;">
                <div style="background: #151d30; padding: 40px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.08); text-align: center; max-width: 500px;">
                  <h2 style="color: #f97316; margin-top: 0;">GitHub OAuth Client ID Missing</h2>
                  <p style="color: #cbd5e1; line-height: 1.6;">Please add your <strong>GITHUB_CLIENT_ID</strong> and <strong>GITHUB_CLIENT_SECRET</strong> to your <code>backend/.env</code> file to enable real GitHub authentication.</p>
                  <button onclick="window.close()" style="background: #f97316; color: white; border: none; padding: 10px 24px; border-radius: 8px; font-weight: bold; cursor: pointer; margin-top: 15px;">Close Window</button>
                </div>
              </body>
            </html>
        `);
    }
    const url = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=user:email&state=${state}`;
    res.redirect(url);
});

app.get("/api/auth/github/callback", async (req, res) => {
    const { code, state } = req.query;
    const client_id = process.env.GITHUB_CLIENT_ID;
    const client_secret = process.env.GITHUB_CLIENT_SECRET;
    const portalUrl = state === "admin" ? "http://localhost:5174/login" : "http://localhost:5173/login";

    try {
        const tokenRes = await axios.post("https://github.com/login/oauth/access_token", {
            client_id,
            client_secret,
            code
        }, {
            headers: { Accept: "application/json" }
        });

        const { access_token } = tokenRes.data;

        const userRes = await axios.get("https://api.github.com/user", {
            headers: { Authorization: `Bearer ${access_token}` }
        });

        let email = userRes.data.email || `${userRes.data.login}@github.com`;
        const fullName = userRes.data.name || userRes.data.login || "GitHub User";
        const role = state === "admin" ? "admin" : "student";

        let dbUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (dbUser.rows.length === 0) {
            const hash = await bcrypt.hash(Math.random().toString(36), 10);
            const isApproved = role === "admin";
            const insertRes = await pool.query(
                "INSERT INTO users (username, email, password, role, full_name, approved) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
                [email, email, hash, role, fullName, isApproved]
            );
            dbUser = insertRes;
        }

        const authenticatedUser = {
            id: dbUser.rows[0].id,
            email: dbUser.rows[0].email,
            role: dbUser.rows[0].role,
            fullName: dbUser.rows[0].full_name,
            approved: dbUser.rows[0].approved,
            provider: "github"
        };

        res.redirect(`${portalUrl}?oauth_success=true&user=${encodeURIComponent(JSON.stringify(authenticatedUser))}`);
    } catch (err) {
        console.error("GitHub OAuth Error:", err.message);
        res.redirect(`${portalUrl}?oauth_error=${encodeURIComponent(err.message)}`);
    }
});

app.post("/api/auth/verify-otp", async (req, res) => {
    const { email, otp } = req.body;
    try {
        const result = await pool.query("SELECT * FROM otps WHERE email = $1", [email]);
        if (result.rows.length === 0) {
            return res.status(400).json({ error: "Invalid email or OTP expired" });
        }
        if (result.rows[0].otp === otp.trim()) {
            res.json({ success: true, message: "OTP verified successfully" });
        } else {
            res.status(400).json({ error: "Invalid OTP code" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/api/auth/reset-password", async (req, res) => {
    const { email, password, otp } = req.body;
    try {
        const otpRes = await pool.query("SELECT * FROM otps WHERE email = $1", [email]);
        if (otpRes.rows.length === 0 || otpRes.rows[0].otp !== otp.trim()) {
            return res.status(400).json({ error: "OTP verification failed or expired" });
        }

        const hash = await bcrypt.hash(password, 10);
        await pool.query("UPDATE users SET password = $1 WHERE email = $2", [hash, email]);
        await pool.query("DELETE FROM otps WHERE email = $1", [email]);
        res.json({ message: "Password updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => { console.log(`Server on http://localhost:${PORT}`); });