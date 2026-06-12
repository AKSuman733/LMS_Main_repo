import { useState } from "react";
import { Plus, CheckCircle, BarChart3, User } from "lucide-react";
import { colors, spacing } from "../../constants/designTokens";

/**
 * QuickActionButtonsEnhanced Component
 * Premium version of quick action buttons with:
 * - Large, full-width buttons (45px+ height)
 * - 2 primary (orange fill) + 2 secondary (teal outline)
 * - Icons from lucide-react with smooth animations
 * - Descriptions under each action
 * - Gradient hover effects
 * - Shadow & glow effects
 * - Responsive: 2 cols desktop, 1 col mobile
 * - Active state with scale animation
 * - Smooth transitions and micro-interactions
 */

export default function QuickActionButtonsEnhanced({ onActionClick = () => {} }) {
  const [activeBtn, setActiveBtn] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(null);

  const actions = [
    {
      id: "create-course",
      label: "New Course",
      description: "Create and publish a new course",
      variant: "primary",
      icon: () => <Plus size={24} className="group-hover:scale-110 transition-transform" />,
      action: "create-course",
      color: colors.primary.base,
      bgColor: colors.primary.light,
    },
    {
      id: "create-intern",
      label: "New Mentor",
      description: "Add a new instructor or mentor",
      variant: "primary",
      icon: () => <User size={24} className="group-hover:scale-110 transition-transform" />,
      action: "create-intern",
      color: colors.primary.base,
      bgColor: colors.primary.light,
    },
    {
      id: "approve-pending",
      label: "Approve Pending",
      description: "Review pending approvals",
      variant: "secondary",
      icon: () => <CheckCircle size={24} className="group-hover:scale-110 transition-transform" />,
      action: "approve-pending",
      color: colors.secondary.base,
      bgColor: colors.secondary.light,
    },
    {
      id: "view-reports",
      label: "View Analytics",
      description: "Access reports & statistics",
      variant: "secondary",
      icon: () => <BarChart3 size={24} className="group-hover:scale-110 transition-transform" />,
      action: "view-reports",
      color: colors.secondary.base,
      bgColor: colors.secondary.light,
    },
  ];

  const handleClick = (action) => {
    setActiveBtn(action.id);
    setTimeout(() => setActiveBtn(null), 200);
    onActionClick(action.action);
  };

  return (
    <div className="w-full space-y-0">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
        <p className="text-sm text-gray-500 mt-1">
          Fast access to your most common tasks
        </p>
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((action, idx) => {
          const isPrimary = action.variant === "primary";
          const isHovered = hoveredBtn === action.id;
          const isActive = activeBtn === action.id;

          return (
            <div key={action.id} className="h-full">
              <button
                onClick={() => handleClick(action)}
                onMouseEnter={() => setHoveredBtn(action.id)}
                onMouseLeave={() => setHoveredBtn(null)}
                className={`
                  relative w-full h-[50px] md:h-[55px] lg:h-[60px] rounded-xl
                  font-semibold text-base md:text-lg
                  flex items-center gap-4 px-5 md:px-6 py-3
                  transition-all duration-300 ease-out
                  overflow-hidden group
                  ${isActive ? "scale-95" : "scale-100"}
                  ${isHovered ? "shadow-xl" : "shadow-md"}
                `}
                style={{
                  backgroundColor: isPrimary ? action.color : "white",
                  border: `2.5px solid ${action.color}`,
                  color: isPrimary ? "white" : action.color,
                }}
              >
                {/* Animated gradient background on hover */}
                <div
                  className={`
                    absolute inset-0 opacity-0 transition-opacity duration-300
                    ${isHovered ? "opacity-100" : "opacity-0"}
                  `}
                  style={{
                    background: isPrimary
                      ? `linear-gradient(135deg, ${action.color}99, ${action.color}44)`
                      : `linear-gradient(135deg, ${action.color}15, ${action.color}08)`,
                  }}
                />

                {/* Glow effect */}
                {isHovered && (
                  <div
                    className="absolute inset-0 rounded-xl opacity-50 blur-md -z-10 transition-opacity duration-300"
                    style={{
                      backgroundColor: action.color,
                      opacity: isPrimary ? 0.3 : 0.1,
                    }}
                  />
                )}

                {/* Icon Container */}
                <div
                  className={`
                    flex-shrink-0 p-2 rounded-lg transition-all duration-300
                    ${isHovered ? "scale-110" : "scale-100"}
                  `}
                  style={{
                    backgroundColor: isPrimary ? "rgba(255,255,255,0.15)" : action.color + "15",
                    color: isPrimary ? "white" : action.color,
                  }}
                >
                  {action.icon()}
                </div>

                {/* Text Content */}
                <div className="relative z-10 flex-1 text-left">
                  <div className="font-bold text-base md:text-lg tracking-tight">
                    {action.label}
                  </div>
                  <div
                    className="text-xs md:text-sm opacity-75 transition-opacity duration-300 line-clamp-1"
                    style={{
                      color: isPrimary ? "rgba(255,255,255,0.85)" : action.color,
                    }}
                  >
                    {action.description}
                  </div>
                </div>

                {/* Arrow indicator with animation */}
                <div
                  className={`
                    flex-shrink-0 text-xl font-light transition-all duration-300
                    ${isHovered ? "translate-x-1 opacity-100" : "translate-x-0 opacity-70"}
                  `}
                  style={{
                    color: isPrimary ? "white" : action.color,
                  }}
                >
                  →
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Feature Info Below */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
          <div>
            <div className="text-sm font-semibold text-gray-900">2 Primary</div>
            <div className="text-xs text-gray-500">Create actions</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">2 Secondary</div>
            <div className="text-xs text-gray-500">Review actions</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">Responsive</div>
            <div className="text-xs text-gray-500">Mobile optimized</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">Fast Access</div>
            <div className="text-xs text-gray-500">1-click actions</div>
          </div>
        </div>
      </div>
    </div>
  );
}
