import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { PlayCircle, CheckCircle } from 'lucide-react';
import { getLocalEnrollments } from '../../utils/mockData';

const EnrolledCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCourses(getLocalEnrollments());
      setLoading(false);
    }, 400);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Courses</h2>
      
      {courses.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-8 text-center">
          <p className="text-gray-500 mb-4">You are not enrolled in any courses.</p>
          <Link to="/student/courses" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Explore Courses</Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {courses.map(course => (
            <div key={course.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4 mb-4 md:mb-0 flex-1">
                {course.image && (
                  <img src={course.image} alt={course.title} className="w-24 h-24 rounded-lg object-cover shadow-sm hidden sm:block shrink-0" />
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">Instructor Style: {course.instructor_style}</p>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-1 w-64 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${course.progress_percentage}%` }}></div>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">{course.progress_percentage}%</span>
                </div>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-4 md:mt-0">
                <Link 
                  to={`/student/learn/${course.id}`}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <PlayCircle size={18} />
                  <span>{course.progress_percentage === 0 ? 'Start' : 'Continue'}</span>
                </Link>
                
                {course.completed && (
                  <Link 
                    to={`/student/certificate/${course.id}`}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition dark:bg-green-900/30 dark:text-green-400"
                  >
                    <CheckCircle size={18} />
                    <span>Certificate</span>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
