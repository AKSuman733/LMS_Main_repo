import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { Clock, BarChart } from 'lucide-react';
import { MOCK_COURSES } from '../../utils/mockData';

const CourseCatalog = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCourses(MOCK_COURSES);
      setLoading(false);
    }, 400);
  }, []);

  if (loading) return <div>Loading courses...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Course Catalog</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden flex flex-col transition hover:shadow-lg">
            <div className="h-40 w-full relative overflow-hidden">
              <img src={course.image} alt={course.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
                {course.category}
              </span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{course.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">{course.description}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mt-auto mb-4">
                <div className="flex items-center"><BarChart size={16} className="mr-1" /> {course.level}</div>
                <div className="flex items-center"><Clock size={16} className="mr-1" /> {course.duration}</div>
              </div>
              
              <Link 
                to={`/student/course/${course.id}`}
                className="w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
              >
                View Course
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseCatalog;
