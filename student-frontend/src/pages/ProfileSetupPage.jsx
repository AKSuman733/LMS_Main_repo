import { useState } from "react";
import { Toaster } from "react-hot-toast";
import FormField from "../components/form/FormField";
import FormSubmitButton from "../components/form/FormSubmitButton";
import { colors, spacing } from "../constants/designTokens";

/**
 * ProfileSetupPage
 * Complete form example demonstrating all FormField validation types:
 * - Required text fields
 * - Email validation with checkmarks
 * - Password strength meter
 * - Number fields with constraints
 * - File uploads with validation
 * - Real-time error messages
 * - Form submission feedback
 */

export default function ProfileSetupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    age: "",
    phone: "",
    profilePicture: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.value;
    setFormData((prev) => ({
      ...prev,
      profilePicture: file,
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Reset form on success
      setFormData({
        fullName: "",
        email: "",
        password: "",
        age: "",
        phone: "",
        profilePicture: null,
      });
      
      console.log("Profile setup successful:", formData);
    } catch (error) {
      console.error("Error setting up profile:", error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <Toaster position="top-right" />

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 style={{ color: colors.primary.base }} className="text-4xl font-bold mb-2">
            Complete Your Profile
          </h1>
          <p className="text-gray-600 text-lg">
            Fill in your details below. All fields with <span style={{ color: colors.error.base }}>*</span> are required.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          
          {/* Feature Info Boxes */}
          <div className="grid md:grid-cols-2 gap-4 mb-8 pb-6 border-b border-gray-200">
            <div
              style={{ backgroundColor: colors.primary.light, borderLeft: `4px solid ${colors.primary.base}` }}
              className="p-4 rounded-lg"
            >
              <p className="font-semibold text-sm text-gray-800">
                ✓ Real-time validation feedback
              </p>
              <p className="text-xs text-gray-600 mt-1">
                See instant green checkmarks and red error messages as you type
              </p>
            </div>

            <div
              style={{ backgroundColor: colors.secondary.light, borderLeft: `4px solid ${colors.secondary.base}` }}
              className="p-4 rounded-lg"
            >
              <p className="font-semibold text-sm text-gray-800">
                🔐 Password strength meter
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Visual requirements checklist (8 chars, uppercase, lowercase, number, special)
              </p>
            </div>

            <div
              style={{ backgroundColor: colors.success.light, borderLeft: `4px solid ${colors.success.base}` }}
              className="p-4 rounded-lg"
            >
              <p className="font-semibold text-sm text-gray-800">
                🔢 Smart number fields
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Min/max constraints display and validation
              </p>
            </div>

            <div
              style={{ backgroundColor: colors.error.light, borderLeft: `4px solid ${colors.error.base}` }}
              className="p-4 rounded-lg"
            >
              <p className="font-semibold text-sm text-gray-800">
                📁 File upload validation
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Size and type constraints with visual feedback
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <FormField
            label="Full Name"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="John Doe"
            required={true}
          />

          <FormField
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="john@example.com"
            required={true}
          />

          <FormField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter a strong password"
            required={true}
          />

          <FormField
            label="Age"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="18"
            required={true}
            minValue={13}
            maxValue={120}
          />

          <FormField
            label="Phone Number (Optional)"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="+91 9876543210"
            required={false}
          />

          <FormField
            label="Profile Picture"
            type="file"
            name="profilePicture"
            onChange={handleFileChange}
            required={false}
            fileOptions={{
              maxSize: 10 * 1024 * 1024, // 10MB
              allowedTypes: ["image/jpeg", "image/png"],
            }}
          />

          {/* Submit Button */}
          <div className="pt-6">
            <FormSubmitButton
              onSubmit={handleSubmit}
              isLoading={isSubmitting}
              loadingText="Setting up profile..."
              successMessage="Profile created successfully! Welcome to UptoSkills 🎉"
              errorMessage="Failed to create profile. Please try again."
              label="Complete Profile Setup"
              variant="primary"
              className="w-full"
            />
          </div>

          {/* Instructions */}
          <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">💡 Pro Tips:</span>
            </p>
            <ul className="text-sm text-gray-600 mt-2 space-y-1">
              <li>• Try entering an invalid email to see red error messages</li>
              <li>• Type a weak password to see the strength meter and requirements</li>
              <li>• Age must be between 13 and 120</li>
              <li>• Upload an image (JPG/PNG) smaller than 10MB</li>
              <li>• All validations happen in real-time as you type!</li>
            </ul>
          </div>
        </div>

        {/* Code Example */}
        <div className="mt-12 bg-gray-900 text-gray-100 rounded-xl p-6 overflow-x-auto">
          <p className="text-sm font-semibold text-orange-400 mb-3">Usage Example:</p>
          <pre className="text-xs">
{`import FormField from '@/components/form/FormField';
import FormSubmitButton from '@/components/form/FormSubmitButton';

export default function MyForm() {
  const [formData, setFormData] = useState({});

  return (
    <>
      <FormField
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        required
      />

      <FormSubmitButton
        onSubmit={async () => await api.submit(formData)}
        successMessage="Success!"
        label="Submit"
      />
    </>
  );
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
