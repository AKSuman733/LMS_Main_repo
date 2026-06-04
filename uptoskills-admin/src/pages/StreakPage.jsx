import { Flame, Award, Gift } from "lucide-react";
import Sidebar from "../components/Sidebar";

/* DESIGN TOKENS */
import {
  colors,
  shadows,
} from "../styles/designTokens";

export default function StreakPage() {

  const streak = 12;

  const streakStartDate = "8 May 2026";

  const streakStart = 127;

  const rewards = [
    {
      days: 7,
      title: "Bronze Badge",
      unlocked: true,
      color: "from-amber-700 to-yellow-500",
    },

    {
      days: 30,
      title: "Silver Badge",
      unlocked: false,
      color: "from-gray-400 to-gray-200",
    },

    {
      days: 50,
      title: "Gold Badge",
      unlocked: false,
      color: "from-yellow-500 to-orange-400",
    },

    {
      days: 75,
      title: "Diamond Badge",
      unlocked: false,
      color: "from-cyan-400 to-blue-500",
    },

    {
      days: 100,
      title: "FREE COURSE",
      unlocked: false,
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (

    <div
      className="min-h-screen flex overflow-hidden"
      style={{
        backgroundColor: colors.background,
        color: colors.textPrimary,
      }}
    >

      {/* SIDEBAR */}
      <Sidebar role="student" />

      {/* MAIN */}
      <main className="flex-1 ml-64 p-5 overflow-hidden">

        {/* HEADER */}
        <div className="mb-5">

          <h1
            className="text-3xl font-bold flex items-center gap-3"
            style={{
              color: colors.textPrimary,
            }}
          >
            🔥 Learning Streaks
          </h1>

          <p
            className="text-sm mt-1"
            style={{
              color: colors.textSecondary,
            }}
          >
            Stay consistent and unlock rewards.
          </p>

        </div>

        {/* TOP CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">

          {/* STREAK CARD */}
          <div
            className="border rounded-2xl p-5"
            style={{
              backgroundColor:
                "rgba(255,255,255,0.04)",

              borderColor:
                `${colors.secondary}25`,

              boxShadow: shadows.md,
            }}
          >

            <p
              className="text-sm mb-2"
              style={{
                color: colors.textSecondary,
              }}
            >
              Current Streak
            </p>

            <h2
              className="text-6xl font-black leading-none"
              style={{
                color: colors.secondary,
              }}
            >
              {streak}
            </h2>

            <p
              className="text-lg mt-3"
              style={{
                color: colors.textSecondary,
              }}
            >
              Started on {streakStartDate} 🔥
            </p>

            <div
              className="mt-5 w-20 h-20 rounded-full border flex items-center justify-center"
              style={{
                backgroundColor:
                  `${colors.secondary}10`,

                borderColor:
                  `${colors.secondary}25`,
              }}
            >

              <Flame
                className="w-10 h-10"
                style={{
                  color: colors.secondary,
                }}
              />

            </div>

          </div>

          {/* GOAL CARD */}
          <div
            className="lg:col-span-2 border rounded-2xl p-5"
            style={{
              backgroundColor:
                "rgba(255,255,255,0.04)",

              borderColor:
                `${colors.secondary}25`,

              boxShadow: shadows.md,
            }}
          >

            <div className="flex justify-between items-center mb-4">

              <h2
                className="text-2xl font-bold"
                style={{
                  color: colors.secondary,
                }}
              >
                🎯 FREE COURSE GOAL
              </h2>

              <span
                className="font-semibold"
                style={{
                  color: colors.secondary,
                }}
              >
                {streak}/100
              </span>

            </div>

            <p
              className="text-sm mb-5"
              style={{
                color: colors.textSecondary,
              }}
            >
              Maintain your streak for 100 continuous
              days to unlock any premium course.
            </p>

            {/* PROGRESS */}
            <div
              className="w-full h-3 rounded-full overflow-hidden"
              style={{
                backgroundColor: colors.surface,
              }}
            >

              <div
                className="h-full rounded-full"
                style={{
                  width: `${(streak / 100) * 100}%`,
                  backgroundColor:
                    colors.secondary,
                }}
              />

            </div>

            <div
              className="flex justify-between text-xs mt-2"
              style={{
                color: colors.textSecondary,
              }}
            >

              <span>12 Days</span>

              <span>100 Days</span>

            </div>

          </div>

        </div>

        {/* HEATMAP */}
        <div
          className="border rounded-2xl p-5 mb-5 w-full overflow-hidden"
          style={{
            backgroundColor:
              "rgba(255,255,255,0.04)",

            borderColor:
              "rgba(255,255,255,0.08)",

            boxShadow: shadows.md,
          }}
        >

          {/* TOP */}
          <div className="flex justify-between items-center mb-4">

            <div>

              <h2
                className="text-2xl font-bold"
                style={{
                  color: colors.textPrimary,
                }}
              >
                Activity Heatmap
              </h2>

              <p
                className="text-sm"
                style={{
                  color: colors.textSecondary,
                }}
              >
                Your daily learning activity
              </p>

            </div>

            {/* LEGEND */}
            <div
              className="flex items-center gap-2 text-xs"
              style={{
                color: colors.textSecondary,
              }}
            >

              <span>Less</span>

              <div
                className="w-3 h-3 rounded-sm"
                style={{
                  backgroundColor:
                    colors.surface,
                }}
              />

              <div
                className="w-3 h-3 rounded-sm"
                style={{
                  backgroundColor:
                    colors.secondary,
                }}
              />

              <span>More</span>

            </div>

          </div>

          {/* MONTHS */}
          <div
            className="flex justify-between text-[10px] ml-8 mb-2"
            style={{
              color: colors.textSecondary,
            }}
          >

            {[
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ].map((month, i) => (
              <span key={i}>{month}</span>
            ))}

          </div>

          {/* GRID */}
          <div className="flex gap-2">

            {/* DAYS */}
            <div
              className="flex flex-col justify-between text-[10px] h-[74px]"
              style={{
                color: colors.textSecondary,
              }}
            >

              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>

            </div>

            {/* FULL YEAR */}
            <div className="flex-1">

              <div className="grid grid-flow-col grid-rows-7 gap-[3px] w-full">

                {Array.from({ length: 365 }).map((_, i) => {

                  const active =
                    i >= streakStart &&
                    i < streakStart + streak;

                  return (
                    <div
                      key={i}
                      className="w-[10px] h-[10px] rounded-[2px]"
                      style={{
                        backgroundColor: active
                          ? colors.secondary
                          : colors.surface,

                        boxShadow: active
                          ? "0 0 5px rgba(0,181,165,0.8)"
                          : "none",
                      }}
                    />
                  );
                })}

              </div>

            </div>

          </div>

        </div>

        {/* REWARDS */}
        <div>

          <h2
            className="text-2xl font-bold mb-4"
            style={{
              color: colors.textPrimary,
            }}
          >
            Rewards
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

            {rewards.map((reward, index) => (

              <div
                key={index}
                className="rounded-2xl p-5 border"
                style={{
                  backgroundColor:
                    reward.unlocked
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(255,255,255,0.02)",

                  borderColor:
                    reward.unlocked
                      ? `${colors.secondary}30`
                      : "rgba(255,255,255,0.08)",

                  opacity:
                    reward.unlocked
                      ? 1
                      : 0.7,

                  boxShadow: shadows.sm,
                }}
              >

                {/* ICON */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${reward.color} flex items-center justify-center mb-4`}
                >

                  {reward.days === 100 ? (

                    <Gift className="w-6 h-6 text-white" />

                  ) : (

                    <Award className="w-6 h-6 text-white" />

                  )}

                </div>

                {/* TITLE */}
                <h3
                  className="text-lg font-bold mb-2"
                  style={{
                    color: colors.textPrimary,
                  }}
                >
                  {reward.title}
                </h3>

                {/* DAYS */}
                <p
                  className="text-sm mb-4"
                  style={{
                    color: colors.textSecondary,
                  }}
                >
                  Unlock at {reward.days} Days
                </p>

                {/* STATUS */}
                {reward.unlocked ? (

                  <span
                    className="px-3 py-1.5 border text-xs font-semibold rounded-full"
                    style={{
                      backgroundColor:
                        `${colors.secondary}10`,

                      borderColor:
                        `${colors.secondary}25`,

                      color: colors.secondary,
                    }}
                  >
                    Unlocked
                  </span>

                ) : (

                  <span
                    className="px-3 py-1.5 border text-xs font-semibold rounded-full"
                    style={{
                      backgroundColor:
                        "rgba(255,255,255,0.03)",

                      borderColor:
                        "rgba(255,255,255,0.08)",

                      color:
                        colors.textSecondary,
                    }}
                  >
                    Locked
                  </span>

                )}

              </div>

            ))}

          </div>

        </div>

      </main>

    </div>
  );
}