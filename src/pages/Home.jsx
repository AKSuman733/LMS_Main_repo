import { Link } from 'react-router-dom';
import { BookOpen, Star, Users } from 'lucide-react';

const Home = () => {
  const mode = import.meta.env.MODE;
  const getStartedPath = mode === 'student' ? '/login/student' : 
                         mode === 'admin' ? '/login/admin' : 
                         '/roles';

  return (
    <div className="w-full max-w-6xl mx-auto space-y-16 py-8">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
          Learn with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Uptoskills AI Learning</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          The ultimate platform where you can master technical skills guided by your favorite AI-powered Telugu Hero styles.
        </p>
        <div className="pt-8">
          <Link 
            to={getStartedPath}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8 pt-12">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 dark:text-blue-400">
            <BookOpen size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Premium Courses</h3>
          <p className="text-gray-600 dark:text-gray-400">Master Web Dev, React, Node.js and more with our structured curriculum.</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
          <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600 dark:text-purple-400">
            <Star size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Hero Instructors</h3>
          <p className="text-gray-600 dark:text-gray-400">Learn in the style of your favorite Telugu heroes for maximum motivation.</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 dark:text-green-400">
            <Users size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Dual Access</h3>
          <p className="text-gray-600 dark:text-gray-400">Dedicated portals for both students and administrators to manage the platform.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
