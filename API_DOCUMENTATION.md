# AI Learning Platform - API Documentation

## Authentication Endpoints (`/api/auth`)

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/register` | POST | Register a new user | No |
| `/login` | POST | Login with email/password | No |
| `/send-otp` | POST | Send login OTP | No |
| `/verify-otp` | POST | Verify login OTP | No |
| `/forgot-password` | POST | Request password reset OTP | No |
| `/reset-password` | POST | Reset password using OTP | No |
| `/stats` | GET | Get admin statistics | Admin |
| `/approvals` | GET | List users pending approval | Admin |
| `/approve/:id` | POST | Approve a user | Admin |

## Course & Enrollment Endpoints (`/api/courses`)

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/` | GET | List all courses (with search/filter) | No |
| `/:id` | GET | Get course details & lessons | No |
| `/enroll` | POST | Enroll in a course | Yes |
| `/my-enrollments` | GET | Get user's enrolled courses | Yes |
| `/update-progress` | POST | Update lesson completion | Yes |
| `/progress/:course_id`| GET | Get course progress percentage | Yes |
| `/create` | POST | Create a new course | Admin |
| `/:id` | PUT | Update course details | Admin |
| `/:id` | DELETE | Delete a course | Admin |

## Upload Endpoints (`/api/upload`)

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/` | POST | Upload a file (image/video/pdf) | Yes |

---

## Query Parameters (Courses)
- `search`: Filter by title/description (e.g., `?search=agents`)
- `category`: Filter by category (e.g., `?category=AI`)

## Database Performance
- Indexes added for `email`, `category`, `user_id`, `course_id`, and `lesson_id`.
