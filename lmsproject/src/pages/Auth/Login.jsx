import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Toast from '../../components/Toast';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [toast, setToast] = useState(null);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  function isEmailValid(e) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  }

  function passwordStrength(pw) {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score; // 0-4
  }

  const handleLogin = (e) => {
    e.preventDefault();
    if (!isEmailValid(email)) return setToast({ type: 'error', message: 'Enter a valid email' });
    if (password.length < 6) return setToast({ type: 'error', message: 'Password too short' });

    const userData = {
      isAuthenticated: true,
      role: role,
      name: "AKS",
      email: email,
    };

    login(userData);

    // Redirect based on role
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  const strength = passwordStrength(password);
  const strengthColor = strength <= 1 ? 'bg-red-500' : strength === 2 ? 'bg-amber-500' : 'bg-green-500';

  return (
    <div className="min-h-screen bg-[#070B14] text-white flex items-center justify-center p-6">
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}

      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black mb-3">Welcome Back</h1>
          <p className="text-gray-400">Login to continue learning</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block mb-3 text-gray-300">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full bg-[#0B1120] border ${email ? (isEmailValid(email) ? 'border-green-500' : 'border-red-500') : 'border-white/10'} rounded-2xl px-5 py-4 outline-none`}
            />
          </div>

          <div>
            <label className="block mb-3 text-gray-300">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full bg-[#0B1120] border ${password ? (strength <=1 ? 'border-red-500' : strength===2? 'border-amber-500' : 'border-green-500') : 'border-white/10'} rounded-2xl px-5 py-4 outline-none`}
            />
            {password && (
              <div className="mt-2 h-2 rounded-full w-full bg-white/5 overflow-hidden">
                <div className={`${strengthColor} h-2`} style={{ width: `${(strength/4)*100}%` }} />
              </div>
            )}
          </div>

          <div>
            <label className="block mb-3 text-gray-300">Login As</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full bg-[#0B1120] border border-white/10 rounded-2xl px-5 py-4 outline-none">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button className="w-full bg-orange-600 hover:bg-orange-500 transition py-4 rounded-2xl font-bold">Login</button>

          <p className="text-center text-gray-400">Don’t have an account? <span className="text-orange-400 cursor-pointer"><Link to="/signUp">SignUp</Link></span></p>
        </form>
      </div>
    </div>
  );
}

export default Login;