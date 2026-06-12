import { colors } from "../../constants/designTokens";

/**
 * QuickActionButtons Component
 * Displays 4 prominent action buttons for most-used admin tasks:
 * - 2 Primary buttons (orange fill): Create Course, Create Intern
 * - 2 Secondary buttons (teal outline): Approve Pending, View Reports
 * - 2 columns on desktop, 1 column on mobile
 * - Button height: 45px
 * - Hover effect: shadow + slight background change
 * - Active state: scale down slightly (0.98)
 */

export default function QuickActionButtons({ onActionClick = () => {} }) {
  const actions = [
    {
      id: "create-course",
      label: "+ New Course",
      description: "Create and publish a new course",
      variant: "primary", // orange fill
      icon: "📚",
      action: "create-course",
    },
    {
      id: "create-intern",
      label: "+ New Intern",
      description: "Add a new mentor/instructor",
      variant: "primary", // orange fill
      icon: "👨‍🏫",
      action: "create-intern",
    },
    {
      id: "approve-pending",
      label: "Approve Pending",
      description: "Review and approve pending items",
      variant: "secondary", // teal outline
      icon: "✓",
      action: "approve-pending",
    },
    {
      id: "view-reports",
      label: "View Reports",
      description: "Access detailed analytics and reports",
      variant: "secondary", // teal outline
      icon: "📊",
      action: "view-reports",
    },
  ];

  const handleClick = (action) => {
    onActionClick(action);
  };

  return (
    <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
      {actions.map((action) => {
        const isPrimary = action.variant === "primary";

        return (
          <button
            key={action.id}
            onClick={() => handleClick(action.action)}
            className={`
              relative h-[45px] sm:h-[50px] md:h-[55px] rounded-lg font-semibold 
              text-sm sm:text-base transition-all duration-200
              flex items-center justify-center gap-3 px-4
              active:scale-95 hover:scale-102
              group overflow-hidden
            `}
            style={{
              backgroundColor: isPrimary ? colors.primary.base : "transparent",
              border: `2px solid ${isPrimary ? colors.primary.base : colors.secondary.base}`,
              color: isPrimary ? "#FFFFFF" : colors.secondary.base,
            }}
          >
            {/* Animated background on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-200"
              style={{
                backgroundColor: isPrimary
                  ? "#000000"
                  : colors.secondary.base,
              }}
            />

            {/* Shadow effect on hover */}
            <div
              className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
              style={{
                boxShadow:
                  isPrimary &&
                  `0 8px 20px ${colors.primary.base}40`,
              }}
            />

            {/* Content */}
            <div className="relative z-10 flex items-center gap-2 w-full">
              <span className="text-lg">{action.icon}</span>
              <div className="text-left">
                <div className="font-bold">{action.label}</div>
                <div
                  className="text-xs opacity-70"
                  style={{
                    color: isPrimary ? "rgba(255,255,255,0.8)" : colors.secondary.base,
                  }}
                >
                  {action.description}
                </div>
              </div>
            </div>

            {/* Right arrow indicator */}
            <div className="ml-auto text-lg opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">
              →
            </div>
          </button>
        );
      })}
    </div>
  );
}
