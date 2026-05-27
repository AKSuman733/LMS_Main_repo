import { useState, useEffect } from 'react';
import { MOCK_STUDENTS } from '../../utils/mockData';
import { Eye, ArrowLeft, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const AdminStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setStudents(MOCK_STUDENTS);
      setLoading(false);
    }, 400);
  }, []);

  if (loading) return <div>Loading...</div>;

  if (selectedStudent) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setSelectedStudent(null)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {selectedStudent.name}'s Progress
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h3>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{selectedStudent.email}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Active</h3>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{new Date(selectedStudent.last_active).toLocaleDateString()}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Status</h3>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                selectedStudent.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {selectedStudent.status}
              </span>
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Course Details</h3>
        <div className="grid grid-cols-1 gap-6">
          {selectedStudent.courses?.map(course => (
            <div key={course.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">{course.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                    {course.status === 'Completed' ? <CheckCircle className="w-4 h-4 mr-1 text-green-500" /> : 
                     course.status === 'In Progress' ? <Clock className="w-4 h-4 mr-1 text-blue-500" /> :
                     <AlertCircle className="w-4 h-4 mr-1 text-gray-500" />}
                    {course.status}
                  </p>
                </div>
                {course.quiz_score !== null && (
                  <div className="text-right">
                    <span className="text-sm text-gray-500 dark:text-gray-400 block">Quiz Score</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">{course.quiz_score}%</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-700 dark:text-gray-300">Progress</span>
                  <span className="text-gray-900 dark:text-white">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${course.progress === 100 ? 'bg-green-600' : 'bg-blue-600'}`} 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              {course.remarks && (
                <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Instructor Remarks: </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{course.remarks}</span>
                </div>
              )}
            </div>
          ))}
          {(!selectedStudent.courses || selectedStudent.courses.length === 0) && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No courses enrolled yet.
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Student Progress</h2>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Enrolled Courses</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Completed Courses</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {students.map(student => (
                <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 dark:text-white">{student.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{student.email}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {student.enrolled_count}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {student.completed_count}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => setSelectedStudent(student)}
                      className="inline-flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm transition-colors"
                    >
                      <Eye size={16} />
                      <span>View Details</span>
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

export default AdminStudents;
