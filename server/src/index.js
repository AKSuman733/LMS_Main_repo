import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-user-email']
}));
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbFilePath = path.resolve(__dirname, '../users-db.json');

// Mongoose Connection Setup (Dual-mode fallback)
let useMongoDB = false;
let UserSchema;
let UserModel;

if (process.env.MONGO_URI) {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB successfully.");
    useMongoDB = true;

    UserSchema = new mongoose.Schema({
      id: { type: String, unique: true },
      name: { type: String },
      email: { type: String, unique: true },
      role: { type: String },
      provider: { type: String },
      profile_image: { type: String },
      google_id: { type: String },
      preferences: [String],
      notifications: {
        courseUpdates: { type: Boolean, default: true },
        newCertificates: { type: Boolean, default: true },
        weeklyReport: { type: Boolean, default: false }
      }
    }, { timestamps: true });

    UserModel = mongoose.model('User', UserSchema);
  } catch (err) {
    console.error("Failed to connect to MongoDB, falling back to local JSON file db:", err);
  }
}

// Helper to read users from json file
async function readUsersFromFile() {
  try {
    const data = await fs.readFile(dbFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading users-db.json:", err);
    return [];
  }
}

// Helper to write users to json file
async function writeUsersToFile(users) {
  try {
    await fs.writeFile(dbFilePath, JSON.stringify(users, null, 2), 'utf8');
  } catch (err) {
    console.error("Error writing to users-db.json:", err);
  }
}

// API Route: GET /user/profile
app.get('/user/profile', async (req, res) => {
  const email = req.query.email || req.headers['x-user-email'];
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    if (useMongoDB) {
      let user = await UserModel.findOne({ email });
      if (!user) {
        // Create user from mock base or default if not found
        user = await UserModel.create({
          id: `usr_${Date.now()}`,
          name: email.split('@')[0],
          email,
          role: 'student',
          preferences: ['AI', 'ML', 'LLMOps'],
          notifications: { courseUpdates: true, newCertificates: true, weeklyReport: false }
        });
      }
      return res.json(user);
    } else {
      const users = await readUsersFromFile();
      let user = users.find(u => u.email === email);
      if (!user) {
        // Initialize user with defaults if not exists
        user = {
          id: `usr_${Date.now()}`,
          name: email.split('@')[0],
          email,
          role: 'student',
          preferences: ['AI', 'ML', 'LLMOps'],
          notifications: { courseUpdates: true, newCertificates: true, weeklyReport: false }
        };
        users.push(user);
        await writeUsersToFile(users);
      }
      return res.json(user);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// API Route: PATCH /user/preferences
app.patch('/user/preferences', async (req, res) => {
  const { email, preferences } = req.body;
  if (!email || !Array.isArray(preferences)) {
    return res.status(400).json({ error: "Email and preferences array are required" });
  }

  try {
    if (useMongoDB) {
      const user = await UserModel.findOneAndUpdate(
        { email },
        { $set: { preferences } },
        { new: true, upsert: true }
      );
      console.log(`Updated preferences in MongoDB for ${email}:`, preferences);
      return res.json(user);
    } else {
      const users = await readUsersFromFile();
      let userIndex = users.findIndex(u => u.email === email);
      if (userIndex === -1) {
        users.push({
          id: `usr_${Date.now()}`,
          name: email.split('@')[0],
          email,
          role: 'student',
          preferences,
          notifications: { courseUpdates: true, newCertificates: true, weeklyReport: false }
        });
        userIndex = users.length - 1;
      } else {
        users[userIndex].preferences = preferences;
      }
      await writeUsersToFile(users);
      console.log(`Updated preferences in local DB for ${email}:`, preferences);
      return res.json(users[userIndex]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// API Route: PATCH /user/notifications
app.patch('/user/notifications', async (req, res) => {
  const { email, notifications } = req.body;
  if (!email || !notifications) {
    return res.status(400).json({ error: "Email and notifications object are required" });
  }

  try {
    if (useMongoDB) {
      const user = await UserModel.findOneAndUpdate(
        { email },
        { $set: { notifications } },
        { new: true, upsert: true }
      );
      console.log(`Updated notifications in MongoDB for ${email}:`, notifications);
      return res.json(user);
    } else {
      const users = await readUsersFromFile();
      let userIndex = users.findIndex(u => u.email === email);
      if (userIndex === -1) {
        users.push({
          id: `usr_${Date.now()}`,
          name: email.split('@')[0],
          email,
          role: 'student',
          preferences: [],
          notifications
        });
        userIndex = users.length - 1;
      } else {
        users[userIndex].notifications = {
          ...users[userIndex].notifications,
          ...notifications
        };
      }
      await writeUsersToFile(users);
      console.log(`Updated notifications in local DB for ${email}:`, notifications);
      return res.json(users[userIndex]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// API Route: PATCH /user/profile (Updates detailed profile details)
app.patch('/user/profile', async (req, res) => {
  const { email, profileData } = req.body;
  if (!email || !profileData) {
    return res.status(400).json({ error: "Email and profileData are required" });
  }

  try {
    if (useMongoDB) {
      const updateObj = {};
      if (profileData.firstName && profileData.lastName) {
        updateObj.name = `${profileData.firstName} ${profileData.lastName}`;
      }
      // Store other profile details as needed
      const user = await UserModel.findOneAndUpdate(
        { email },
        { $set: updateObj },
        { new: true }
      );
      return res.json(user);
    } else {
      const users = await readUsersFromFile();
      const userIndex = users.findIndex(u => u.email === email);
      if (userIndex !== -1) {
        if (profileData.firstName && profileData.lastName) {
          users[userIndex].name = `${profileData.firstName} ${profileData.lastName}`;
        }
        await writeUsersToFile(users);
        return res.json(users[userIndex]);
      }
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
