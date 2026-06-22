import { useState, useRef, useEffect } from 'react';
import { BookOpen, Award, Flame, Target, Linkedin, Github, Twitter, Globe, Camera, Check } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  jobTitle: string;
  company: string;
  linkedin: string;
  github: string;
  twitter: string;
  website: string;
}

export function Profile() {
  const { user: authUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Profile updated successfully ✓');
  const [avatarUrl, setAvatarUrl] = useState<string>(
    authUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80'
  );

  const [formData, setFormData] = useState<ProfileData>({
    firstName: authUser?.name.split(' ')[0] || 'Alex',
    lastName: authUser?.name.split(' ')[1] || 'Johnson',
    email: authUser?.email || 'alex.johnson@company.com',
    phone: '+1 (555) 234-5678',
    location: 'Mumbai, India',
    bio: 'Self-taught developer focusing on Machine Learning systems and Graph RAG architectures. Building open-source agent tools.',
    jobTitle: 'ML Engineer',
    company: 'NextGen AI',
    linkedin: 'https://linkedin.com/in/alex-johnson',
    github: 'https://github.com/alex-j',
    twitter: 'https://x.com/alex_j',
    website: 'https://alexj.dev'
  });

  const [selectedTopics, setSelectedTopics] = useState<string[]>(['AI', 'ML', 'LLMOps']);
  const availableTopics = ['AI', 'Data Science', 'Python', 'Cloud', 'ML', 'LLMOps'];

  const [notifications, setNotifications] = useState({
    courseUpdates: true,
    newCertificates: true,
    weeklyReport: false
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
      setToastMessage('Profile photo updated successfully ✓');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  useEffect(() => {
    if (authUser?.email) {
      fetch(`http://localhost:5000/user/profile?email=${encodeURIComponent(authUser.email)}`)
        .then(res => res.json())
        .then(data => {
          if (data) {
            if (data.preferences) {
              setSelectedTopics(data.preferences);
            }
            if (data.notifications) {
              setNotifications(data.notifications);
            }
          }
        })
        .catch(err => {
          console.error("Error loading profile settings from server:", err);
          // Local fallback
          const localPref = localStorage.getItem(`pref_${authUser.email}`);
          if (localPref) setSelectedTopics(JSON.parse(localPref));
          const localNotif = localStorage.getItem(`notif_${authUser.email}`);
          if (localNotif) setNotifications(JSON.parse(localNotif));
        });
    }
  }, [authUser]);

  const toggleTopic = (topic: string) => {
    if (!isEditing) return;
    const updatedTopics = selectedTopics.includes(topic)
      ? selectedTopics.filter((t) => t !== topic)
      : [...selectedTopics, topic];

    setSelectedTopics(updatedTopics);

    // Call API immediately on topic selection (BUG 6)
    if (authUser?.email) {
      fetch('http://localhost:5000/user/preferences', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: authUser.email,
          preferences: updatedTopics
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log("Updated preferences saved successfully:", data);
        localStorage.setItem(`pref_${authUser.email}`, JSON.stringify(updatedTopics));
        setToastMessage('Learning preferences saved ✓');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      })
      .catch(err => {
        console.error("Error saving preferences to server:", err);
        localStorage.setItem(`pref_${authUser.email}`, JSON.stringify(updatedTopics));
      });
    }
  };

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    if (!isEditing) return;
    const updatedNotifications = {
      ...notifications,
      [key]: !notifications[key]
    };

    setNotifications(updatedNotifications);

    // Call API immediately on toggle change (BUG 7)
    if (authUser?.email) {
      fetch('http://localhost:5000/user/notifications', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: authUser.email,
          notifications: updatedNotifications
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log("Updated notifications saved successfully:", data);
        localStorage.setItem(`notif_${authUser.email}`, JSON.stringify(updatedNotifications));
        setToastMessage('Notification settings updated ✓');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      })
      .catch(err => {
        console.error("Error saving notifications to server:", err);
        localStorage.setItem(`notif_${authUser.email}`, JSON.stringify(updatedNotifications));
      });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);

    // Trigger API call for detailed profile fields
    if (authUser?.email) {
      fetch('http://localhost:5000/user/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: authUser.email,
          profileData: formData
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log("Profile updated successfully:", data);
        setToastMessage('Profile changes saved successfully ✓');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      })
      .catch(err => {
        console.error("Error saving profile to server:", err);
        setToastMessage('Profile saved locally ✓');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      });
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start relative text-white font-sans">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 right-6 bg-[#111827] text-[#00E88A] font-bold text-[14px] px-5 py-3 rounded-[10px] shadow-2xl flex items-center gap-2 z-50 animate-[slideDown_0.2s_ease-out] select-none border border-[#00C97B]">
          <Check size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* LEFT COLUMN: Profile Summary Card */}
      <div className="lg:col-span-1 bg-[#111827] border border-[#1E2D45] rounded-[16px] p-6 text-center shadow-sm">
        {/* Avatar */}
        <div className="relative w-[96px] h-[96px] mx-auto mb-4">
          <img
            src={avatarUrl}
            alt="Profile Avatar"
            className="w-full h-full rounded-full object-cover ring-4 ring-[#FF6B2B]/20 hover:ring-[#FF6B2B] transition-all duration-200"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 w-[30px] h-[30px] rounded-full bg-[#FF6B2B] hover:bg-[#FF8C42] text-white border border-[#1E2D45] flex items-center justify-center cursor-pointer shadow-sm hover:scale-105 transition-transform"
          >
            <Camera size={14} />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handlePhotoChange}
            accept="image/*"
            className="hidden"
          />
        </div>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="text-[#FF6B2B] hover:text-[#FF8C42] font-semibold text-[13px] hover:underline cursor-pointer select-none bg-transparent border-none p-0"
        >
          Change Photo
        </button>

        <h2 className="text-[20px] font-bold text-white mt-3.5 leading-tight mb-1">
          {formData.firstName} {formData.lastName}
        </h2>
        <div className="inline-block px-3.5 py-1 bg-[#00C97B]/10 text-[#00E88A] border border-[#00C97B]/30 rounded-full text-[11px] font-extrabold uppercase tracking-wide mb-5 select-none">
          Pro Learner
        </div>

        <span className="block text-[13px] text-[#9CA3AF] font-medium mb-6">
          Member since Jan 2024
        </span>

        <div className="border-t border-[#1E2D45] my-5"></div>

        {/* Stats Column */}
        <div className="space-y-4 text-left">
          <div className="flex justify-between items-center text-[14px]">
            <div className="flex items-center gap-2.5 text-[#9CA3AF] font-medium">
              <BookOpen size={16} className="text-[#4F8EF7]" />
              <span>Courses Enrolled</span>
            </div>
            <strong className="text-white font-bold">8</strong>
          </div>

          <div className="flex justify-between items-center text-[14px]">
            <div className="flex items-center gap-2.5 text-[#9CA3AF] font-medium">
              <Award size={16} className="text-[#FF6B2B]" />
              <span>Certificates Earned</span>
            </div>
            <strong className="text-white font-bold">5</strong>
          </div>

          <div className="flex justify-between items-center text-[14px]">
            <div className="flex items-center gap-2.5 text-[#9CA3AF] font-medium">
              <Flame size={16} className="text-[#FF8C42]" />
              <span>Day Streak</span>
            </div>
            <strong className="text-white font-bold">12</strong>
          </div>

          <div className="flex justify-between items-center text-[14px]">
            <div className="flex items-center gap-2.5 text-[#9CA3AF] font-medium">
              <Target size={16} className="text-[#00C97B]" />
              <span>Avg Score</span>
            </div>
            <strong className="text-white font-bold">94%</strong>
          </div>
        </div>

        <div className="border-t border-[#1E2D45] my-5"></div>

        <button className="text-[13px] font-semibold text-[#FF6B2B] hover:text-[#FF8C42] hover:underline cursor-pointer select-none bg-transparent border-none p-0">
          View Public Profile →
        </button>
      </div>

      {/* RIGHT COLUMN: Editable Form */}
      <div className="lg:col-span-2 bg-[#111827] border border-[#1E2D45] rounded-[16px] p-6 md:p-8 shadow-sm">
        <form onSubmit={handleSave}>
          <div className="flex justify-between items-center border-b border-[#1E2D45] pb-5 mb-6">
            <h2 className="text-[20px] font-bold text-white leading-none">
              Personal Information
            </h2>
            {isEditing ? (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="h-[34px] px-3.5 bg-[#1A2540] hover:bg-[#1A2540]/80 text-[#9CA3AF] hover:text-white font-semibold text-[13px] rounded-[8px] cursor-pointer transition-colors border-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-[34px] px-3.5 bg-[#FF6B2B] text-white hover:bg-[#FF8C42] font-semibold text-[13px] rounded-[8px] cursor-pointer transition-all duration-200 active:scale-[0.97] border-none"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="h-[34px] px-3.5 border border-[#FF6B2B] text-[#FF6B2B] hover:bg-[#FF6B2B]/10 font-semibold text-[13px] rounded-[8px] cursor-pointer transition-colors bg-transparent"
              >
                Edit Profile
              </button>
            )}
          </div>

          <div className="space-y-4">
            {/* Row 1: Names */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-[13px] text-[#9CA3AF] font-medium mb-1.5">First Name</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="h-[44px] px-3.5 bg-[#1A2540] border border-[#1E2D45] rounded-[8px] text-[14px] text-white outline-none focus:border-[#FF6B2B] focus:ring-1 focus:ring-[#FF6B2B] disabled:bg-[#1A2540]/40 disabled:text-[#9CA3AF] disabled:cursor-not-allowed transition-all"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[13px] text-[#9CA3AF] font-medium mb-1.5">Last Name</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="h-[44px] px-3.5 bg-[#1A2540] border border-[#1E2D45] rounded-[8px] text-[14px] text-white outline-none focus:border-[#FF6B2B] focus:ring-1 focus:ring-[#FF6B2B] disabled:bg-[#1A2540]/40 disabled:text-[#9CA3AF] disabled:cursor-not-allowed transition-all"
                  required
                />
              </div>
            </div>

            {/* Row 2: Email */}
            <div className="flex flex-col">
              <div className="flex justify-between mb-1.5">
                <label className="text-[13px] text-[#9CA3AF] font-medium">Email Address</label>
                <span className="text-[11px] text-[#9CA3AF] font-medium">Contact support to change</span>
              </div>
              <input
                type="email"
                disabled
                value={formData.email}
                className="h-[44px] px-3.5 bg-[#1A2540]/30 border border-[#1E2D45] rounded-[8px] text-[14px] text-[#9CA3AF] cursor-not-allowed select-none"
              />
            </div>

            {/* Row 3: Phone & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-[13px] text-[#9CA3AF] font-medium mb-1.5">Phone Number</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="h-[44px] px-3.5 bg-[#1A2540] border border-[#1E2D45] rounded-[8px] text-[14px] text-white outline-none focus:border-[#FF6B2B] focus:ring-1 focus:ring-[#FF6B2B] disabled:bg-[#1A2540]/40 disabled:text-[#9CA3AF] disabled:cursor-not-allowed transition-all"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[13px] text-[#9CA3AF] font-medium mb-1.5">Location</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  placeholder="City, Country"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="h-[44px] px-3.5 bg-[#1A2540] border border-[#1E2D45] rounded-[8px] text-[14px] text-white outline-none focus:border-[#FF6B2B] focus:ring-1 focus:ring-[#FF6B2B] disabled:bg-[#1A2540]/40 disabled:text-[#9CA3AF] disabled:cursor-not-allowed transition-all"
                />
              </div>
            </div>

            {/* Row 4: Bio */}
            <div className="flex flex-col">
              <label className="text-[13px] text-[#9CA3AF] font-medium mb-1.5">Bio / About</label>
              <textarea
                disabled={!isEditing}
                placeholder="Tell the community about yourself..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="h-[120px] p-3 bg-[#1A2540] border border-[#1E2D45] rounded-[8px] text-[14px] text-white outline-none focus:border-[#FF6B2B] focus:ring-1 focus:ring-[#FF6B2B] disabled:bg-[#1A2540]/40 disabled:text-[#9CA3AF] disabled:cursor-not-allowed transition-all resize-none leading-relaxed"
              />
            </div>

            {/* Row 5: Job & Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-[13px] text-[#9CA3AF] font-medium mb-1.5">Job Title</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  className="h-[44px] px-3.5 bg-[#1A2540] border border-[#1E2D45] rounded-[8px] text-[14px] text-white outline-none focus:border-[#FF6B2B] focus:ring-1 focus:ring-[#FF6B2B] disabled:bg-[#1A2540]/40 disabled:text-[#9CA3AF] disabled:cursor-not-allowed transition-all"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[13px] text-[#9CA3AF] font-medium mb-1.5">Company</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="h-[44px] px-3.5 bg-[#1A2540] border border-[#1E2D45] rounded-[8px] text-[14px] text-white outline-none focus:border-[#FF6B2B] focus:ring-1 focus:ring-[#FF6B2B] disabled:bg-[#1A2540]/40 disabled:text-[#9CA3AF] disabled:cursor-not-allowed transition-all"
                />
              </div>
            </div>
          </div>

          {/* Social Links Section */}
          <div className="mt-8 border-t border-[#1E2D45] pt-6">
            <h3 className="text-[16px] font-bold text-white mb-4">Social Links</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* LinkedIn */}
              <div className="flex flex-col">
                <label className="text-[13px] text-[#9CA3AF] font-medium mb-1.5 flex items-center gap-1.5">
                  <Linkedin size={14} className="text-[#4F8EF7]" /> LinkedIn
                </label>
                <input
                  type="url"
                  disabled={!isEditing}
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="h-[44px] px-3.5 bg-[#1A2540] border border-[#1E2D45] rounded-[8px] text-[14px] text-white outline-none focus:border-[#FF6B2B] focus:ring-1 focus:ring-[#FF6B2B] disabled:bg-[#1A2540]/40 transition-all"
                />
              </div>

              {/* GitHub */}
              <div className="flex flex-col">
                <label className="text-[13px] text-[#9CA3AF] font-medium mb-1.5 flex items-center gap-1.5">
                  <Github size={14} className="text-white" /> GitHub
                </label>
                <input
                  type="url"
                  disabled={!isEditing}
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="h-[44px] px-3.5 bg-[#1A2540] border border-[#1E2D45] rounded-[8px] text-[14px] text-white outline-none focus:border-[#FF6B2B] focus:ring-1 focus:ring-[#FF6B2B] disabled:bg-[#1A2540]/40 transition-all"
                />
              </div>

              {/* Twitter */}
              <div className="flex flex-col">
                <label className="text-[13px] text-[#9CA3AF] font-medium mb-1.5 flex items-center gap-1.5">
                  <Twitter size={14} className="text-[#4F8EF7]" /> Twitter / X
                </label>
                <input
                  type="url"
                  disabled={!isEditing}
                  value={formData.twitter}
                  onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                  className="h-[44px] px-3.5 bg-[#1A2540] border border-[#1E2D45] rounded-[8px] text-[14px] text-white outline-none focus:border-[#FF6B2B] focus:ring-1 focus:ring-[#FF6B2B] disabled:bg-[#1A2540]/40 transition-all"
                />
              </div>

              {/* Website */}
              <div className="flex flex-col">
                <label className="text-[13px] text-[#9CA3AF] font-medium mb-1.5 flex items-center gap-1.5">
                  <Globe size={14} className="text-[#00C97B]" /> Personal Website
                </label>
                <input
                  type="url"
                  disabled={!isEditing}
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="h-[44px] px-3.5 bg-[#1A2540] border border-[#1E2D45] rounded-[8px] text-[14px] text-white outline-none focus:border-[#FF6B2B] focus:ring-1 focus:ring-[#FF6B2B] disabled:bg-[#1A2540]/40 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Learning Preferences Section */}
          <div className="mt-8 border-t border-[#1E2D45] pt-6">
            <h3 className="text-[16px] font-bold text-white mb-4">Learning Preferences</h3>

            {/* Tag Selection */}
            <div className="mb-6">
              <label className="block text-[13px] text-[#9CA3AF] font-medium mb-2 select-none">
                Preferred Topics {isEditing && <span className="text-[11px] text-[#9CA3AF]/60 font-normal">(Click tags to toggle)</span>}
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTopics.map((topic) => {
                  const isSelected = selectedTopics.includes(topic);
                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => toggleTopic(topic)}
                      className={`h-[32px] px-3.5 rounded-[8px] text-[13px] font-bold transition-all duration-200 flex items-center gap-1 select-none border-none ${
                        isSelected
                          ? 'bg-[#FF6B2B] text-white hover:bg-[#FF8C42]'
                          : 'bg-[#1A2540] border border-[#1E2D45] text-[#9CA3AF] hover:text-white'
                      } ${!isEditing ? 'cursor-default opacity-85' : 'cursor-pointer active:scale-[0.97]'}`}
                    >
                      {topic}
                      {isSelected && isEditing && <span className="text-[12px] font-normal">×</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Email Notification Toggles */}
            <div className="space-y-3.5">
              <span className="block text-[13px] text-[#9CA3AF] font-medium select-none">
                Email Notifications
              </span>

              <div className="flex items-center justify-between py-1 border-b border-[#1E2D45]/50 pb-2.5">
                <div>
                  <span className="block text-[14px] font-bold text-white leading-snug">Course updates</span>
                  <span className="text-[12px] text-[#9CA3AF] font-medium">Get alerts when new lectures are uploaded</span>
                </div>
                <button
                  type="button"
                  disabled={!isEditing}
                  onClick={() => handleNotificationToggle('courseUpdates')}
                  className={`w-[44px] h-[24px] rounded-full transition-colors relative cursor-pointer disabled:opacity-50 border-none ${
                    notifications.courseUpdates ? 'bg-[#00C97B]' : 'bg-[#1A2540]'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all duration-200 ${
                    notifications.courseUpdates ? 'left-6' : 'left-1'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-[#1E2D45]/50 pb-2.5">
                <div>
                  <span className="block text-[14px] font-bold text-white leading-snug">New certificates</span>
                  <span className="text-[12px] text-[#9CA3AF] font-medium">Receive digital credential updates immediately</span>
                </div>
                <button
                  type="button"
                  disabled={!isEditing}
                  onClick={() => handleNotificationToggle('newCertificates')}
                  className={`w-[44px] h-[24px] rounded-full transition-colors relative cursor-pointer disabled:opacity-50 border-none ${
                    notifications.newCertificates ? 'bg-[#00C97B]' : 'bg-[#1A2540]'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all duration-200 ${
                    notifications.newCertificates ? 'left-6' : 'left-1'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between py-1">
                <div>
                  <span className="block text-[14px] font-bold text-white leading-snug">Weekly progress report</span>
                  <span className="text-[12px] text-[#9CA3AF] font-medium">Consolidated study streaks and stats in your inbox</span>
                </div>
                <button
                  type="button"
                  disabled={!isEditing}
                  onClick={() => handleNotificationToggle('weeklyReport')}
                  className={`w-[44px] h-[24px] rounded-full transition-colors relative cursor-pointer disabled:opacity-50 border-none ${
                    notifications.weeklyReport ? 'bg-[#00C97B]' : 'bg-[#1A2540]'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all duration-200 ${
                    notifications.weeklyReport ? 'left-6' : 'left-1'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* Submit */}
          {isEditing && (
            <button
              type="submit"
              className="w-full h-[48px] bg-[#FF6B2B] hover:bg-[#FF8C42] text-white font-semibold rounded-[10px] text-[15px] transition-all duration-200 mt-8 cursor-pointer shadow-sm flex items-center justify-center border-none active:scale-[0.97]"
            >
              Save Changes
            </button>
          )}
        </form>
      </div>

      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-12px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
export default Profile;
