import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { BookOpen, Award } from 'lucide-react';
import { getLocalEnrollments } from '../../utils/mockData';

const StudentDashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock network request
    setTimeout(() => {
      setEnrolledCourses(getLocalEnrollments());
      setLoading(false);
    }, 400);
  }, []);

  const completedCount = enrolledCourses.filter(c => c.completed).length;
  const inProgressCount = enrolledCourses.length - completedCount;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex items-center space-x-4">
          <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-600 dark:text-blue-300">
            <BookOpen size={32} />
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">In Progress Courses</p>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{inProgressCount}</h3>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex items-center space-x-4">
          <div className="p-4 bg-green-100 dark:bg-green-900 rounded-full text-green-600 dark:text-green-300">
            <Award size={32} />
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Completed Courses</p>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{completedCount}</h3>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Enrollments</h3>
        
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : enrolledCourses.length > 0 ? (
          <div className="space-y-4">
            {enrolledCourses.slice(0, 3).map(course => (
              <div key={course.id} className="flex justify-between items-center p-4 border dark:border-gray-700 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{course.title}</h4>
                  <p className="text-sm text-gray-500">Instructor Style: {course.instructor_style}</p>
                </div>
                <Link 
                  to={`/student/learn/${course.id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Continue
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">You haven't enrolled in any courses yet.</p>
            <Link to="/student/courses" className="text-blue-600 hover:underline">Browse Catalog</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
