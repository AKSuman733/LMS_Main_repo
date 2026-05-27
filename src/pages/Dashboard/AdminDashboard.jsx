import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, UserPlus, Award } from 'lucide-react';
import { MOCK_METRICS } from '../../utils/mockData';

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setMetrics(MOCK_METRICS);
      setLoading(false);
    }, 400);
  }, []);

  if (loading) return <div>Loading metrics...</div>;

  const statCards = [
    { title: 'Total Students', value: metrics?.totalStudents || 0, icon: <Users size={32} />, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300', path: '/admin/students' },
    { title: 'Total Courses', value: metrics?.totalCourses || 0, icon: <BookOpen size={32} />, color: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300', path: '/admin/courses' },
    { title: 'Course Enrollments', value: metrics?.totalEnrollments || 0, icon: <UserPlus size={32} />, color: 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300', path: '/admin/enrollments' },
    { title: 'Completed Courses', value: metrics?.completedCourses || 0, icon: <Award size={32} />, color: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300', path: '/admin/completed' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map(stat => (
          <div 
            key={stat.title} 
            onClick={() => navigate(stat.path)}
            className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex items-center space-x-4 cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-200"
          >
            <div className={`p-4 rounded-full ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
