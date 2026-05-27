import { useState } from 'react';
import { useAuth } from '../../store/AuthContext';
import { useTheme } from '../../store/ThemeContext';
import { Save, X, User, Lock, Bell, Moon, Sun } from 'lucide-react';

const AdminSettings = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [formData, setFormData] = useState({
    name: user?.name || 'Administrator',
    email: user?.email || 'admin@uptoskills.ai',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    emailNotifications: true,
    systemAlerts: true
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Simulate save
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Administrator Settings</h2>

      {saved && (
        <div className="p-4 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg border border-green-200 dark:border-green-800">
          Settings saved successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Section */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            <User size={20} className="text-blue-500" />
            <h3>Profile Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm px-3 py-2 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm px-3 py-2 border"
              />
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            <Lock size={20} className="text-blue-500" />
            <h3>Change Password</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm px-3 py-2 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm px-3 py-2 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm px-3 py-2 border"
              />
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            <Bell size={20} className="text-blue-500" />
            <h3>Preferences & Notifications</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">Email Notifications</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive daily summaries and new enrollment alerts.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="emailNotifications" checked={formData.emailNotifications} onChange={handleChange} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">System Alerts</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive platform health and maintenance alerts.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="systemAlerts" checked={formData.systemAlerts} onChange={handleChange} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <hr className="border-gray-200 dark:border-gray-700 my-4" />
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                  Theme Preference 
                  {theme === 'dark' ? <Moon size={16} className="ml-2 text-gray-400" /> : <Sun size={16} className="ml-2 text-yellow-500" />}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Toggle between Light and Dark mode globally.</p>
              </div>
              <button
                type="button"
                onClick={toggleTheme}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center"
          >
            <X size={16} className="mr-2" />
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center"
          >
            <Save size={16} className="mr-2" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
