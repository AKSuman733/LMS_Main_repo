
import { Outlet, Link } from 'react-router-dom';

const MainLayout = ({ children }) => {
  const mode = import.meta.env.MODE;
  const loginPath = mode === 'student' ? '/login/student' : 
                    mode === 'admin' ? '/login/admin' : 
                    '/roles';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col transition-colors duration-200">
      <header className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">Uptoskills AI Learning</h1>
        <nav className="space-x-4">
          <Link to={loginPath} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">Log In / Register</Link>
        </nav>
      </header>
      
      <main className="flex-1">
        {children || <Outlet />}
      </main>

      <footer className="bg-white dark:bg-gray-800 p-6 text-center text-gray-500 dark:text-gray-400 border-t dark:border-gray-700">
        &copy; {new Date().getFullYear()} Uptoskills AI Learning. All rights reserved.
      </footer>
    </div>
  );
};

export default MainLayout;
