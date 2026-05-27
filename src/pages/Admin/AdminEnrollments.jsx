import { useState, useEffect } from 'react';
import { MOCK_ADMIN_ENROLLMENTS } from '../../utils/mockData';
import { Clock, CheckCircle, Activity } from 'lucide-react';

const AdminEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate network delay
    setTimeout(() => {
      setEnrollments(MOCK_ADMIN_ENROLLMENTS);
      setLoading(false);
    }, 400);
  }, []);

  if (loading) return <div>Loading enrollments...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Course Enrollments</h2>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date Enrolled</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {enrollments.map(enroll => (
                <tr key={enroll.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 dark:text-white">{enroll.studentName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">{enroll.courseName}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(enroll.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      enroll.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      enroll.status === 'Active' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {enroll.status === 'Completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {enroll.status === 'Active' && <Activity className="w-3 h-3 mr-1" />}
                      {enroll.status === 'Inactive' && <Clock className="w-3 h-3 mr-1" />}
                      {enroll.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-24">
                        <div 
                          className="h-2 bg-blue-600 rounded-full" 
                          style={{ width: `${enroll.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{enroll.progress}%</span>
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

export default AdminEnrollments;
