const db = require('../config/db');

exports.getAllCourses = async (req, res) => {
  const { search, category, celebrity } = req.query;
  let query = 'SELECT * FROM courses WHERE 1=1';
  const params = [];

  if (search) {
    params.push(`%${search}%`);
    query += ` AND (title ILIKE $${params.length} OR description ILIKE $${params.length})`;
  }

  if (category && category !== 'All') {
    params.push(category);
    query += ` AND category = $${params.length}`;
  }

  if (celebrity && celebrity !== 'All') {
    params.push(celebrity);
    query += ` AND celebrity = $${params.length}`;
  }

  if (req.query.level && req.query.level !== 'All' && req.query.level !== '') {
    const levels = req.query.level.split(',');
    if (levels.length > 0) {
      const placeholders = [];
      levels.forEach(lvl => {
        params.push(lvl.trim());
        placeholders.push(`$${params.length}`);
      });
      query += ` AND level IN (${placeholders.join(', ')})`;
    }
  }

  if (req.query.duration && req.query.duration !== 'All') {
    const d = req.query.duration;
    // Extract number from duration string (e.g., '80 Hours' -> 80)
    // We use NULLIF to handle cases where duration might be empty
    const numericPart = "NULLIF(regexp_replace(duration, '[^0-9.]', '', 'g'), '')::numeric";
    
    if (d === 'short') {
      query += ` AND ${numericPart} < 1`;
    } else if (d === 'medium') {
      query += ` AND ${numericPart} >= 1 AND ${numericPart} <= 4`;
    } else if (d === 'long') {
      query += ` AND ${numericPart} > 4`;
    }
  }

  query += ' ORDER BY created_at DESC';

  try {
    const courses = await db.query(query, params);
    res.status(200).json(courses.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while fetching courses' });
  }
};

const getLessonsForTopic = (category, title) => {
  const normCat = (category || '').toLowerCase();
  const normTitle = (title || '').toLowerCase();

  if (normCat.includes('java') || normTitle.includes('java')) {
    return [
      { title: '1. Introduction to Java & Installation', video_url: 'https://www.youtube.com/embed/eIrMbAQSU34', content: 'Set up your development environment and run your first Hello World program.' },
      { title: '2. Java Variables & Primitive Data Types', video_url: 'https://www.youtube.com/embed/eIrMbAQSU34', content: 'Learn about integers, doubles, characters, and memory sizes in Java.' },
      { title: '3. Operators & Arithmetic Expressions', video_url: 'https://www.youtube.com/embed/eIrMbAQSU34', content: 'Master mathematical, relational, and logical operators in Java.' },
      { title: '4. Conditional Flow (If-Else & Switch)', video_url: 'https://www.youtube.com/embed/eIrMbAQSU34', content: 'Control the execution flow of your Java programs with conditionals.' },
      { title: '5. Loops in Java (For, While, Do-While)', video_url: 'https://www.youtube.com/embed/eIrMbAQSU34', content: 'Learn how to repeat operations efficiently in Java.' },
      { title: '6. Arrays & ArrayList Collections', video_url: 'https://www.youtube.com/embed/eIrMbAQSU34', content: 'Store and manipulate collections of simple and object data.' },
      { title: '7. Functions & Parameter Passing', video_url: 'https://www.youtube.com/embed/eIrMbAQSU34', content: 'Write clean, reusable modular codes with Java methods.' },
      { title: '8. Intro to OOP (Classes & Objects)', video_url: 'https://www.youtube.com/embed/eIrMbAQSU34', content: 'Understand the core concepts of object-oriented programming.' },
      { title: '9. Encapsulation & Inheritance in Java', video_url: 'https://www.youtube.com/embed/eIrMbAQSU34', content: 'Extend classes and secure properties with modifiers.' },
      { title: '10. Exception Handling & Debugging', video_url: 'https://www.youtube.com/embed/eIrMbAQSU34', content: 'Learn how to catch runtime exceptions and debug Java code.' }
    ];
  } else if (normCat.includes('python') || normTitle.includes('python')) {
    return [
      { title: '1. Python Setup & Interactive REPL', video_url: 'https://www.youtube.com/embed/_uQrJ0TkZlc', content: 'Install Python and execute code interactively.' },
      { title: '2. Dynamic Variables & Data Types', video_url: 'https://www.youtube.com/embed/_uQrJ0TkZlc', content: 'Learn about numbers, strings, and dynamic typing in Python.' },
      { title: '3. Python Lists & Tuples', video_url: 'https://www.youtube.com/embed/_uQrJ0TkZlc', content: 'Store values using basic list collections.' },
      { title: '4. Dictionaries & Key-Value Pairs', video_url: 'https://www.youtube.com/embed/_uQrJ0TkZlc', content: 'Work with fast hash map storage in Python.' },
      { title: '5. Conditional Branches & Indentation', video_url: 'https://www.youtube.com/embed/_uQrJ0TkZlc', content: 'Understand control structures and Python indentation.' },
      { title: '6. Loops (For, While) & List Comprehensions', video_url: 'https://www.youtube.com/embed/_uQrJ0TkZlc', content: 'Iterate through data with quick loops.' },
      { title: '7. Functions & Scope in Python', video_url: 'https://www.youtube.com/embed/_uQrJ0TkZlc', content: 'Write reusable code blocks using def.' },
      { title: '8. File I/O Operations in Python', video_url: 'https://www.youtube.com/embed/_uQrJ0TkZlc', content: 'Read and write local system text files.' },
      { title: '9. Object Oriented Python', video_url: 'https://www.youtube.com/embed/_uQrJ0TkZlc', content: 'Define classes, self, methods, and inheritances.' },
      { title: '10. Exception Handling & Standard Modules', video_url: 'https://www.youtube.com/embed/_uQrJ0TkZlc', content: 'Manage runtime crashes with try-except blocks.' }
    ];
  } else if (normCat.includes('dsa') || normTitle.includes('dsa') || normCat.includes('data structure') || normTitle.includes('data structure')) {
    return [
      { title: '1. Time & Space Complexity Analysis', video_url: 'https://www.youtube.com/embed/rZ41y636h30', content: 'Understand Big-O notation and code efficiency.' },
      { title: '2. Array Operations & Dynamic Resizing', video_url: 'https://www.youtube.com/embed/rZ41y636h30', content: 'Understand basic array insertion, deletion, and search.' },
      { title: '3. Singly & Doubly Linked Lists', video_url: 'https://www.youtube.com/embed/rZ41y636h30', content: 'Build pointer-based sequential structures.' },
      { title: '4. Stacks & Queues Implementations', video_url: 'https://www.youtube.com/embed/rZ41y636h30', content: 'Learn LIFO and FIFO collection behaviors.' },
      { title: '5. Recursion Mechanics & Backtracking', video_url: 'https://www.youtube.com/embed/rZ41y636h30', content: 'Solve algorithms using self-calling routines.' },
      { title: '6. Binary Trees & Traversal Techniques', video_url: 'https://www.youtube.com/embed/rZ41y636h30', content: 'Master Pre-order, In-order, and Post-order traversals.' },
      { title: '7. Binary Search Trees (BST) & Operations', video_url: 'https://www.youtube.com/embed/rZ41y636h30', content: 'Perform O(log n) lookups and insertions.' },
      { title: '8. Heaps & Heapify Algorithms', video_url: 'https://www.youtube.com/embed/rZ41y636h30', content: 'Implement priority queues using binary heaps.' },
      { title: '9. Graph Data Structure & BFS/DFS', video_url: 'https://www.youtube.com/embed/rZ41y636h30', content: 'Traverse complex connection matrices and lists.' },
      { title: '10. Dynamic Programming Principles', video_url: 'https://www.youtube.com/embed/rZ41y636h30', content: 'Solve overlapping subproblems using memoization.' }
    ];
  } else if (normCat.includes('c ') || normTitle.includes('c ') || normCat === 'c' || normTitle === 'c' || normTitle.startsWith('c ') || normTitle.endsWith(' c')) {
    return [
      { title: '1. Introduction to C & Compiler Setup', video_url: 'https://www.youtube.com/embed/KJgsSFOSQv0', content: 'Configure gcc compiler and run first C code.' },
      { title: '2. Standard Input & Output functions', video_url: 'https://www.youtube.com/embed/KJgsSFOSQv0', content: 'Print formatted output and capture user entries.' },
      { title: '3. Data Types & Storage Classes', video_url: 'https://www.youtube.com/embed/KJgsSFOSQv0', content: 'Understand memory allocations of basic variables.' },
      { title: '4. Decision Statements & Nested Branches', video_url: 'https://www.youtube.com/embed/KJgsSFOSQv0', content: 'Form conditional logic block structures in C.' },
      { title: '5. Loops & Loop Controls (Break, Continue)', video_url: 'https://www.youtube.com/embed/KJgsSFOSQv0', content: 'Run repetitive instructions efficiently.' },
      { title: '6. Introduction to Pointers & Addresses', video_url: 'https://www.youtube.com/embed/KJgsSFOSQv0', content: 'Master directly referencing CPU RAM locations.' },
      { title: '7. Arrays & Pointer Arithmetic', video_url: 'https://www.youtube.com/embed/KJgsSFOSQv0', content: 'Address lists using memory offsets.' },
      { title: '8. String Manipulation & Character Arrays', video_url: 'https://www.youtube.com/embed/KJgsSFOSQv0', content: 'Work with null-terminated character arrays.' },
      { title: '9. Structures, Unions & Typedefs', video_url: 'https://www.youtube.com/embed/KJgsSFOSQv0', content: 'Create complex customized data structures.' },
      { title: '10. Dynamic Allocation (malloc, calloc, free)', video_url: 'https://www.youtube.com/embed/KJgsSFOSQv0', content: 'Control system heap memory dynamically.' }
    ];
  } else {
    return [
      { title: '1. Course Overview & Introduction', video_url: 'https://www.youtube.com/embed/5NgNicANyqM', content: 'Overview of the course roadmap and core target learnings.' },
      { title: '2. Version Control with Git & GitHub', video_url: 'https://www.youtube.com/embed/5NgNgNicANyqM', content: 'Learn to track revisions and manage code collaborations.' },
      { title: '3. Base Syntax & Key Fundamentals', video_url: 'https://www.youtube.com/embed/5NgNicANyqM', content: 'Understand standard terms and syntax layouts.' },
      { title: '4. Formatting and Layout Styles', video_url: 'https://www.youtube.com/embed/5NgNicANyqM', content: 'Configure styles, alignments, and aesthetics.' },
      { title: '5. Core Logic Operations & Variables', video_url: 'https://www.youtube.com/embed/5NgNicANyqM', content: 'Master logical control structures and basic state calculations.' },
      { title: '6. Dynamic Handlers & Interactive Actions', video_url: 'https://www.youtube.com/embed/5NgNicANyqM', content: 'Create event handlers and actions.' },
      { title: '7. APIs Integration & Fetch Requests', video_url: 'https://www.youtube.com/embed/5NgNicANyqM', content: 'Retrieve and process JSON payloads asynchronously.' },
      { title: '8. Designing Persistent Storage & Schema', video_url: 'https://www.youtube.com/embed/5NgNicANyqM', content: 'Establish structures to keep application data stable.' },
      { title: '9. Building Routing and Backend Pipelines', video_url: 'https://www.youtube.com/embed/5NgNicANyqM', content: 'Build secure, scalable backend route handlers.' },
      { title: '10. CI/CD Deployment & Hosting Best Practices', video_url: 'https://www.youtube.com/embed/5NgNicANyqM', content: 'Host application and run automated delivery scripts.' }
    ];
  }
};

exports.getCourseById = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await db.query('SELECT * FROM courses WHERE id = $1', [id]);
    if (course.rows.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }

    let lessons = await db.query('SELECT * FROM lessons WHERE course_id = $1 ORDER BY order_index ASC', [id]);
    
    if (lessons.rows.length === 0) {
      const defaultLessons = getLessonsForTopic(course.rows[0].category, course.rows[0].title);
      for (let i = 0; i < defaultLessons.length; i++) {
        const { title, video_url, content } = defaultLessons[i];
        await db.query(
          'INSERT INTO lessons (course_id, title, video_url, content, order_index) VALUES ($1, $2, $3, $4, $5)',
          [id, title, video_url, content, i + 1]
        );
      }
      // Re-fetch lessons after insertion
      const refetched = await db.query('SELECT * FROM lessons WHERE course_id = $1 ORDER BY order_index ASC', [id]);
      lessons = refetched;
    }
    
    res.status(200).json({
      ...course.rows[0],
      lessons: lessons.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while fetching course details' });
  }
};

exports.enrollInCourse = async (req, res) => {
  const { course_id } = req.body;
  const user_id = req.user.id;

  try {
    // Check if already enrolled
    const enrollment = await db.query(
      'SELECT * FROM enrollments WHERE user_id = $1 AND course_id = $2',
      [user_id, course_id]
    );

    if (enrollment.rows.length > 0) {
      return res.status(400).json({ error: 'Already enrolled in this course' });
    }

    await db.query(
      'INSERT INTO enrollments (user_id, course_id) VALUES ($1, $2)',
      [user_id, course_id]
    );

    res.status(201).json({ message: 'Enrolled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error during enrollment' });
  }
};

exports.updateProgress = async (req, res) => {
  const { lesson_id, status } = req.body;
  const user_id = req.user.id;

  try {
    await db.query(
      'INSERT INTO progress (user_id, lesson_id, status) VALUES ($1, $2, $3) ON CONFLICT (user_id, lesson_id) DO UPDATE SET status = $3, updated_at = CURRENT_TIMESTAMP',
      [user_id, lesson_id, status || 'completed']
    );
    res.status(200).json({ message: 'Progress updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while updating progress' });
  }
};

exports.getCourseProgress = async (req, res) => {
  const { course_id } = req.params;
  const user_id = req.user.id;

  try {
    // Check if user is actually enrolled
    const enrollment = await db.query(
      'SELECT * FROM enrollments WHERE user_id = $1 AND course_id = $2',
      [user_id, course_id]
    );

    if (enrollment.rows.length === 0) {
      return res.status(200).json({ isEnrolled: false });
    }

    const totalLessons = await db.query('SELECT COUNT(*) FROM lessons WHERE course_id = $1', [course_id]);
    const completedLessonsQuery = await db.query(
      'SELECT lesson_id FROM progress p JOIN lessons l ON p.lesson_id = l.id WHERE p.user_id = $1 AND l.course_id = $2 AND p.status = $3',
      [user_id, course_id, 'completed']
    );

    const total = parseInt(totalLessons.rows[0].count);
    const completed = completedLessonsQuery.rows.length;
    const completed_lessons = completedLessonsQuery.rows.map(row => row.lesson_id);
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    res.status(200).json({ isEnrolled: true, total, completed, percentage, completed_lessons });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while fetching progress' });
  }
};

exports.createCourse = async (req, res) => {
  const { title, description, thumbnail, price, level, category, duration, celebrity } = req.body;
  const instructor_id = req.user.id;

  try {
    const newCourse = await db.query(
      'INSERT INTO courses (title, description, thumbnail, instructor_id, price, level, category, duration, celebrity) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [title, description, thumbnail, instructor_id, price || 0, level || 'Beginner', category, duration, celebrity]
    );
    res.status(201).json(newCourse.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while creating course' });
  }
};

exports.updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, description, thumbnail, price, level, category, duration, celebrity } = req.body;

  try {
    const updatedCourse = await db.query(
      'UPDATE courses SET title = $1, description = $2, thumbnail = $3, price = $4, level = $5, category = $6, duration = $7, celebrity = $8 WHERE id = $9 RETURNING *',
      [title, description, thumbnail, price, level, category, duration, celebrity, id]
    );
    if (updatedCourse.rows.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json(updatedCourse.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while updating course' });
  }
};

exports.deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM courses WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while deleting course' });
  }
};

