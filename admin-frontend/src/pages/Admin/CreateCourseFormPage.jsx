import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormField from "../components/form/FormField";
import FormSubmitButton, {
  showSuccessToast,
  showErrorToast,
} from "../components/form/FormSubmitButton";
import { colors } from "../constants/designTokens";

/**
 * Example Form Page with Full Validation
 * Demonstrates all form validation features:
 * - Email validation with checkmarks
 * - Password strength meter
 * - Required field indicators
 * - Number field constraints
 * - File upload validation
 * - Real-time validation feedback
 * - Form submission handling with toasts
 */

export default function CreateCourseFormPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    courseName: "",
    courseDescription: "",
    instructorEmail: "",
    instructorPassword: "",
    enrollmentLimit: "",
    coursePrice: "",
    duration: "",
    courseCover: null,
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
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Log form data
      console.log("Form submitted:", formData);

      // Reset form
      setFormData({
        courseName: "",
        courseDescription: "",
        instructorEmail: "",
        instructorPassword: "",
        enrollmentLimit: "",
        coursePrice: "",
        duration: "",
        courseCover: null,
      });

      // Navigate after success
      setTimeout(() => {
        navigate("/admin/courses");
      }, 1500);
    } catch (error) {
      throw new Error("Failed to create course. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="space-y-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-100">Create New Course</h1>
          <p className="text-slate-400 mt-2">
            Add a new course with validation feedback. Try filling out the form to see
            real-time validation, error messages, and success indicators.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 space-y-6">
        <h2 className="text-2xl font-bold text-slate-100">Course Details</h2>

        {/* Course Name - Required Text Field */}
        <FormField
          label="Course Name"
          type="text"
          name="courseName"
          value={formData.courseName}
          onChange={handleInputChange}
          placeholder="e.g., React Mastery 2024"
          required={true}
        />

        {/* Course Description - Textarea */}
        <div className="space-y-2">
          <label className="block">
            <span className="text-sm font-semibold text-gray-700">
              Course Description
              <span className="ml-1" style={{ color: colors.error.base }}>
                *
              </span>
            </span>
            <textarea
              name="courseDescription"
              value={formData.courseDescription}
              onChange={handleInputChange}
              placeholder="Describe what students will learn..."
              required
              className="mt-2 w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-all"
              rows={5}
            />
          </label>
        </div>

        {/* Course Cover Image - File Upload with Validation */}
        <FormField
          label="Course Cover Image"
          type="file"
          name="courseCover"
          onChange={handleFileChange}
          required={true}
          fileOptions={{
            maxSize: 10 * 1024 * 1024, // 10MB
            allowedTypes: ["image/jpeg", "image/png", "image/webp"],
          }}
        />

        <hr className="border-white/10 my-6" />

        <h2 className="text-2xl font-bold text-slate-100">Instructor Information</h2>

        {/* Email - Email Field with Validation */}
        <FormField
          label="Instructor Email"
          type="email"
          name="instructorEmail"
          value={formData.instructorEmail}
          onChange={handleInputChange}
          placeholder="instructor@example.com"
          required={true}
        />

        {/* Password - Password Field with Strength Meter */}
        <FormField
          label="Instructor Password"
          type="password"
          name="instructorPassword"
          value={formData.instructorPassword}
          onChange={handleInputChange}
          placeholder="Create a strong password"
          required={true}
        />

        <hr className="border-white/10 my-6" />

        <h2 className="text-2xl font-bold text-slate-100">Course Settings</h2>

        {/* Enrollment Limit - Number Field with Min/Max */}
        <FormField
          label="Enrollment Limit"
          type="number"
          name="enrollmentLimit"
          value={formData.enrollmentLimit}
          onChange={handleInputChange}
          placeholder="Maximum number of students"
          required={true}
          minValue={1}
          maxValue={1000}
        />

        {/* Course Price - Number Field with Constraints */}
        <FormField
          label="Course Price (₹)"
          type="number"
          name="coursePrice"
          value={formData.coursePrice}
          onChange={handleInputChange}
          placeholder="0"
          required={true}
          minValue={0}
          maxValue={100000}
        />

        {/* Duration - Number Field */}
        <FormField
          label="Course Duration (hours)"
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleInputChange}
          placeholder="e.g., 40"
          required={true}
          minValue={1}
          maxValue={500}
        />

        <hr className="border-white/10 my-6" />

        {/* Form Info Box */}
        <div
          style={{
            backgroundColor: colors.info.light,
            borderLeft: `4px solid ${colors.info.base}`,
          }}
          className="p-4 rounded-lg"
        >
          <p style={{ color: colors.info.dark }} className="text-sm font-semibold">
            💡 Try it: Start typing in any field to see real-time validation feedback.
            Valid fields show green checkmarks, invalid fields show red borders and error
            messages.
          </p>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <FormSubmitButton
            onSubmit={handleSubmit}
            isLoading={isSubmitting}
            loadingText="Creating Course..."
            successMessage="Course created successfully! Redirecting..."
            errorMessage="Failed to create course. Please check your information and try again."
            label="Create Course"
            variant="primary"
          />
        </div>
      </section>

      {/* Features Documentation */}
      <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 space-y-6">
        <h2 className="text-2xl font-bold text-slate-100">Form Validation Features</h2>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Email Validation */}
          <div
            style={{
              backgroundColor: colors.primary.light,
              borderLeft: `4px solid ${colors.primary.base}`,
            }}
            className="p-4 rounded-lg"
          >
            <h3
              style={{ color: colors.primary.dark }}
              className="font-bold mb-2"
            >
              📧 Email Validation
            </h3>
            <p style={{ color: colors.primary.dark }} className="text-sm">
              • Green checkmark when valid
              <br />• Red border + error message when invalid
              <br />• Pattern: name@example.com
            </p>
          </div>

          {/* Password Strength */}
          <div
            style={{
              backgroundColor: colors.secondary.light,
              borderLeft: `4px solid ${colors.secondary.base}`,
            }}
            className="p-4 rounded-lg"
          >
            <h3
              style={{ color: colors.secondary.dark }}
              className="font-bold mb-2"
            >
              🔐 Password Strength Meter
            </h3>
            <p style={{ color: colors.secondary.dark }} className="text-sm">
              • Visual strength indicator (Red → Green)
              <br />• Requirements checklist
              <br />• Min 8 chars, uppercase, lowercase, number, special char
            </p>
          </div>

          {/* Required Fields */}
          <div
            style={{
              backgroundColor: colors.error.light,
              borderLeft: `4px solid ${colors.error.base}`,
            }}
            className="p-4 rounded-lg"
          >
            <h3
              style={{ color: colors.error.dark }}
              className="font-bold mb-2"
            >
              ✱ Required Fields
            </h3>
            <p style={{ color: colors.error.dark }} className="text-sm">
              • Red asterisk (*) indicator
              <br />• Error message if left empty
              <br />• Shows feedback on blur/touch
            </p>
          </div>

          {/* Number Constraints */}
          <div
            style={{
              backgroundColor: colors.success.light,
              borderLeft: `4px solid ${colors.success.base}`,
            }}
            className="p-4 rounded-lg"
          >
            <h3
              style={{ color: colors.success.dark }}
              className="font-bold mb-2"
            >
              🔢 Number Fields
            </h3>
            <p style={{ color: colors.success.dark }} className="text-sm">
              • Min/max constraints shown
              <br />• Validates range automatically
              <br />• Green checkmark when valid
            </p>
          </div>

          {/* File Upload */}
          <div
            style={{
              backgroundColor: colors.warning.light,
              borderLeft: `4px solid ${colors.warning.base}`,
            }}
            className="p-4 rounded-lg"
          >
            <h3
              style={{ color: colors.warning.dark }}
              className="font-bold mb-2"
            >
              📁 File Upload
            </h3>
            <p style={{ color: colors.warning.dark }} className="text-sm">
              • File size limits displayed
              <br />• Accepted formats shown
              <br />• Validates on selection
            </p>
          </div>

          {/* Form Submission */}
          <div
            style={{
              backgroundColor: colors.info.light,
              borderLeft: `4px solid ${colors.info.base}`,
            }}
            className="p-4 rounded-lg"
          >
            <h3
              style={{ color: colors.info.dark }}
              className="font-bold mb-2"
            >
              ✓ Submission Feedback
            </h3>
            <p style={{ color: colors.info.dark }} className="text-sm">
              • Spinner + "Loading..." while submitting
              <br />• Green success toast with checkmark
              <br />• Red error toast with message
            </p>
          </div>
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 space-y-4">
        <h2 className="text-2xl font-bold text-slate-100">How to Use in Your Forms</h2>

        <div className="space-y-4 text-slate-300 text-sm">
          <div>
            <p className="font-semibold mb-2">1. Import Components:</p>
            <code className="bg-slate-950 p-3 rounded block overflow-auto">
              {`import FormField from '@/components/form/FormField';\nimport FormSubmitButton from '@/components/form/FormSubmitButton';`}
            </code>
          </div>

          <div>
            <p className="font-semibold mb-2">2. Use FormField for Each Input:</p>
            <code className="bg-slate-950 p-3 rounded block overflow-auto">
              {`<FormField
  label="Email"
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  required={true}
/>`}
            </code>
          </div>

          <div>
            <p className="font-semibold mb-2">3. Add FormSubmitButton:</p>
            <code className="bg-slate-950 p-3 rounded block overflow-auto">
              {`<FormSubmitButton
  onSubmit={handleSubmit}
  isLoading={isSubmitting}
  label="Create"
/>`}
            </code>
          </div>

          <div>
            <p className="font-semibold mb-2">4. Supported Field Types:</p>
            <p className="text-slate-400">
              text • email • password • number • file • textarea
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
