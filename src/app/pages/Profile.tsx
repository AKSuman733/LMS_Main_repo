import { useState, useRef } from 'react';
import { BookOpen, Award, Flame, Target, Linkedin, Github, Twitter, Globe, Trash2, Camera, Check } from 'lucide-react';
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
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const toggleTopic = (topic: string) => {
    if (!isEditing) return;
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start relative">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 right-6 bg-[#2D1B69] text-[#BBFF00] font-bold text-[14px] px-5 py-3 rounded-[10px] shadow-lg flex items-center gap-2 z-50 animate-[slideDown_0.2s_ease-out] select-none border border-[#BBFF00]/20">
          <Check size={18} />
          <span>Profile updated successfully ✓</span>
        </div>
      )}

      {/* LEFT COLUMN: Profile Summary Card */}
      <div className="lg:col-span-1 bg-white border border-[#E2E1F0] rounded-[16px] p-6 text-center shadow-sm">
        {/* Avatar */}
        <div className="relative w-[96px] h-[96px] mx-auto mb-4">
          <img
            src={avatarUrl}
            alt="Profile Avatar"
            className="w-full h-full rounded-full object-cover ring-4 ring-[#EDE9FF]"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 w-[30px] h-[30px] rounded-full bg-[#2D1B69] text-[#BBFF00] border border-white flex items-center justify-center cursor-pointer shadow-sm hover:scale-105 transition-transform"
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
          className="text-[#2D1B69] font-bold text-[13px] hover:underline cursor-pointer select-none"
        >
          Change Photo
        </button>

        <h2 className="text-[20px] font-bold text-[#1A1A2E] mt-3.5 leading-tight mb-1">
          {formData.firstName} {formData.lastName}
        </h2>
        <div className="inline-block px-3.5 py-1 bg-[#BBFF00] text-[#2D1B69] rounded-full text-[11px] font-extrabold uppercase tracking-wide mb-5 select-none">
          Pro Learner
        </div>

        <span className="block text-[13px] text-[#6B6B80] font-medium mb-6">
          Member since Jan 2024
        </span>

        <div className="border-t border-[#E2E1F0] my-5"></div>

        {/* Stats Column */}
        <div className="space-y-4 text-left">
          <div className="flex justify-between items-center text-[14px]">
            <div className="flex items-center gap-2.5 text-[#1A1A2E] font-medium">
              <BookOpen size={16} className="text-[#2D1B69]" />
              <span>Courses Enrolled</span>
            </div>
            <strong className="text-[#2D1B69] font-bold">8</strong>
          </div>

          <div className="flex justify-between items-center text-[14px]">
            <div className="flex items-center gap-2.5 text-[#1A1A2E] font-medium">
              <Award size={16} className="text-[#2D1B69]" />
              <span>Certificates Earned</span>
            </div>
            <strong className="text-[#2D1B69] font-bold">5</strong>
          </div>

          <div className="flex justify-between items-center text-[14px]">
            <div className="flex items-center gap-2.5 text-[#1A1A2E] font-medium">
              <Flame size={16} className="text-[#2D1B69]" />
              <span>Day Streak</span>
            </div>
            <strong className="text-[#2D1B69] font-bold">12</strong>
          </div>

          <div className="flex justify-between items-center text-[14px]">
            <div className="flex items-center gap-2.5 text-[#1A1A2E] font-medium">
              <Target size={16} className="text-[#2D1B69]" />
              <span>Avg Score</span>
            </div>
            <strong className="text-[#2D1B69] font-bold">94%</strong>
          </div>
        </div>

        <div className="border-t border-[#E2E1F0] my-5"></div>

        <button className="text-[13px] font-bold text-[#2D1B69] hover:underline cursor-pointer select-none">
          View Public Profile →
        </button>
      </div>

      {/* RIGHT COLUMN: Editable Form */}
      <div className="lg:col-span-2 bg-white border border-[#E2E1F0] rounded-[16px] p-6 md:p-8 shadow-sm">
        <form onSubmit={handleSave}>
          <div className="flex justify-between items-center border-b border-[#E2E1F0] pb-5 mb-6">
            <h2 className="text-[20px] font-bold text-[#1A1A2E] leading-none">
              Personal Information
            </h2>
            {isEditing ? (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="h-[34px] px-3.5 bg-gray-100 hover:bg-gray-200 text-[#6B6B80] font-bold text-[13px] rounded-[8px] cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-[34px] px-3.5 bg-[#2D1B69] text-[#BBFF00] hover:bg-[#3D2B89] font-bold text-[13px] rounded-[8px] cursor-pointer transition-all shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="h-[34px] px-3.5 border border-[#2D1B69] text-[#2D1B69] hover:bg-[#EDE9FF] font-bold text-[13px] rounded-[8px] cursor-pointer transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>

          <div className="space-y-4">
            {/* Row 1: Names */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-[13px] text-[#6B6B80] font-medium mb-1.5">First Name</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="h-[44px] px-3.5 bg-white border border-[#E2E1F0] rounded-[8px] text-[14px] outline-none focus:border-[#2D1B69] focus:ring-1 focus:ring-[#2D1B69] disabled:bg-[#F7F6F3] disabled:text-[#6B6B80] transition-all"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[13px] text-[#6B6B80] font-medium mb-1.5">Last Name</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="h-[44px] px-3.5 bg-white border border-[#E2E1F0] rounded-[8px] text-[14px] outline-none focus:border-[#2D1B69] focus:ring-1 focus:ring-[#2D1B69] disabled:bg-[#F7F6F3] disabled:text-[#6B6B80] transition-all"
                  required
                />
              </div>
            </div>

            {/* Row 2: Email */}
            <div className="flex flex-col">
              <div className="flex justify-between mb-1.5">
                <label className="text-[13px] text-[#6B6B80] font-medium">Email Address</label>
                <span className="text-[11px] text-[#6B6B80] font-medium">Contact support to change</span>
              </div>
              <input
                type="email"
                disabled
                value={formData.email}
                className="h-[44px] px-3.5 bg-[#F7F6F3] border border-[#E2E1F0] rounded-[8px] text-[14px] text-[#6B6B80] cursor-not-allowed select-none"
              />
            </div>

            {/* Row 3: Phone & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-[13px] text-[#6B6B80] font-medium mb-1.5">Phone Number</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="h-[44px] px-3.5 bg-white border border-[#E2E1F0] rounded-[8px] text-[14px] outline-none focus:border-[#2D1B69] focus:ring-1 focus:ring-[#2D1B69] disabled:bg-[#F7F6F3] disabled:text-[#6B6B80] transition-all"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[13px] text-[#6B6B80] font-medium mb-1.5">Location</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  placeholder="City, Country"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="h-[44px] px-3.5 bg-white border border-[#E2E1F0] rounded-[8px] text-[14px] outline-none focus:border-[#2D1B69] focus:ring-1 focus:ring-[#2D1B69] disabled:bg-[#F7F6F3] disabled:text-[#6B6B80] transition-all"
                />
              </div>
            </div>

            {/* Row 4: Bio */}
            <div className="flex flex-col">
              <label className="text-[13px] text-[#6B6B80] font-medium mb-1.5">Bio / About</label>
              <textarea
                disabled={!isEditing}
                placeholder="Tell the community about yourself..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="h-[120px] p-3 bg-white border border-[#E2E1F0] rounded-[8px] text-[14px] outline-none focus:border-[#2D1B69] focus:ring-1 focus:ring-[#2D1B69] disabled:bg-[#F7F6F3] disabled:text-[#6B6B80] transition-all resize-none leading-relaxed"
              />
            </div>

            {/* Row 5: Job & Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-[13px] text-[#6B6B80] font-medium mb-1.5">Job Title</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  className="h-[44px] px-3.5 bg-white border border-[#E2E1F0] rounded-[8px] text-[14px] outline-none focus:border-[#2D1B69] focus:ring-1 focus:ring-[#2D1B69] disabled:bg-[#F7F6F3] disabled:text-[#6B6B80] transition-all"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[13px] text-[#6B6B80] font-medium mb-1.5">Company</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="h-[44px] px-3.5 bg-white border border-[#E2E1F0] rounded-[8px] text-[14px] outline-none focus:border-[#2D1B69] focus:ring-1 focus:ring-[#2D1B69] disabled:bg-[#F7F6F3] disabled:text-[#6B6B80] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Social Links Section */}
          <div className="mt-8 border-t border-[#E2E1F0] pt-6">
            <h3 className="text-[16px] font-bold text-[#1A1A2E] mb-4">Social Links</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* LinkedIn */}
              <div className="flex flex-col">
                <label className="text-[13px] text-[#6B6B80] font-medium mb-1.5 flex items-center gap-1.5">
                  <Linkedin size={14} className="text-[#2D1B69]" /> LinkedIn
                </label>
                <input
                  type="url"
                  disabled={!isEditing}
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="h-[44px] px-3.5 bg-white border border-[#E2E1F0] rounded-[8px] text-[14px] outline-none focus:border-[#2D1B69] focus:ring-1 focus:ring-[#2D1B69] disabled:bg-[#F7F6F3] transition-all"
                />
              </div>

              {/* GitHub */}
              <div className="flex flex-col">
                <label className="text-[13px] text-[#6B6B80] font-medium mb-1.5 flex items-center gap-1.5">
                  <Github size={14} className="text-slate-600" /> GitHub
                </label>
                <input
                  type="url"
                  disabled={!isEditing}
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="h-[44px] px-3.5 bg-white border border-[#E2E1F0] rounded-[8px] text-[14px] outline-none focus:border-[#2D1B69] focus:ring-1 focus:ring-[#2D1B69] disabled:bg-[#F7F6F3] transition-all"
                />
              </div>

              {/* Twitter */}
              <div className="flex flex-col">
                <label className="text-[13px] text-[#6B6B80] font-medium mb-1.5 flex items-center gap-1.5">
                  <Twitter size={14} className="text-slate-500" /> Twitter / X
                </label>
                <input
                  type="url"
                  disabled={!isEditing}
                  value={formData.twitter}
                  onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                  className="h-[44px] px-3.5 bg-white border border-[#E2E1F0] rounded-[8px] text-[14px] outline-none focus:border-[#2D1B69] focus:ring-1 focus:ring-[#2D1B69] disabled:bg-[#F7F6F3] transition-all"
                />
              </div>

              {/* Website */}
              <div className="flex flex-col">
                <label className="text-[13px] text-[#6B6B80] font-medium mb-1.5 flex items-center gap-1.5">
                  <Globe size={14} className="text-slate-500" /> Personal Website
                </label>
                <input
                  type="url"
                  disabled={!isEditing}
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="h-[44px] px-3.5 bg-white border border-[#E2E1F0] rounded-[8px] text-[14px] outline-none focus:border-[#2D1B69] focus:ring-1 focus:ring-[#2D1B69] disabled:bg-[#F7F6F3] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Learning Preferences Section */}
          <div className="mt-8 border-t border-[#E2E1F0] pt-6">
            <h3 className="text-[16px] font-bold text-[#1A1A2E] mb-4">Learning Preferences</h3>

            {/* Tag Selection */}
            <div className="mb-6">
              <label className="block text-[13px] text-[#6B6B80] font-medium mb-2 select-none">
                Preferred Topics {isEditing && <span className="text-[11px] text-[#6B6B80] font-normal">(Click tags to toggle)</span>}
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTopics.map((topic) => {
                  const isSelected = selectedTopics.includes(topic);
                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => toggleTopic(topic)}
                      className={`h-[32px] px-3.5 rounded-[8px] text-[13px] font-bold transition-all flex items-center gap-1 select-none ${
                        isSelected
                          ? 'bg-[#2D1B69] text-[#BBFF00] hover:bg-[#3D2B89]'
                          : 'bg-white border border-[#E2E1F0] text-[#6B6B80] hover:bg-[#F7F6F3]'
                      } ${!isEditing ? 'cursor-default opacity-85' : 'cursor-pointer'}`}
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
              <span className="block text-[13px] text-[#6B6B80] font-medium select-none">
                Email Notifications
              </span>

              <div className="flex items-center justify-between py-1 border-b border-[#E2E1F0]/50 pb-2.5">
                <div>
                  <span className="block text-[14px] font-bold text-[#1A1A2E] leading-snug">Course updates</span>
                  <span className="text-[12px] text-[#6B6B80] font-medium">Get alerts when new lectures are uploaded</span>
                </div>
                <button
                  type="button"
                  disabled={!isEditing}
                  onClick={() => setNotifications({ ...notifications, courseUpdates: !notifications.courseUpdates })}
                  className={`w-[44px] h-[24px] rounded-full transition-colors relative cursor-pointer disabled:opacity-50 ${
                    notifications.courseUpdates ? 'bg-[#2D1B69]' : 'bg-slate-200'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${
                    notifications.courseUpdates ? 'left-6' : 'left-1'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-[#E2E1F0]/50 pb-2.5">
                <div>
                  <span className="block text-[14px] font-bold text-[#1A1A2E] leading-snug">New certificates</span>
                  <span className="text-[12px] text-[#6B6B80] font-medium">Receive digital credential updates immediately</span>
                </div>
                <button
                  type="button"
                  disabled={!isEditing}
                  onClick={() => setNotifications({ ...notifications, newCertificates: !notifications.newCertificates })}
                  className={`w-[44px] h-[24px] rounded-full transition-colors relative cursor-pointer disabled:opacity-50 ${
                    notifications.newCertificates ? 'bg-[#2D1B69]' : 'bg-slate-200'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${
                    notifications.newCertificates ? 'left-6' : 'left-1'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between py-1">
                <div>
                  <span className="block text-[14px] font-bold text-[#1A1A2E] leading-snug">Weekly progress report</span>
                  <span className="text-[12px] text-[#6B6B80] font-medium">Consolidated study streaks and stats in your inbox</span>
                </div>
                <button
                  type="button"
                  disabled={!isEditing}
                  onClick={() => setNotifications({ ...notifications, weeklyReport: !notifications.weeklyReport })}
                  className={`w-[44px] h-[24px] rounded-full transition-colors relative cursor-pointer disabled:opacity-50 ${
                    notifications.weeklyReport ? 'bg-[#2D1B69]' : 'bg-slate-200'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${
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
              className="w-full h-[48px] bg-[#2D1B69] text-[#BBFF00] font-bold rounded-[10px] text-[15px] hover:bg-[#3D2B89] transition-colors mt-8 cursor-pointer shadow-sm flex items-center justify-center"
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
