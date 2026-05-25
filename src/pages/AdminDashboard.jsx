import { motion } from 'motion/react';
import Sidebar from '../components/Sidebar';

import {
  Users,
  BookOpen,
  Bot,
  Award,
  TrendingUp,
  Calendar,
  UserPlus,
  X,
} from 'lucide-react';

import { useState } from 'react';

import {
  colors,
  shadows,
} from '../styles/designTokens';

export default function AdminDashboard() {

  const [showNewStudents, setShowNewStudents] =
    useState(false);

  const newStudents = [
    {
      name: 'Riya Sharma',
      course: 'Artificial Intelligence',
      joined: '20 May 2026',
    },

    {
      name: 'Aditya Verma',
      course: 'Full Stack Development',
      joined: '18 May 2026',
    },

    {
      name: 'Sneha Iyer',
      course: 'UI/UX Design',
      joined: '16 May 2026',
    },

    {
      name: 'Karan Patel',
      course: 'Machine Learning',
      joined: '14 May 2026',
    },

    {
      name: 'Megha Reddy',
      course: 'Python',
      joined: '12 May 2026',
    },
  ];

  const adminStats = [
    {
      label: 'Total Active Users',
      value: '1,280',
      icon: Users,
      color: colors.success,
      trend: '+12%',
    },

    {
      label: 'Total Courses',
      value: '9',
      icon: BookOpen,
      color: colors.secondary,
      trend: '+5',
    },

    {
      label: 'Enrollments This Week',
      value: '183',
      icon: TrendingUp,
      color: colors.primary,
      trend: '+18%',
    },
    {
      label: 'Revenue Generated',
      value: '₹1.8L',
      icon: TrendingUp,
      color: '#22c55e',
      trend: '+32%',
    },

    {
      label: 'Completion Rate',
      value: '78%',
      icon: Award,
      color: colors.success,
      trend: 'Excellent',
    },

    {
      label: 'Pending Approvals',
      value: '12',
      icon: Calendar,
      color: colors.error,
      trend: 'Urgent',
    },

    
  ];

  return (

    <div
      className="min-h-screen pl-64"
      style={{
        backgroundColor: colors.background,
        color: colors.textPrimary,
      }}
    >

      <Sidebar role="admin" />

      <main className="p-10">

        {/* HEADER */}
        <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">

          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
          >

            <h1
              className="text-4xl font-bold mb-2"
              style={{
                color: colors.textPrimary,
              }}
            >
              Admin Dashboard
            </h1>

            <p
              style={{
                color: colors.textSecondary,
              }}
            >
              Monitor platform activity and manage operations efficiently.
            </p>

          </motion.div>

          {/* DATE */}
          <div
            className="px-6 py-3 rounded-2xl flex items-center gap-3 border"
            style={{
              backgroundColor: colors.surface,
              borderColor: "rgba(255,255,255,0.08)",
              boxShadow: shadows.sm,
            }}
          >

            <Calendar
              className="w-5 h-5"
              style={{
                color: colors.secondary,
              }}
            />

            <span
              className="text-sm font-semibold"
              style={{
                color: colors.textPrimary,
              }}
            >
              May 21, 2026
            </span>

          </div>

        </header>

        {/* KPI */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">

          {adminStats.map((stat, i) => {

            const Icon = stat.icon;

            return (

              <motion.div
                key={stat.label}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: i * 0.1,
                }}
                className="p-6 rounded-3xl relative overflow-hidden border"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: "rgba(255,255,255,0.08)",
                  borderLeft: `4px solid ${stat.color}`,
                  boxShadow: shadows.md,
                }}
              >

                <div className="flex items-start justify-between mb-8">

                  <div
                    className="p-4 rounded-2xl"
                    style={{
                      backgroundColor: `${stat.color}15`,
                      color: stat.color,
                    }}
                  >

                    <Icon className="w-6 h-6" />

                  </div>

                  <span
                    className="text-[10px] uppercase font-bold px-3 py-1 rounded-lg"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      color: colors.textSecondary,
                    }}
                  >
                    {stat.trend}
                  </span>

                </div>

                <div
                  className="text-3xl font-bold mb-1"
                  style={{
                    color: colors.textPrimary,
                  }}
                >
                  {stat.value}
                </div>

                <div
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{
                    color: colors.textSecondary,
                  }}
                >
                  {stat.label}
                </div>

              </motion.div>

            );
          })}

        </div>

        {/* BUTTONS */}
        <div className="grid md:grid-cols-2 gap-5 mb-12">

          {/* NEW COURSE */}
          <button
            className="h-14 rounded-2xl transition-all font-semibold active:scale-[0.98]"
            style={{
              backgroundColor: colors.primary,
              color: colors.textPrimary,
              boxShadow: "0 0 25px rgba(255,107,53,0.25)",
            }}
          >
            + New Course
          </button>

          {/* NEW STUDENT */}
          <button
            onClick={() =>
              setShowNewStudents(true)
            }
            className="h-14 rounded-2xl transition-all font-semibold active:scale-[0.98]"
            style={{
              backgroundColor: colors.primary,
              color: colors.textPrimary,
              boxShadow: "0 0 25px rgba(255,107,53,0.25)",
            }}
          >
             New Student
          </button>

          <button
            className="h-14 rounded-2xl border transition-all font-semibold active:scale-[0.98]"
            style={{
              borderColor: colors.secondary,
              color: colors.secondary,
              backgroundColor: "transparent",
            }}
          >
            Approve Pending
          </button>

          <button
            className="h-14 rounded-2xl border transition-all font-semibold active:scale-[0.98]"
            style={{
              borderColor: colors.secondary,
              color: colors.secondary,
              backgroundColor: "transparent",
            }}
          >
            View Reports
          </button>

        </div>

        {/* POPUP */}
        {showNewStudents && (

          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="w-[700px] rounded-[2rem] p-8 border"
              style={{
                backgroundColor: colors.surface,
                borderColor: "rgba(255,255,255,0.08)",
                boxShadow: shadows.lg,
              }}
            >

              {/* TOP */}
              <div className="flex items-center justify-between mb-8">

                <div>

                  <h2
                    className="text-2xl font-bold mb-2"
                    style={{
                      color: colors.textPrimary,
                    }}
                  >
                    New Students
                  </h2>

                  <p
                    style={{
                      color: colors.textSecondary,
                    }}
                  >
                    Students joined in the last 10 days
                  </p>

                </div>

                <button
                  onClick={() =>
                    setShowNewStudents(false)
                  }
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                  }}
                >

                  <X className="w-5 h-5 text-white" />

                </button>

              </div>

              {/* LIST */}
              <div className="space-y-4">

                {newStudents.map((student, i) => (

                  <div
                    key={i}
                    className="p-5 rounded-2xl border flex items-center justify-between"
                    style={{
                      backgroundColor: colors.background,
                      borderColor: "rgba(255,255,255,0.06)",
                    }}
                  >

                    <div className="flex items-center gap-4">

                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center"
                        style={{
                          backgroundColor: `${colors.secondary}20`,
                          color: colors.secondary,
                        }}
                      >

                        <UserPlus className="w-5 h-5" />

                      </div>

                      <div>

                        <h3
                          className="font-semibold text-lg"
                          style={{
                            color: colors.textPrimary,
                          }}
                        >
                          {student.name}
                        </h3>

                        <p
                          className="text-sm"
                          style={{
                            color: colors.textSecondary,
                          }}
                        >
                          {student.course}
                        </p>

                      </div>

                    </div>

                    <div className="text-right">

                      <div
                        className="text-sm font-semibold"
                        style={{
                          color: colors.secondary,
                        }}
                      >
                        Joined
                      </div>

                      <div
                        className="text-sm"
                        style={{
                          color: colors.textSecondary,
                        }}
                      >
                        {student.joined}
                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </motion.div>

          </div>

        )}

        {/* ANALYTICS */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div
            className="lg:col-span-2 rounded-[2.5rem] border p-8"
            style={{
              backgroundColor: colors.surface,
              borderColor: "rgba(255,255,255,0.08)",
              boxShadow: shadows.md,
            }}
          >

            <div className="flex items-center justify-between mb-10">

              <div>

                <h3
                  className="text-xl font-bold mb-1"
                  style={{
                    color: colors.textPrimary,
                  }}
                >
                  Growth Analytics
                </h3>

                <p
                  className="text-xs uppercase tracking-widest font-bold"
                  style={{
                    color: colors.textSecondary,
                  }}
                >
                  New registrations this month
                </p>

              </div>

              <div className="flex gap-2">

                <div
                  className="px-4 py-2 rounded-xl text-xs font-bold"
                  style={{
                    backgroundColor: colors.secondary,
                    color: colors.background,
                  }}
                >
                  Daily
                </div>

                <div
                  className="px-4 py-2 rounded-xl text-xs font-bold"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: colors.textSecondary,
                  }}
                >
                  Monthly
                </div>

              </div>

            </div>

            {/* CHART */}
            <div
              className="h-64 flex items-end gap-2 px-4 border-b border-l relative"
              style={{
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >

              {[30, 45, 25, 60, 40, 80, 55, 90, 75, 65, 85, 100].map(
                (h, i) => (

                  <div
                    key={i}
                    className="flex-1 rounded-t-lg transition-all"
                    style={{
                      height: `${h}%`,
                      background: `linear-gradient(to top, ${colors.primary}60, ${colors.secondary})`,
                    }}
                  />

                )
              )}

            </div>

          </div>

          {/* RIGHT */}
          <div
            className="rounded-[2.5rem] border p-8"
            style={{
              backgroundColor: colors.surface,
              borderColor: "rgba(255,255,255,0.08)",
              boxShadow: shadows.md,
            }}
          >

            <h3
              className="text-xl font-bold mb-6"
              style={{
                color: colors.textPrimary,
              }}
            >
              Recent Activity
            </h3>

            <div className="space-y-6">

              {[
                {
                  user: 'Sneha',
                  action: 'Completed UI/UX Course',
                  time: '2m ago',
                  icon: Award,
                  color: colors.secondary,
                },

                {
                  user: 'Admin',
                  action: 'Added New Full Stack Course',
                  time: '15m ago',
                  icon: BookOpen,
                  color: colors.primary,
                },

                {
                  user: 'Arjun',
                  action: 'Joined Cybersecurity Program',
                  time: '1h ago',
                  icon: Users,
                  color: colors.success,
                },

                {
                  user: 'System',
                  action: 'Platform backup completed',
                  time: '2h ago',
                  icon: Bot,
                  color: colors.info,
                },

              ].map((act, i) => (

                <div
                  key={i}
                  className="flex items-center gap-4"
                >

                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      color: act.color,
                    }}
                  >

                    <act.icon className="w-5 h-5" />

                  </div>

                  <div className="flex-1">

                    <div
                      className="text-sm font-semibold"
                      style={{
                        color: colors.textPrimary,
                      }}
                    >
                      {act.user}
                    </div>

                    <div
                      className="text-xs"
                      style={{
                        color: colors.textSecondary,
                      }}
                    >
                      {act.action}
                    </div>

                  </div>

                  <div
                    className="text-[10px] font-bold uppercase"
                    style={{
                      color: colors.textSecondary,
                    }}
                  >
                    {act.time}
                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}