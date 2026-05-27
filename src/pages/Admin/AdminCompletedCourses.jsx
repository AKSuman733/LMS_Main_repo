import { useState, useEffect } from 'react';
import { MOCK_ADMIN_COMPLETED_COURSES } from '../../utils/mockData';
import { Award, Calendar, Hash } from 'lucide-react';

const AdminCompletedCourses = () => {
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate network delay
    setTimeout(() => {
      setCompleted(MOCK_ADMIN_COMPLETED_COURSES);
      setLoading(false);
    }, 400);
  }, []);

  if (loading) return <div>Loading completed courses...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Completed Courses</h2>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Completion Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Certificate ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {completed.map(comp => (
                <tr key={comp.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 dark:text-white">{comp.studentName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">{comp.courseName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(comp.completionDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      <Award className="w-3 h-3 mr-1" />
                      {comp.score}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm font-mono text-gray-500 dark:text-gray-400">
                      <Hash className="w-4 h-4 mr-1" />
                      {comp.certificateId}
                    </div>
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

export default AdminCompletedCourses;
