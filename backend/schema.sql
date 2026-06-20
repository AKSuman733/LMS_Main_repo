-- Create Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'student', -- 'student', 'admin'
    is_approved BOOLEAN DEFAULT FALSE,
    google_id VARCHAR(255) UNIQUE,
    temp_password VARCHAR(255),
    otp VARCHAR(6),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Courses table
CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    thumbnail VARCHAR(255),
    instructor_id INTEGER REFERENCES users(id),
    price DECIMAL(10, 2) DEFAULT 0.00,
    level VARCHAR(50) DEFAULT 'Beginner', -- 'Beginner', 'Intermediate', 'Advanced'
    category VARCHAR(100),
    duration VARCHAR(50),
    lessons_count INTEGER DEFAULT 0,
    rating DECIMAL(3, 1) DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Lessons table
CREATE TABLE IF NOT EXISTS lessons (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    video_url VARCHAR(255),
    content TEXT,
    order_index INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, course_id)
);

-- Create Progress table
CREATE TABLE IF NOT EXISTS progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    lesson_id INTEGER REFERENCES lessons(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'in_progress', -- 'completed', 'in_progress'
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, lesson_id)
);

-- Seed some initial data
INSERT INTO users (name, email, password, role, is_approved) VALUES 
('Admin User', 'admin@lms.com', '$2b$10$Qejk2SRgOqFwXAeXSrJkoO8xuc8iXaEkp.Vz54EHG5fErhBUr0hB2', 'admin', TRUE);

INSERT INTO courses (title, description, thumbnail, instructor_id, price, level, category, duration, lessons_count, rating) VALUES 
('Real World Projects on RAG', 'Learn how to build Retrieval-Augmented Generation systems.', 'https://images.unsplash.com/photo-1677442136019-21780ecad995', 1, 0, 'Intermediate', 'AI', '5 Hours', 5, 4.6),
('Real World Projects on AI Agents', 'Deep dive into autonomous AI agents and their applications.', 'https://images.unsplash.com/photo-1620712943543-bcc4638d9980', 1, 0, 'Advanced', 'AI', '5 Hours', 5, 4.7),
('Strands Agent Learning Path', 'Comprehensive path to mastering agentic workflows.', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b', 1, 0, 'Beginner', 'AI', '6 Hours', 4, 4.7);
