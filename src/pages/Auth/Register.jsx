import { useState } from 'react';

import { useParams, Link, useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';


const Register = ({ forcedRole }) => {
  const params = useParams();
  const role = forcedRole || params.role;
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name) {
      newErrors.name = 'Full name is required';
    }
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    
    // Simulate network delay and mock registration
    setTimeout(() => {
      navigate(`/login/${role}`);
    }, 800);
  };

  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: '', color: 'bg-gray-200' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    
    if (score <= 1) return { score, label: 'Weak', color: 'bg-red-500' };
    if (score <= 3) return { score, label: 'Fair', color: 'bg-yellow-500' };
    return { score, label: 'Strong', color: 'bg-green-500' };
  };
  const strength = getPasswordStrength(password);

  return (
    <div>
      <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6 capitalize text-center">
        {role} Registration 
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <Input
          id="name"
          label="Full Name"
          type="text"
          required
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors({ ...errors, name: '' });
          }}
          error={errors.name}
        />

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

        <div>
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
          {password && (
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-500">Password strength:</span>
                <span className="font-medium text-gray-700">{strength.label}</span>
              </div>
              <div className="flex gap-1 h-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div 
                    key={level} 
                    className={`flex-1 rounded-full ${level <= strength.score ? strength.color : 'bg-gray-200'}`} 
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Spinner size="sm" />
              Registering...
            </span>
          ) : (
            'Register'
          )}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-gray-600 dark:text-gray-400">Already have an account? </span>
        <Link to={`/login/${role}`} className="font-medium text-brand-orange hover:text-brand-orange transition-colors">
          Sign in here
        </Link>
      </div>
    </div>
  );
};

export default Register;
