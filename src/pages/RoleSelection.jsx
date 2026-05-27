
import { useNavigate, Navigate } from 'react-router-dom';
import { User, Shield } from 'lucide-react';
import { useAuth } from '../store/AuthContext';

const RoleSelection = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (user) {
    return <Navigate to={`/${user.role}/dashboard`} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] w-full">
      <div className="w-full max-w-4xl p-8 mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            Welcome to Uptoskills AI Learning
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Select your role to continue
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <button
            onClick={() => navigate('/login/student')}
            className="flex flex-col items-center justify-center p-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border-2 border-transparent hover:border-blue-500 group"
          >
            <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <User size={48} className="text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Student</h3>
            <p className="text-gray-500 dark:text-gray-400 text-center">
              Access courses, track progress, and earn certificates
            </p>
          </button>

          <button
            onClick={() => navigate('/login/admin')}
            className="flex flex-col items-center justify-center p-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border-2 border-transparent hover:border-purple-500 group"
          >
            <div className="w-24 h-24 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Shield size={48} className="text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Administrator</h3>
            <p className="text-gray-500 dark:text-gray-400 text-center">
              Manage courses, view metrics, and track student progress
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
