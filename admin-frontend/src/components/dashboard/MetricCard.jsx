import { colors, metricCardConfig } from "../../constants/designTokens";

/**
 * MetricCard Component
 * Displays a KPI card with:
 * - Colored left border accent (3-4px)
 * - Large metric number (18px bold)
 * - Muted label (11px)
 * - Light background matching accent color
 * - Optional icon, trend, or status indicator
 */

export default function MetricCard({
  title,
  value,
  label,
  icon: Icon,
  status = "success", // success | warning | error | info | primary | secondary
  trend,
  onClick,
  className = "",
}) {
  const statusConfig = {
    success: {
      bg: "#D1FAE5",
      border: colors.success.base,
      textColor: "text-emerald-900",
      icon: "✓",
    },
    warning: {
      bg: "#FEF3C7",
      border: colors.warning.base,
      textColor: "text-amber-900",
      icon: "!",
    },
    error: {
      bg: "#FEE2E2",
      border: colors.error.base,
      textColor: "text-red-900",
      icon: "×",
    },
    info: {
      bg: "#DBEAFE",
      border: colors.info.base,
      textColor: "text-blue-900",
      icon: "ℹ",
    },
    primary: {
      bg: colors.primary.light,
      border: colors.primary.base,
      textColor: "text-orange-900",
      icon: "○",
    },
    secondary: {
      bg: colors.secondary.light,
      border: colors.secondary.base,
      textColor: "text-teal-900",
      icon: "◆",
    },
  };

  const config = statusConfig[status] || statusConfig.success;

  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: config.bg,
        borderLeft: `${metricCardConfig.borderAccent} solid ${config.border}`,
      }}
      className={`group relative overflow-hidden rounded-lg border border-transparent p-4 text-left transition-all duration-200 hover:shadow-md hover:scale-105 sm:p-5 md:p-6 ${className}`}
    >
      {/* Background gradient on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-200"
        style={{ backgroundColor: config.border }}
      />

      <div className="relative z-10">
        {/* Header with Icon/Status Badge */}
        <div className="flex items-start justify-between mb-3">
          {Icon ? (
            <Icon
              size={20}
              style={{ color: config.border }}
              className="opacity-70"
            />
          ) : (
            <div
              style={{ color: config.border, fontSize: "16px" }}
              className="opacity-60"
            >
              {config.icon}
            </div>
          )}

          {trend && (
            <span
              style={{ color: config.border }}
              className="text-xs font-semibold opacity-75"
            >
              {trend}
            </span>
          )}
        </div>

        {/* Metric Number */}
        <div
          style={{
            fontSize: metricCardConfig.numberSize,
            fontWeight: metricCardConfig.numberWeight,
            color: config.border,
          }}
          className="mb-2"
        >
          {value}
        </div>

        {/* Label */}
        <p
          style={{
            fontSize: metricCardConfig.labelSize,
            fontWeight: metricCardConfig.labelWeight,
            color: config.border,
          }}
          className="opacity-70 uppercase tracking-wide"
        >
          {title || label}
        </p>

        {/* Optional sub-text */}
        {label && title && (
          <p style={{ color: config.border }} className="text-xs opacity-60 mt-2">
            {label}
          </p>
        )}
      </div>
    </button>
  );
}