exports.getUserEnrollments = async (req, res) => {
  const user_id = req.user.id;
  console.log('Fetching enrollments for user ID:', user_id);

  try {
    const enrollments = await db.query(
      `SELECT c.*, e.enrolled_at 
       FROM enrollments e 
       JOIN courses c ON e.course_id = c.id 
       WHERE e.user_id = $1`,
      [user_id]
    );

    // Fetch progress for each course
    const results = await Promise.all(enrollments.rows.map(async (course) => {
      const totalLessons = await db.query('SELECT COUNT(*) FROM lessons WHERE course_id = $1', [course.id]);
      const completedLessons = await db.query(
        'SELECT COUNT(*) FROM progress p JOIN lessons l ON p.lesson_id = l.id WHERE p.user_id = $1 AND l.course_id = $2 AND p.status = $3',
        [user_id, course.id, 'completed']
      );

      const total = parseInt(totalLessons.rows[0].count);
      const completed = parseInt(completedLessons.rows[0].count);
      const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

      return {
        ...course,
        progress: percentage
      };
    }));

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while fetching enrollments' });
  }
};

exports.getInstructorCourses = async (req, res) => {
  try {
    const courses = await db.query('SELECT * FROM courses ORDER BY created_at DESC');
    res.status(200).json(courses.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while fetching instructor courses' });
  }
};

