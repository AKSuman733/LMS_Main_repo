import { useState } from 'react';
import { Shield, Bell, Palette, AlertTriangle, Eye, EyeOff, Laptop, Check } from 'lucide-react';

export function Settings() {
  const [activeCategory, setActiveCategory] = useState<'security' | 'notifications' | 'appearance' | 'danger'>('security');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  // 2FA State
  const [is2faEnabled, setIs2faEnabled] = useState(false);

  // Notifications State
  const [notifs, setNotifs] = useState({
    reminders: true,
    recommendations: true,
    certAlerts: true,
    weeklyEmail: true,
    replies: false,
    promo: false,
  });

  // Appearance State
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [language, setLanguage] = useState('English');

  // Modals
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const getPasswordStrength = () => {
    if (!newPassword) return { score: 0, text: 'Empty', color: 'bg-slate-200' };
    let score = 0;
    if (newPassword.length >= 6) score += 1;
    if (/[A-Z]/.test(newPassword)) score += 1;
    if (/[0-9]/.test(newPassword)) score += 1;
    if (/[^A-Za-z0-9]/.test(newPassword)) score += 1;

    switch (score) {
      case 1: return { score: 1, text: 'Weak', color: 'bg-[#EF4444]' };
      case 2: return { score: 2, text: 'Fair', color: 'bg-[#F97316]' };
      case 3: return { score: 3, text: 'Good', color: 'bg-[#EAB308]' };
      case 4: return { score: 4, text: 'Strong', color: 'bg-[#2D1B69]' };
      default: return { score: 0, text: 'Empty', color: 'bg-slate-200' };
    }
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPassword && newPassword && confirmPassword) {
      if (newPassword !== confirmPassword) {
        triggerToast('Passwords do not match ❌');
        return;
      }
      triggerToast('Password updated successfully ✓');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const handleDeactivate = () => {
    setShowDeactivateModal(false);
    triggerToast('Account deactivated successfully ✓');
  };

  const handleDelete = () => {
    if (deleteConfirmationText === 'DELETE') {
      setShowDeleteModal(false);
      setDeleteConfirmationText('');
      triggerToast('Account permanently deleted ✓');
    }
  };

  const categories = [
    { id: 'security', label: 'Account Security', icon: <Shield size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette size={18} /> },
    { id: 'danger', label: 'Danger Zone', icon: <AlertTriangle size={18} /> },
  ] as const;

  const strength = getPasswordStrength();

  return (
    <div className="max-w-[1280px] mx-auto bg-white rounded-[16px] border border-[#E2E1F0] p-6 md:p-10 shadow-[0_4px_24px_rgba(45,27,105,0.02)] relative">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 right-6 bg-[#2D1B69] text-[#BBFF00] font-bold text-[14px] px-5 py-3 rounded-[10px] shadow-lg flex items-center gap-2 z-50 animate-[slideDown_0.2s_ease-out] select-none border border-[#BBFF00]/20">
          <Check size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-[#E2E1F0] pb-6 mb-8">
        <h1 className="text-[28px] font-bold text-[#1A1A2E] leading-none mb-2">Settings</h1>
        <p className="text-[14px] text-[#6B6B80] font-medium">
          Manage your account preferences and security.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Left Sticky Nav */}
        <aside className="lg:col-span-1 space-y-1 z-10 lg:sticky lg:top-24">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full h-[40px] px-3.5 flex items-center gap-3 text-[14px] font-bold border-l-3 transition-colors cursor-pointer select-none text-left rounded-r-[6px] ${
                  isActive
                    ? 'border-[#2D1B69] bg-[#EDE9FF] text-[#2D1B69]'
                    : 'border-transparent text-[#6B6B80] hover:bg-[#F7F6F3] hover:text-[#1A1A2E]'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Right Content Panels */}
        <div className="lg:col-span-3">
          {/* CATEGORY 1: Account Security */}
          {activeCategory === 'security' && (
            <div className="bg-white border border-[#E2E1F0] rounded-[16px] p-6 shadow-sm space-y-8">
              <div>
                <h3 className="text-[18px] font-bold text-[#1A1A2E] mb-6">Account Security</h3>

                {/* Change Password Form */}
                <form onSubmit={handlePasswordUpdate} className="space-y-4 max-w-[480px]">
                  {/* Current Password */}
                  <div className="flex flex-col relative">
                    <label className="text-[13px] text-[#6B6B80] font-medium mb-1.5">Current Password</label>
                    <div className="relative">
                      <input
                        type={showCurrent ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full h-[44px] px-3.5 pr-10 bg-white border border-[#E2E1F0] rounded-[8px] text-[14px] outline-none focus:border-[#2D1B69] focus:ring-1 focus:ring-[#2D1B69] transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrent(!showCurrent)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B6B80] hover:text-[#1A1A2E] cursor-pointer"
                      >
                        {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="flex flex-col">
                    <label className="text-[13px] text-[#6B6B80] font-medium mb-1.5">New Password</label>
                    <div className="relative">
                      <input
                        type={showNew ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full h-[44px] px-3.5 pr-10 bg-white border border-[#E2E1F0] rounded-[8px] text-[14px] outline-none focus:border-[#2D1B69] focus:ring-1 focus:ring-[#2D1B69] transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B6B80] hover:text-[#1A1A2E] cursor-pointer"
                      >
                        {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>

                    {/* Password Strength Meter */}
                    {newPassword && (
                      <div className="mt-2.5">
                        <div className="h-[6px] bg-slate-200 rounded-full flex gap-1 overflow-hidden">
                          <div className={`h-full ${strength.color}`} style={{ width: `${(strength.score / 4) * 100}%` }} />
                        </div>
                        <span className="text-[11px] text-[#6B6B80] font-bold mt-1 block">
                          Strength: <strong className="text-[#2D1B69]">{strength.text}</strong>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="flex flex-col">
                    <label className="text-[13px] text-[#6B6B80] font-medium mb-1.5">Confirm New Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-[44px] px-3.5 bg-white border border-[#E2E1F0] rounded-[8px] text-[14px] outline-none focus:border-[#2D1B69] focus:ring-1 focus:ring-[#2D1B69] transition-all"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="h-[44px] px-6 bg-[#2D1B69] text-white hover:bg-[#3D2B89] font-bold text-[13px] rounded-[10px] cursor-pointer transition-colors shadow-sm"
                  >
                    Update Password
                  </button>
                </form>
              </div>

              <div className="border-t border-[#E2E1F0] my-6"></div>

              {/* Two-Factor Authentication */}
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="block text-[15px] font-bold text-[#1A1A2E]">Two-Factor Authentication</span>
                    {is2faEnabled && (
                      <span className="bg-[#D1FAE5] text-[#065F46] text-[10px] font-bold px-2 py-0.5 rounded-full select-none">
                        2FA Enabled
                      </span>
                    )}
                  </div>
                  <span className="text-[13px] text-[#6B6B80] font-medium mt-0.5 block">
                    Add an extra layer of security to your account
                  </span>
                </div>
                <button
                  onClick={() => {
                    setIs2faEnabled(!is2faEnabled);
                    triggerToast(!is2faEnabled ? '2FA Enabled successfully ✓' : '2FA Disabled successfully');
                  }}
                  className={`w-[44px] h-[24px] rounded-full transition-colors relative cursor-pointer ${
                    is2faEnabled ? 'bg-[#2D1B69]' : 'bg-slate-200'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${
                    is2faEnabled ? 'left-6' : 'left-1'
                  }`} />
                </button>
              </div>

              <div className="border-t border-[#E2E1F0] my-6"></div>

              {/* Active Sessions */}
              <div>
                <h4 className="text-[14px] font-bold text-[#1A1A2E] mb-4">Active Sessions</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-[38px] h-[38px] rounded-full bg-[#EDE9FF] flex items-center justify-center text-[#2D1B69]">
                        <Laptop size={16} />
                      </div>
                      <div>
                        <span className="block text-[13px] font-bold text-[#1A1A2E] leading-tight">
                          Chrome on Windows • Mumbai, India
                        </span>
                        <span className="text-[11px] text-[#22C55E] font-bold">Active now</span>
                      </div>
                    </div>
                    <span className="text-[12px] text-[#6B6B80] font-bold">Current Device</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-[38px] h-[38px] rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                        <Laptop size={16} />
                      </div>
                      <div>
                        <span className="block text-[13px] font-bold text-[#1A1A2E] leading-tight">
                          Safari on iPhone 15 • Pune, India
                        </span>
                        <span className="text-[11px] text-[#6B6B80] font-medium">Last active 2 days ago</span>
                      </div>
                    </div>
                    <button
                      onClick={() => triggerToast('Logged out of session successfully ✓')}
                      className="text-[12px] text-[#EF4444] font-bold hover:underline cursor-pointer"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CATEGORY 2: Notifications */}
          {activeCategory === 'notifications' && (
            <div className="bg-white border border-[#E2E1F0] rounded-[16px] p-6 shadow-sm">
              <h3 className="text-[18px] font-bold text-[#1A1A2E] mb-6">Notification Preferences</h3>

              <div className="space-y-1">
                {/* Reminders */}
                <div className="flex items-center justify-between h-[56px] border-b border-[#E2E1F0]/60">
                  <div>
                    <span className="block text-[14px] font-bold text-[#1A1A2E] leading-none mb-1">
                      Course completion reminders
                    </span>
                    <span className="text-[12px] text-[#6B6B80] font-medium">Receive alerts before streaks reset</span>
                  </div>
                  <button
                    onClick={() => setNotifs({ ...notifs, reminders: !notifs.reminders })}
                    className={`w-[44px] h-[24px] rounded-full transition-colors relative cursor-pointer ${
                      notifs.reminders ? 'bg-[#2D1B69]' : 'bg-slate-200'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${
                      notifs.reminders ? 'left-6' : 'left-1'
                    }`} />
                  </button>
                </div>

                {/* Recommendations */}
                <div className="flex items-center justify-between h-[56px] border-b border-[#E2E1F0]/60">
                  <div>
                    <span className="block text-[14px] font-bold text-[#1A1A2E] leading-none mb-1">
                      New course recommendations
                    </span>
                    <span className="text-[12px] text-[#6B6B80] font-medium">Get suggestions based on completed topics</span>
                  </div>
                  <button
                    onClick={() => setNotifs({ ...notifs, recommendations: !notifs.recommendations })}
                    className={`w-[44px] h-[24px] rounded-full transition-colors relative cursor-pointer ${
                      notifs.recommendations ? 'bg-[#2D1B69]' : 'bg-slate-200'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${
                      notifs.recommendations ? 'left-6' : 'left-1'
                    }`} />
                  </button>
                </div>

                {/* Cert alerts */}
                <div className="flex items-center justify-between h-[56px] border-b border-[#E2E1F0]/60">
                  <div>
                    <span className="block text-[14px] font-bold text-[#1A1A2E] leading-none mb-1">
                      Certificate earned alerts
                    </span>
                    <span className="text-[12px] text-[#6B6B80] font-medium">Immediate email updates for career certificates</span>
                  </div>
                  <button
                    onClick={() => setNotifs({ ...notifs, certAlerts: !notifs.certAlerts })}
                    className={`w-[44px] h-[24px] rounded-full transition-colors relative cursor-pointer ${
                      notifs.certAlerts ? 'bg-[#2D1B69]' : 'bg-slate-200'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${
                      notifs.certAlerts ? 'left-6' : 'left-1'
                    }`} />
                  </button>
                </div>

                {/* Weekly summary */}
                <div className="flex items-center justify-between h-[56px] border-b border-[#E2E1F0]/60">
                  <div>
                    <span className="block text-[14px] font-bold text-[#1A1A2E] leading-none mb-1">
                      Weekly learning summary email
                    </span>
                    <span className="text-[12px] text-[#6B6B80] font-medium">Consolidated study streaks and stats report</span>
                  </div>
                  <button
                    onClick={() => setNotifs({ ...notifs, weeklyEmail: !notifs.weeklyEmail })}
                    className={`w-[44px] h-[24px] rounded-full transition-colors relative cursor-pointer ${
                      notifs.weeklyEmail ? 'bg-[#2D1B69]' : 'bg-slate-200'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${
                      notifs.weeklyEmail ? 'left-6' : 'left-1'
                    }`} />
                  </button>
                </div>

                {/* Community replies */}
                <div className="flex items-center justify-between h-[56px] border-b border-[#E2E1F0]/60">
                  <div>
                    <span className="block text-[14px] font-bold text-[#1A1A2E] leading-none mb-1">
                      Community replies
                    </span>
                    <span className="text-[12px] text-[#6B6B80] font-medium">Get notified when someone replies to your threads</span>
                  </div>
                  <button
                    onClick={() => setNotifs({ ...notifs, replies: !notifs.replies })}
                    className={`w-[44px] h-[24px] rounded-full transition-colors relative cursor-pointer ${
                      notifs.replies ? 'bg-[#2D1B69]' : 'bg-slate-200'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${
                      notifs.replies ? 'left-6' : 'left-1'
                    }`} />
                  </button>
                </div>

                {/* Promo emails */}
                <div className="flex items-center justify-between h-[56px]">
                  <div>
                    <span className="block text-[14px] font-bold text-[#1A1A2E] leading-none mb-1">
                      Promotional emails
                    </span>
                    <span className="text-[12px] text-[#6B6B80] font-medium">Special pricing discounts and career workshops</span>
                  </div>
                  <button
                    onClick={() => setNotifs({ ...notifs, promo: !notifs.promo })}
                    className={`w-[44px] h-[24px] rounded-full transition-colors relative cursor-pointer ${
                      notifs.promo ? 'bg-[#2D1B69]' : 'bg-slate-200'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${
                      notifs.promo ? 'left-6' : 'left-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* CATEGORY 3: Appearance */}
          {activeCategory === 'appearance' && (
            <div className="bg-white border border-[#E2E1F0] rounded-[16px] p-6 shadow-sm space-y-6">
              <div>
                <h3 className="text-[18px] font-bold text-[#1A1A2E] mb-4">Appearance Preferences</h3>
                <span className="block text-[13px] text-[#6B6B80] font-medium mb-3 select-none">
                  Theme Selector
                </span>

                <div className="flex flex-wrap gap-4">
                  {/* Light theme */}
                  <button
                    onClick={() => { setTheme('light'); triggerToast('Theme switched to Light'); }}
                    className={`w-[110px] p-3 rounded-[10px] border-2 bg-[#F7F6F3] text-left cursor-pointer transition-all select-none ${
                      theme === 'light' ? 'border-[#2D1B69] shadow-sm' : 'border-[#E2E1F0] hover:border-slate-400'
                    }`}
                  >
                    <div className="w-full h-8 bg-white border border-slate-200 rounded-[4px] mb-2" />
                    <span className="text-[13px] font-bold text-[#1A1A2E]">Light</span>
                  </button>

                  {/* Dark theme */}
                  <button
                    onClick={() => { setTheme('dark'); triggerToast('Theme switched to Dark (Preview)'); }}
                    className={`w-[110px] p-3 rounded-[10px] border-2 bg-slate-900 text-left cursor-pointer transition-all select-none ${
                      theme === 'dark' ? 'border-[#2D1B69] shadow-sm' : 'border-transparent hover:border-slate-400'
                    }`}
                  >
                    <div className="w-full h-8 bg-slate-800 border border-slate-700 rounded-[4px] mb-2" />
                    <span className="text-[13px] font-bold text-white">Dark</span>
                  </button>

                  {/* System theme */}
                  <button
                    onClick={() => { setTheme('system'); triggerToast('Theme matches your Operating System'); }}
                    className={`w-[110px] p-3 rounded-[10px] border-2 bg-slate-100 text-left cursor-pointer transition-all select-none ${
                      theme === 'system' ? 'border-[#2D1B69] shadow-sm' : 'border-[#E2E1F0] hover:border-slate-400'
                    }`}
                  >
                    <div className="w-full h-8 bg-gradient-to-r from-white to-slate-800 border border-slate-200 rounded-[4px] mb-2" />
                    <span className="text-[13px] font-bold text-[#1A1A2E]">System</span>
                  </button>
                </div>
              </div>

              <div className="border-t border-[#E2E1F0] my-6"></div>

              {/* Language Select */}
              <div className="flex flex-col max-w-[280px]">
                <label className="text-[13px] text-[#6B6B80] font-medium mb-2">Language Selection</label>
                <select
                  value={language}
                  onChange={(e) => { setLanguage(e.target.value); triggerToast(`Language switched to ${e.target.value} ✓`); }}
                  className="h-[44px] px-3.5 bg-white border border-[#E2E1F0] rounded-[8px] text-[14px] outline-none focus:border-[#2D1B69] focus:ring-1 focus:ring-[#2D1B69] transition-all cursor-pointer font-semibold"
                >
                  <option value="English">English (Default)</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Spanish">Spanish</option>
                </select>
              </div>
            </div>
          )}

          {/* CATEGORY 4: Danger Zone */}
          {activeCategory === 'danger' && (
            <div className="bg-[#FEF2F2] border border-[#EF4444] rounded-[16px] p-6 space-y-6">
              <div>
                <h3 className="text-[18px] font-bold text-[#EF4444] mb-1 flex items-center gap-2 select-none">
                  <AlertTriangle size={18} /> Danger Zone
                </h3>
                <p className="text-[13px] text-[#EF4444]/80 font-medium">
                  Irreversible actions. Please proceed with utmost caution.
                </p>
              </div>

              <div className="border-t border-[#EF4444]/20 my-4"></div>

              {/* Deactivate account */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <span className="block text-[15px] font-bold text-[#1A1A2E] leading-none mb-1">
                    Deactivate Account
                  </span>
                  <span className="text-[13px] text-slate-500 font-medium">
                    Temporarily disable your profile and progress reports
                  </span>
                </div>
                <button
                  onClick={() => setShowDeactivateModal(true)}
                  className="h-[38px] px-4 border border-[#EF4444] text-[#EF4444] hover:bg-red-50 font-bold text-[13px] rounded-[8px] cursor-pointer transition-colors whitespace-nowrap"
                >
                  Deactivate
                </button>
              </div>

              <div className="border-t border-[#EF4444]/20 my-4"></div>

              {/* Delete account */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <span className="block text-[15px] font-bold text-[#EF4444] leading-none mb-1">
                    Delete Account
                  </span>
                  <span className="text-[13px] text-slate-500 font-medium">
                    Permanently delete your certifications, badges, and learning tracks. This cannot be undone.
                  </span>
                </div>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="h-[38px] px-4 bg-[#EF4444] text-white hover:bg-red-700 font-bold text-[13px] rounded-[8px] cursor-pointer transition-colors whitespace-nowrap"
                >
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CONFIRMATION MODALS */}
      {/* Deactivate modal */}
      {showDeactivateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-[1000] flex items-center justify-center p-4">
          <div className="bg-white rounded-[20px] p-6 max-w-[400px] w-full text-center shadow-2xl relative animate-[scaleIn_0.2s_ease-out]">
            <h4 className="text-[18px] font-bold text-[#1A1A2E] mb-2">Deactivate Account?</h4>
            <p className="text-[14px] text-[#6B6B80] mb-6 leading-relaxed">
              Your profile will be hidden but your learning streaks will remain saved. You can reactivate anytime.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowDeactivateModal(false)}
                className="h-[38px] px-4 bg-gray-100 hover:bg-gray-200 text-[#6B6B80] font-bold text-[13px] rounded-[8px] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeactivate}
                className="h-[38px] px-4 bg-[#2D1B69] text-[#BBFF00] hover:bg-[#3D2B89] font-bold text-[13px] rounded-[8px] cursor-pointer"
              >
                Yes, Deactivate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-[1000] flex items-center justify-center p-4">
          <div className="bg-white rounded-[20px] p-6 max-w-[400px] w-full text-center shadow-2xl relative animate-[scaleIn_0.2s_ease-out]">
            <h4 className="text-[18px] font-bold text-[#EF4444] mb-2">Delete Account permanently?</h4>
            <p className="text-[13px] text-[#6B6B80] mb-5 leading-relaxed">
              This will erase all 5 earned certificates and 8 rare badges forever. To confirm, type <strong className="text-slate-900 font-extrabold select-all">DELETE</strong> below.
            </p>
            <input
              type="text"
              placeholder="Type DELETE to confirm"
              value={deleteConfirmationText}
              onChange={(e) => setDeleteConfirmationText(e.target.value)}
              className="w-full h-[40px] px-3.5 bg-white border border-[#E2E1F0] rounded-[8px] text-[13px] outline-none focus:border-[#EF4444] text-center mb-6 font-bold"
            />
            <div className="flex justify-center gap-3">
              <button
                onClick={() => { setShowDeleteModal(false); setDeleteConfirmationText(''); }}
                className="h-[38px] px-4 bg-gray-100 hover:bg-gray-200 text-[#6B6B80] font-bold text-[13px] rounded-[8px] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteConfirmationText !== 'DELETE'}
                className="h-[38px] px-4 bg-[#EF4444] text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-[13px] rounded-[8px] cursor-pointer"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-12px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
export default Settings;
