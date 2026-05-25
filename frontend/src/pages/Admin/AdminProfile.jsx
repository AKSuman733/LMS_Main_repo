import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  User, 
  Mail, 
  Shield, 
  Camera, 
  Save, 
  Loader2,
  Lock,
  Key,
  ShieldCheck,
  CheckCircle
} from 'lucide-react';

const AdminProfile = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'admin',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate update
    setTimeout(() => {
      setLoading(false);
      toast.success('Profile updated successfully!');
    }, 1000);
  };

  return (
    <div className="admin-profile-page max-w-6xl mx-auto">
      <div className="admin-header-row mb-10">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-white">Account Settings</h1>
          <p className="text-gray-500">Manage your administrative profile and security preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar - Profile Card */}
        <div className="lg:col-span-1">
          <div className="card glass p-8 text-center sticky top-24 border-primary-color/20">
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 rounded-full bg-primary-gradient p-1">
                <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden border-2" style={{background: 'var(--surface-color)', borderColor: 'var(--border-color)'}}>
                  <span className="text-4xl font-bold text-primary-color">{user?.name?.charAt(0).toUpperCase()}</span>
                </div>
              </div>
              <button className="absolute bottom-0 right-0 p-2.5 bg-primary-color rounded-full text-white border-4 hover:scale-110 transition-all shadow-xl" style={{borderColor: 'var(--surface-color)'}}>
                <Camera size={16} />
              </button>
            </div>
            
            <h2 className="text-xl font-bold text-white mb-1">{formData.name}</h2>
            <p className="text-primary-color font-semibold text-sm mb-6 flex items-center justify-center gap-1">
              <ShieldCheck size={14} />
              {formData.role.toUpperCase()}
            </p>
            
            <div className="flex flex-col gap-3">
              <div className="bg-white/5 p-4 rounded-xl text-left border border-white/5">
                <p className="text-[10px] text-gray-500 mb-1 uppercase font-black tracking-widest">Platform Status</p>
                <div className="flex items-center gap-2 text-success-color">
                  <CheckCircle size={14} />
                  <span className="text-xs font-bold">Verified {formData.role === 'admin' ? 'Administrator' : 'Instructor'}</span>
                </div>
              </div>
              <div className="bg-white/5 p-4 rounded-xl text-left border border-white/5">
                <p className="text-[10px] text-gray-500 mb-1 uppercase font-black tracking-widest">Access Level</p>
                <div className="flex items-center gap-2 text-primary-color">
                  <Lock size={14} />
                  <span className="text-xs font-bold">Full System Access</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Forms */}
        <div className="lg:col-span-3 flex flex-col gap-8">
          {/* Personal Info Section */}
          <div className="card glass p-8">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-white">
              <User className="text-primary-color" size={22} />
              Personal Information
            </h3>
            <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    type="text" 
                    className="form-input-premium pl-12"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    type="email" 
                    className="form-input-premium pl-12 opacity-60 cursor-not-allowed"
                    value={formData.email}
                    readOnly
                  />
                </div>
              </div>

              <div className="form-group md:col-span-2">
                <label className="form-label">Professional Role</label>
                <div className="relative">
                  <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    type="text" 
                    className="form-input-premium pl-12 opacity-60 cursor-not-allowed"
                    value={formData.role === 'admin' ? 'Super Administrator' : formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}
                    readOnly
                  />
                </div>
              </div>

              <div className="md:col-span-2 flex justify-end">
                <button type="submit" className="btn btn-primary px-10 py-4 flex items-center gap-2 font-bold shadow-lg" disabled={loading}>
                  {loading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>

          {/* Security Section */}
          <div className="card glass p-8">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-white">
              <Key className="text-primary-color" size={22} />
              Account Security
            </h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="form-group md:col-span-2">
                <label className="form-label">Current Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    type="password" 
                    className="form-input-premium pl-12"
                    placeholder="••••••••••••"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">New Password</label>
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    type="password" 
                    className="form-input-premium pl-12"
                    placeholder="Min. 8 characters"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Confirm New Password</label>
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    type="password" 
                    className="form-input-premium pl-12"
                    placeholder="Repeat new password"
                  />
                </div>
              </div>

              <div className="md:col-span-2 flex justify-end">
                <button type="button" className="btn btn-outline-primary px-10 py-4 font-bold border-white/10 hover:border-primary-color">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
