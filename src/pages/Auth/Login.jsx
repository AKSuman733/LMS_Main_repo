import { useState } from 'react';

import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Spinner from '../../components/Spinner';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

const Login = ({ forcedRole }) => {
  const params = useParams();
  const role = forcedRole || params.role;
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
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

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <Input
          id="email"
          label="Email address"
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors({ ...errors, email: '' });
          }}
          error={errors.email}
        />

        <Input
          id="password"
          label="Password"
          type="password"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors({ ...errors, password: '' });
          }}
          error={errors.password}
        />

        <Button
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Spinner size="sm" />
              Logging in...
            </span>
          ) : (
            'Sign in'
          )}
        </Button>
      </form>

      {role !== 'admin' && (
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600 dark:text-gray-400">Don't have an account? </span>
          <Link to={`/register/${role}`} className="font-medium text-brand-orange hover:text-brand-orange transition-colors">
            Register here
          </Link>
        </div>
      )}
    </div>
  );
};

export default Login;
