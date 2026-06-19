import { metricCardConfig } from "../../constants/designTokens";

export default function MetricCard({
  title,
  value,
  label,
  icon: Icon,
  status = "success",
  trend,
  onClick,
  className = "",
}) {
  const config = {
    bg: metricCardConfig.backgroundColor[status] || metricCardConfig.backgroundColor.success,
    border: metricCardConfig.borderColor[status] || metricCardConfig.borderColor.success,
  };

  const CardTag = onClick ? "button" : "div";

  return (
    <CardTag
      onClick={onClick}
      style={{
        backgroundColor: config.bg,
        borderLeft: `${metricCardConfig.borderAccent} solid ${config.border}`,
      }}
      className={`group relative min-h-[112px] overflow-hidden rounded-lg border border-white/40 p-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${className}`}
    >
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-10"
        style={{ backgroundColor: config.border }}
      />

      <div className="relative z-10">
        <div className="mb-3 flex items-start justify-between gap-3">
          {Icon && <Icon size={20} style={{ color: config.border }} />}

          {trend && (
            <span
              style={{ color: config.border }}
              className="text-right text-xs font-semibold leading-tight"
            >
              {trend}
            </span>
          )}
        </div>

        <div
          style={{
            color: config.border,
            fontSize: metricCardConfig.numberSize,
            fontWeight: metricCardConfig.numberWeight,
          }}
          className="mb-2 leading-none"
        >
          {value}
        </div>

        <p
          style={{
            color: config.border,
            fontSize: metricCardConfig.labelSize,
            fontWeight: metricCardConfig.labelWeight,
          }}
          className="uppercase"
        >
          {title || label}
        </p>

        {label && title && (
          <p style={{ color: config.border }} className="mt-2 text-xs opacity-70">
            {label}
          </p>
        )}
      </div>
    </CardTag>
  );
}
