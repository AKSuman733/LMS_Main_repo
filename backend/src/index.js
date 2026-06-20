const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const courseRoutes = require('./routes/course.routes');
const celebrityRoutes = require('./routes/celebrity.routes');
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
const contactRoutes = require('./routes/contact.routes');
const notificationRoutes = require('./routes/notification.routes');
const chatRoutes = require('./routes/chat.routes');
const reportRoutes = require('./routes/report.routes');
<<<<<<< HEAD
=======
=======
>>>>>>> ea7d4c330ef821eaa42c835b4f6fb8675e70f7fe
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383

const session = require('express-session');
const passport = require('./config/passport');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5173',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    // Allow any localhost port for development or specific allowed origins
    if (origin.startsWith('http://localhost:') || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
    return callback(new Error(msg), false);
  },
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Passport & Sessions
app.use(session({
  secret: process.env.SESSION_SECRET || 'lms_session_secret',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/celebrities', celebrityRoutes);
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
app.use('/api/contact', contactRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/reports', reportRoutes);
<<<<<<< HEAD
=======
=======
>>>>>>> ea7d4c330ef821eaa42c835b4f6fb8675e70f7fe
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
app.use('/api/upload', require('./routes/upload.routes'));

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'LMS API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
