import Sidebar from '../../components/Sidebar';

import { motion } from 'motion/react';

import {
  TrendingUp,
  Users,
  BookOpen,
  DollarSign,
  Activity,
  Award,
  ArrowUpRight,
  BarChart3,
} from 'lucide-react';

import {
  colors,
  shadows,
} from '../../styles/designTokens';

export default function Performance() {

  const stats = [

    {
      title: 'Total Revenue',
      value: '₹1.8L',
      growth: '+32%',
      icon: DollarSign,
      color: '#22c55e',
    },

    {
      title: 'Active Students',
      value: '5,420',
      growth: '+18%',
      icon: Users,
      color: '#06b6d4',
    },

    {
      title: 'Course Completion',
      value: '78%',
      growth: '+12%',
      icon: Award,
      color: '#f59e0b',
    },

    {
      title: 'Enrollments',
      value: '1,284',
      growth: '+24%',
      icon: BookOpen,
      color: '#8b5cf6',
    },

  ];

  const graphData = [
    120,
    180,
    150,
    240,
    210,
    300,
    280,
    360,
    330,
    420,
    390,
    470,
  ];

  return (

    <div
      className="min-h-screen pl-64 overflow-hidden"
      style={{
        backgroundColor: colors.background,
        color: colors.textPrimary,
      }}
    >

      <Sidebar role="admin" />

      <main className="p-10">

        {/* HEADER */}
        <motion.div
          initial={{
            opacity: 0,
            y: -30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-12 flex items-center justify-between"
        >

          <div>

            <h1 className="text-5xl font-bold mb-4">
              Performance Analytics 📈
            </h1>

            <p
              className="text-lg"
              style={{
                color: colors.textSecondary,
              }}
            >
              Track revenue, growth, enrollments and AI platform activity.
            </p>

          </div>

          {/* LIVE STATUS */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="px-6 py-4 rounded-2xl border flex items-center gap-3"
            style={{
              backgroundColor: colors.surface,
              borderColor: 'rgba(255,255,255,0.08)',
            }}
          >

            <div className="w-3 h-3 bg-green-500 rounded-full"></div>

            <span className="font-semibold">
              System Live
            </span>

          </motion.div>

        </motion.div>

        {/* KPI CARDS */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

          {stats.map((item, i) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.6,
                }}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                className="p-7 rounded-[2rem] border relative overflow-hidden"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: 'rgba(255,255,255,0.08)',
                  boxShadow: shadows.lg,
                }}
              >

                {/* GLOW */}
                <div
                  className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-20"
                  style={{
                    backgroundColor: item.color,
                  }}
                ></div>

                <div className="flex items-center justify-between mb-8">

                  <motion.div
                    whileHover={{
                      rotate: 10,
                      scale: 1.1,
                    }}
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{
                      backgroundColor: `${item.color}20`,
                    }}
                  >

                    <Icon
                      className="w-8 h-8"
                      style={{
                        color: item.color,
                      }}
                    />

                  </motion.div>

                  <div
                    className="px-3 py-2 rounded-xl flex items-center gap-1 text-sm font-bold"
                    style={{
                      backgroundColor: 'rgba(34,197,94,0.15)',
                      color: '#22c55e',
                    }}
                  >

                    <ArrowUpRight className="w-4 h-4" />

                    {item.growth}

                  </div>

                </div>

                <h2 className="text-4xl font-bold mb-2">
                  {item.value}
                </h2>

                <p
                  className="text-sm"
                  style={{
                    color: colors.textSecondary,
                  }}
                >
                  {item.title}
                </p>

              </motion.div>

            );
          })}

        </div>

        {/* STOCK MARKET STYLE GRAPH */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="rounded-[2.5rem] p-8 border mb-10 relative overflow-hidden"
          style={{
            backgroundColor: colors.surface,
            borderColor: 'rgba(255,255,255,0.08)',
            boxShadow: shadows.lg,
          }}
        >

          {/* BACKGROUND GLOW */}
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10"
            style={{
              background:
                'linear-gradient(135deg,#14b8a6,#f97316)',
            }}
          ></div>

          <div className="flex items-center justify-between mb-12">

            <div>

              <h2 className="text-3xl font-bold mb-3">
                Platform Growth
              </h2>

              <p
                style={{
                  color: colors.textSecondary,
                }}
              >
                Monthly student & revenue growth analytics
              </p>

            </div>

            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
              }}
            >

              <BarChart3
                className="w-10 h-10"
                style={{
                  color: colors.primary,
                }}
              />

            </motion.div>

          </div>

          {/* GRAPH AREA */}
          <div className="h-[420px] relative flex items-end gap-5">

            {/* GRID */}
            <div className="absolute inset-0 flex flex-col justify-between opacity-10">

              {[1, 2, 3, 4, 5].map((line) => (

                <div
                  key={line}
                  className="border-t border-white"
                ></div>

              ))}

            </div>

            {/* BARS */}
            {graphData.map((value, index) => (

              <motion.div
                key={index}
                initial={{
                  height: 0,
                }}
                animate={{
                  height: `${value}px`,
                }}
                transition={{
                  duration: 1,
                  delay: index * 0.08,
                }}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                }}
                className="flex-1 rounded-t-[2rem] relative cursor-pointer"
                style={{
                  background:
                    'linear-gradient(to top,#f97316,#14b8a6)',
                  boxShadow:
                    '0 0 25px rgba(20,184,166,0.3)',
                }}
              >

                {/* FLOATING VALUE */}
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  whileHover={{
                    opacity: 1,
                    y: -10,
                  }}
                  className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-xl text-sm font-bold"
                  style={{
                    backgroundColor: '#111827',
                    border:
                      '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {value}
                </motion.div>

              </motion.div>

            ))}

          </div>

        </motion.div>

        {/* LIVE ACTIVITY */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* ACTIVITY */}
          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            className="rounded-[2rem] p-8 border"
            style={{
              backgroundColor: colors.surface,
              borderColor: 'rgba(255,255,255,0.08)',
              boxShadow: shadows.md,
            }}
          >

            <div className="flex items-center gap-3 mb-8">

              <Activity
                className="w-7 h-7"
                style={{
                  color: '#14b8a6',
                }}
              />

              <h2 className="text-2xl font-bold">
                Live Activity
              </h2>

            </div>

            <div className="space-y-5">

              {[
                '132 new students enrolled',
                'Revenue increased by 18%',
                'AI Teacher Surya trending',
                '45 certificates generated',
              ].map((item, i) => (

                <motion.div
                  key={i}
                  whileHover={{
                    x: 10,
                  }}
                  className="p-5 rounded-2xl border flex items-center justify-between"
                  style={{
                    backgroundColor:
                      'rgba(255,255,255,0.03)',
                    borderColor:
                      'rgba(255,255,255,0.05)',
                  }}
                >

                  <span>{item}</span>

                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>

                </motion.div>

              ))}

            </div>

          </motion.div>

          {/* PERFORMANCE SCORE */}
          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            className="rounded-[2rem] p-8 border relative overflow-hidden"
            style={{
              backgroundColor: colors.surface,
              borderColor: 'rgba(255,255,255,0.08)',
              boxShadow: shadows.md,
            }}
          >

            <div
              className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-10"
              style={{
                background:
                  'linear-gradient(135deg,#8b5cf6,#14b8a6)',
              }}
            ></div>

            <h2 className="text-2xl font-bold mb-10">
              Platform Score 🚀
            </h2>

            <div className="flex items-center justify-center">

              

                <div className="text-center">

                  <h1 className="text-6xl font-bold mb-2">
                    94%
                  </h1>

                  <p
                    style={{
                      color: colors.textSecondary,
                    }}
                  >
                    Overall Growth
                  </p>

                </div>

              

            </div>

          </motion.div>

        </div>

      </main>

    </div>

  );
}