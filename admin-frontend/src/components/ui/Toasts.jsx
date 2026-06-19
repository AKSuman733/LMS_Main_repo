import React from "react";
import toast from "react-hot-toast";
import { AlertCircle, Check, TriangleAlert } from "lucide-react";
import { colors } from "../../constants/designTokens";

export const showSuccess = (msg) =>
  toast.success(
    (t) => (
      <div className="flex items-center gap-2">
        <Check size={18} style={{ color: colors.success.base }} />
        <span>{msg}</span>
      </div>
    ),
    { duration: 3000 }
  );

export const showError = (msg) =>
  toast.error(
    (t) => (
      <div className="flex items-center gap-2">
        <AlertCircle size={18} style={{ color: colors.error.base }} />
        <span>{msg}</span>
      </div>
    ),
    { duration: 5000 }
  );

export const showWarning = (msg) =>
  toast(
    () => (
      <div className="flex items-center gap-2">
        <TriangleAlert size={18} style={{ color: colors.warning.base }} />
        <span>{msg}</span>
      </div>
    ),
    { duration: 4000 }
  );

export default {
  showSuccess,
  showError,
  showWarning,
};
