<<<<<<< HEAD
import { useState, useRef } from 'react';
=======
import { useState } from 'react';
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
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
<<<<<<< HEAD
  CheckCircle,
  Eye,
  EyeOff
=======
<<<<<<< HEAD
  CheckCircle,
  Eye,
  EyeOff
=======
  CheckCircle
>>>>>>> ea7d4c330ef821eaa42c835b4f6fb8675e70f7fe
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
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
<<<<<<< HEAD
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(user?.profileImage || null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
=======
<<<<<<< HEAD
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
=======
>>>>>>> ea7d4c330ef821eaa42c835b4f6fb8675e70f7fe
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383

  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
<<<<<<< HEAD
    
    setTimeout(() => {
      const updatedUser = { ...user, name: formData.name, profileImage };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Dispatch event to notify Navbar and Layout components to re-read localStorage
      window.dispatchEvent(new Event('profileUpdated'));
      
=======
    // Simulate update
    setTimeout(() => {
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
      setLoading(false);
      toast.success('Profile updated successfully!');
    }, 1000);
  };

  return (
    <div className="admin-profile-page max-w-6xl mx-auto">
      <div className="admin-header-row mb-10">
        <div>
<<<<<<< HEAD
          <h1 className="text-3xl font-bold mb-2 text-primary">Account Settings</h1>
          <p className="text-secondary">Manage your profile and security preferences</p>
=======
          <h1 className="text-3xl font-bold mb-2 text-white">Account Settings</h1>
          <p className="text-gray-500">Manage your administrative profile and security preferences</p>
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar - Profile Card */}
        <div className="lg:col-span-1">
<<<<<<< HEAD
          <div className="card glass p-8 text-center sticky top-24 border-primary-color/20 hover:border-primary-color/50 transition-colors shadow-2xl">
            <div 
              className="group"
              style={{ position: 'relative', display: 'inline-block', marginBottom: '1.5rem', cursor: 'pointer' }} 
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/*" 
                style={{ display: 'none' }} 
              />
              <div style={{ width: '128px', height: '128px', borderRadius: '50%', background: 'var(--primary-gradient)', padding: '4px', transition: 'transform 0.3s', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '2px solid var(--border-color)', background: 'var(--surface-color)', position: 'relative' }}>
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ fontSize: '3rem', fontWeight: '800', background: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{formData.name?.charAt(0).toUpperCase()}</span>
                  )}
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Camera style={{ color: 'var(--primary-color)', marginBottom: '4px' }} size={24} />
                    <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--primary-color)' }}>Change Photo</span>
                  </div>
                </div>
              </div>
              <button 
                type="button"
                className="absolute bottom-1 right-1 p-2.5 bg-primary-color rounded-full text-white border-4 hover:bg-white hover:text-primary-color transition-all shadow-xl z-10" 
                style={{borderColor: 'var(--surface-color)'}}
                onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                title="Upload Photo"
              >
                <Camera size={18} />
              </button>
            </div>
            
            <h2 className="text-2xl font-black text-primary mb-1 tracking-wide">{formData.name}</h2>
            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-color/20 text-primary-color border border-primary-color/30 flex items-center gap-1">
                <ShieldCheck size={14} />
                {formData.role}
              </span>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="bg-white/5 p-4 rounded-xl text-left border border-white/10 hover:border-success-color/50 transition-colors shadow-inner">
                <p className="text-[10px] text-secondary mb-1 uppercase font-black tracking-widest">Platform Status</p>
                <div className="flex items-center gap-2 text-success-color">
                  <CheckCircle size={18} />
                  <span className="text-sm font-bold">Verified {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}</span>
                </div>
              </div>
              <div className="bg-white/5 p-4 rounded-xl text-left border border-white/10 hover:border-primary-color/50 transition-colors shadow-inner">
                <p className="text-[10px] text-secondary mb-1 uppercase font-black tracking-widest">Access Level</p>
                <div className="flex items-center gap-2 text-primary-color">
                  <Lock size={18} />
                  <span className="text-sm font-bold">{formData.role === 'admin' ? 'Full System Access' : 'Standard Access'}</span>
=======
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
              <ShieldCheck size={16} />
              {formData.role.toUpperCase()}
            </p>
            
            <div className="flex flex-col gap-3">
              <div className="bg-white/5 p-4 rounded-xl text-left border border-white/5">
                <p className="text-[10px] text-gray-500 mb-1 uppercase font-black tracking-widest">Platform Status</p>
                <div className="flex items-center gap-2 text-success-color">
                  <CheckCircle size={16} />
                  <span className="text-xs font-bold">Verified {formData.role === 'admin' ? 'Administrator' : 'Instructor'}</span>
                </div>
              </div>
              <div className="bg-white/5 p-4 rounded-xl text-left border border-white/5">
                <p className="text-[10px] text-gray-500 mb-1 uppercase font-black tracking-widest">Access Level</p>
                <div className="flex items-center gap-2 text-primary-color">
                  <Lock size={16} />
                  <span className="text-xs font-bold">Full System Access</span>
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Forms */}
        <div className="lg:col-span-3 flex flex-col gap-8">
          {/* Personal Info Section */}
          <div className="card glass p-8">
<<<<<<< HEAD
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-primary">
=======
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-white">
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
              <User className="text-primary-color" size={22} />
              Personal Information
            </h3>
            <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="form-group">
                <label className="form-label">Full Name</label>
<<<<<<< HEAD
                <div className="form-input-wrapper">
                  <User size={18} />
                  <input 
                    type="text" 
                    className="form-input-premium"
                    placeholder="Enter your full name"
                    value={formData.name}
=======
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    type="text" 
                    className="form-input-premium pl-12"
                    placeholder="Enter your full name"
                    value={formData.name}
<<<<<<< HEAD
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
                    onChange={(e) => {
                      const val = e.target.value;
                      const filtered = val.replace(/[^a-zA-Z\s]/g, '');
                      if (val !== filtered) {
                        toast.error('Name can only contain letters and spaces');
                      }
                      setFormData({...formData, name: filtered});
                    }}
<<<<<<< HEAD
=======
=======
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
>>>>>>> ea7d4c330ef821eaa42c835b4f6fb8675e70f7fe
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Email Address</label>
<<<<<<< HEAD
                <div className="form-input-wrapper">
                  <Mail size={18} />
                  <input 
                    type="email" 
                    className="form-input-premium opacity-60 cursor-not-allowed"
=======
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    type="email" 
                    className="form-input-premium pl-12 opacity-60 cursor-not-allowed"
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
                    value={formData.email}
                    readOnly
                  />
                </div>
              </div>

              <div className="form-group md:col-span-2">
                <label className="form-label">Professional Role</label>
<<<<<<< HEAD
                <div className="form-input-wrapper">
                  <Shield size={18} />
                  <input 
                    type="text" 
                    className="form-input-premium opacity-60 cursor-not-allowed"
                    value={formData.role === 'admin' ? 'Super Administrator' : formData.role === 'student' ? 'Student Learner' : formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}
=======
                <div className="relative">
                  <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    type="text" 
                    className="form-input-premium pl-12 opacity-60 cursor-not-allowed"
                    value={formData.role === 'admin' ? 'Super Administrator' : formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
                    readOnly
                  />
                </div>
              </div>

<<<<<<< HEAD
              <div className="md:col-span-2 flex justify-end mt-4">
                <button type="submit" className="btn btn-primary px-8 py-3 flex items-center gap-2 font-bold shadow-lg transition-all hover:-translate-y-1" disabled={loading}>
=======
              <div className="md:col-span-2 flex justify-end">
                <button type="submit" className="btn btn-primary px-10 py-4 flex items-center gap-2 font-bold shadow-lg" disabled={loading}>
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
                  {loading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>

          {/* Security Section */}
          <div className="card glass p-8">
<<<<<<< HEAD
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-primary">
=======
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-white">
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
              <Key className="text-primary-color" size={22} />
              Account Security
            </h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="form-group md:col-span-2">
                <label className="form-label">Current Password</label>
<<<<<<< HEAD
                <div className="form-input-wrapper has-right-icon">
                  <Lock size={18} />
=======
<<<<<<< HEAD
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280', pointerEvents: 'none' }} />
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
                  <input 
                    type={showCurrentPassword ? "text" : "password"} 
                    className="form-input-premium"
                    placeholder="••••••••••••"
<<<<<<< HEAD
=======
                    style={{ paddingLeft: '48px', paddingRight: '48px', width: '100%' }}
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
                    value={formData.currentPassword}
                    onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                  />
                  <button 
                    type="button" 
<<<<<<< HEAD
                    className="right-icon-btn"
=======
                    style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
<<<<<<< HEAD
=======
=======
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    type="password" 
                    className="form-input-premium pl-12"
                    placeholder="••••••••••••"
                  />
>>>>>>> ea7d4c330ef821eaa42c835b4f6fb8675e70f7fe
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">New Password</label>
<<<<<<< HEAD
                <div className="form-input-wrapper has-right-icon">
                  <Key size={18} />
=======
<<<<<<< HEAD
                <div style={{ position: 'relative' }}>
                  <Key size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280', pointerEvents: 'none' }} />
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
                  <input 
                    type={showNewPassword ? "text" : "password"} 
                    className="form-input-premium"
                    placeholder="Min. 8 characters"
<<<<<<< HEAD
=======
                    style={{ paddingLeft: '48px', paddingRight: '48px', width: '100%' }}
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
                    value={formData.newPassword}
                    onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                  />
                  <button 
                    type="button" 
<<<<<<< HEAD
                    className="right-icon-btn"
=======
                    style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
<<<<<<< HEAD
=======
=======
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    type="password" 
                    className="form-input-premium pl-12"
                    placeholder="Min. 8 characters"
                  />
>>>>>>> ea7d4c330ef821eaa42c835b4f6fb8675e70f7fe
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Confirm New Password</label>
<<<<<<< HEAD
                <div className="form-input-wrapper has-right-icon">
                  <Key size={18} />
=======
<<<<<<< HEAD
                <div style={{ position: 'relative' }}>
                  <Key size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280', pointerEvents: 'none' }} />
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
                  <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    className="form-input-premium"
                    placeholder="Repeat new password"
<<<<<<< HEAD
=======
                    style={{ paddingLeft: '48px', paddingRight: '48px', width: '100%' }}
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  />
                  <button 
                    type="button" 
<<<<<<< HEAD
                    className="right-icon-btn"
=======
                    style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
<<<<<<< HEAD
                </div>
              </div>

              <div className="md:col-span-2 flex justify-end mt-4">
                <button type="button" className="btn btn-outline px-8 py-3 font-bold hover:text-primary-color hover:border-primary-color transition-colors">
=======
=======
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    type="password" 
                    className="form-input-premium pl-12"
                    placeholder="Repeat new password"
                  />
>>>>>>> ea7d4c330ef821eaa42c835b4f6fb8675e70f7fe
                </div>
              </div>

              <div className="md:col-span-2 flex justify-end">
                <button type="button" className="btn btn-outline-primary px-10 py-4 font-bold border-white/10 hover:border-primary-color">
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
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
