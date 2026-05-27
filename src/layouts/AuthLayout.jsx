import { Outlet, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';

const AuthLayout = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (user) {
    return <Navigate to={`/${user.role}/dashboard`} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Welcome to Uptoskills AI Learning
        </h2>
        {(!import.meta.env.MODE || import.meta.env.MODE === 'development') && (
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            <Link to="/roles" className="font-medium text-blue-600 hover:text-blue-500">
              &larr; Back to Role Selection
            </Link>
          </p>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
