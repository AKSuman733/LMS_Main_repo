import { BarChart3, CheckCheck, GraduationCap, Plus } from "lucide-react";
import { colors, shadows } from "../../constants/designTokens";

export default function QuickActionButtons({ onActionClick = () => {} }) {
  const actions = [
    {
      id: "create-course",
      label: "New Course",
      variant: "primary",
      icon: Plus,
      action: "create-course",
    },
    {
      id: "create-intern",
      label: "New Intern",
      variant: "primary",
      icon: GraduationCap,
      action: "create-intern",
    },
    {
      id: "approve-pending",
      label: "Approve Pending",
      variant: "secondary",
      icon: CheckCheck,
      action: "approve-pending",
    },
    {
      id: "view-reports",
      label: "View Reports",
      variant: "secondary",
      icon: BarChart3,
      action: "view-reports",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {actions.map((action) => {
        const Icon = action.icon;
        const isPrimary = action.variant === "primary";

        return (
          <button
            key={action.id}
            onClick={() => onActionClick(action.action)}
            className="flex h-[45px] items-center justify-center gap-2 rounded-lg px-4 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
            style={{
              backgroundColor: isPrimary ? colors.primary.base : "transparent",
              border: `2px solid ${
                isPrimary ? colors.primary.base : colors.secondary.base
              }`,
              boxShadow: isPrimary ? shadows.sm : "none",
              color: isPrimary ? colors.neutral.white : colors.secondary.base,
            }}
          >
            <Icon size={18} />
            <span>{action.label}</span>
          </button>
        );
      })}
    </div>
  );
}
