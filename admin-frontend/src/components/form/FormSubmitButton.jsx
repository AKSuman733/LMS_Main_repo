import { useCallback } from "react";
import toast from "react-hot-toast";
import { Check, AlertCircle, Loader } from "lucide-react";
import { colors } from "../../constants/designTokens";

/**
 * FormSubmitButton Component
 * Displays submission feedback with:
 * - Spinner + 'Loading...' text while form submits
 * - Success/Error toasts with icons and messages
 * - Disabled state during submission
 */

export default function FormSubmitButton({
  onSubmit,
  isLoading = false,
  loadingText = "Submitting...",
  successMessage = "Operation completed successfully!",
  errorMessage = "An error occurred. Please try again.",
  label = "Submit",
  variant = "primary", // primary | secondary
  className = "",
  disabled = false,
  onClick,
}) {
  const handleClick = async (e) => {
    e.preventDefault();

    if (onClick) onClick(e);

    if (onSubmit) {
      try {
        await onSubmit();

        // Success toast
        toast.success((t) => (
          <div className="flex items-center gap-2">
            <Check size={20} style={{ color: colors.success.base }} />
            <span>{successMessage}</span>
          </div>
        ));
      } catch (error) {
        // Error toast
        toast.error((t) => (
          <div className="flex items-center gap-2">
            <AlertCircle size={20} style={{ color: colors.error.base }} />
            <span>{error.message || errorMessage}</span>
          </div>
        ));
      }
    }
  };

  const isPrimary = variant === "primary";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading || disabled}
      style={{
        backgroundColor: isPrimary ? colors.primary.base : "transparent",
        borderColor: isPrimary ? colors.primary.base : colors.secondary.base,
        color: isPrimary ? "#FFFFFF" : colors.secondary.base,
      }}
      className={`
        relative px-6 py-3 rounded-lg font-semibold transition-all duration-200
        border-2 flex items-center justify-center gap-2
        hover:scale-105 active:scale-95
        disabled:opacity-70 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {isLoading ? (
        <>
          <Loader size={18} className="animate-spin" />
          <span>{loadingText}</span>
        </>
      ) : (
        label
      )}
    </button>
  );
}

/**
 * useFormSubmit Hook
 * Manages form submission state and provides toast notifications
 */

export function useFormSubmit(options = {}) {
  const {
    onSuccess,
    onError,
    successMessage = "Operation completed successfully!",
    errorMessage = "An error occurred. Please try again.",
  } = options;

  const submitForm = useCallback(
    async (submitFn) => {
      try {
        const result = await submitFn();

        // Show success toast
        toast.success((t) => (
          <div className="flex items-center gap-2">
            <Check size={20} style={{ color: colors.success.base }} />
            <span>{successMessage}</span>
          </div>
        ));

        onSuccess?.(result);
        return result;
      } catch (error) {
        // Show error toast
        const message = error.message || errorMessage;
        toast.error((t) => (
          <div className="flex items-center gap-2">
            <AlertCircle size={20} style={{ color: colors.error.base }} />
            <span>{message}</span>
          </div>
        ));

        onError?.(error);
        throw error;
      }
    },
    [successMessage, errorMessage, onSuccess, onError]
  );

  return { submitForm };
}

/**
 * Toast utility functions
 */

export const showSuccessToast = (message) => {
  toast.success((t) => (
    <div className="flex items-center gap-2">
      <Check size={20} style={{ color: colors.success.base }} />
      <span>{message}</span>
    </div>
  ));
};

export const showErrorToast = (message) => {
  toast.error((t) => (
    <div className="flex items-center gap-2">
      <AlertCircle size={20} style={{ color: colors.error.base }} />
      <span>{message}</span>
    </div>
  ));
};

export const showLoadingToast = (message) => {
  return toast.loading((t) => (
    <div className="flex items-center gap-2">
      <Loader size={20} className="animate-spin" />
      <span>{message}</span>
    </div>
  ));
};
