import { useState } from 'react';

import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';

const Login = ({ forcedRole }) => {
  const params = useParams();
  const role = forcedRole || params.role;
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate network delay and mock login
    setTimeout(() => {
      login({
        id: Math.floor(Math.random() * 1000),
        name: email.split('@')[0],
        email,
        role
      });
      navigate(`/${role}/dashboard`);
    }, 800);
  };

  return (
    <div>
      <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6 capitalize text-center">
        {role} Login 
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password 
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Sign in'}
        </button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-gray-600 dark:text-gray-400">Don't have an account? </span>
        <Link to={`/register/${role}`} className="font-medium text-blue-600 hover:text-blue-500">
          Register here
        </Link>
      </div>
    </div>
  );
};

export default Login;
