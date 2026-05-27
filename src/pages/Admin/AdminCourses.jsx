import { useState, useEffect } from 'react';

import { Plus, Edit2, Trash2 } from 'lucide-react';
import { MOCK_COURSES } from '../../utils/mockData';

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = () => {
    setTimeout(() => {
      setCourses(MOCK_COURSES);
      setLoading(false);
    }, 400);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    setCourses(prev => prev.filter(c => c.id !== id));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Course Management</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          <Plus size={18} />
          <span>Add Course</span>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {courses.map(course => (
                <tr key={course.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 dark:text-white">{course.title}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-300">{course.category}</td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-300">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {course.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-300">{course.duration}</td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(course.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCourses;
