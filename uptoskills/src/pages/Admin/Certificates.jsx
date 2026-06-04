import Sidebar from '../../components/Sidebar';

import { motion } from 'motion/react';

import {
  Award,
  CheckCircle2,
  Clock3,
  FileBadge,
  Download,
  Star,
  Trophy,
  ShieldCheck,
  ArrowUpRight,
} from 'lucide-react';

import {
  colors,
  shadows,
} from '../../styles/designTokens';

export default function Certificates() {

  const stats = [

    {
      title: 'Certificates Completed',
      value: '1,284',
      icon: CheckCircle2,
      color: '#22c55e',
      growth: '+18%',
    },

    {
      title: 'Ongoing Certifications',
      value: '342',
      icon: Clock3,
      color: '#f59e0b',
      growth: '+12%',
    },

    {
      title: 'Certificates Downloaded',
      value: '4.9k',
      icon: Download,
      color: '#06b6d4',
      growth: '+28%',
    },

    {
      title: 'Top Rated Students',
      value: '89',
      icon: Trophy,
      color: '#8b5cf6',
      growth: '+9%',
    },

  ];

  const recentCertificates = [

    {
      student: 'Riya Sharma',
      course: 'Machine Learning',
      status: 'Completed',
      grade: 'A+',
    },

    {
      student: 'Aditya Verma',
      course: 'Full Stack Development',
      status: 'Completed',
      grade: 'A',
    },

    {
      student: 'Sneha Iyer',
      course: 'UI/UX Design',
      status: 'Ongoing',
      grade: '--',
    },

    {
      student: 'Karan Patel',
      course: 'Artificial Intelligence',
      status: 'Completed',
      grade: 'A+',
    },

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
              Certificates Center 🏆
            </h1>

            <p
              className="text-lg"
              style={{
                color: colors.textSecondary,
              }}
            >
              Track completed certificates,
              ongoing certifications and student achievements.
            </p>

          </div>

          {/* LIVE */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
            className="px-6 py-4 rounded-2xl border flex items-center gap-3"
            style={{
              backgroundColor: colors.surface,
              borderColor: 'rgba(255,255,255,0.08)',
            }}
          >

            <div className="w-3 h-3 bg-green-500 rounded-full"></div>

            <span className="font-semibold">
              Certification System Active
            </span>

          </motion.div>

        </motion.div>

        {/* STATS */}
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

                  <div
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

                  </div>

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

        {/* MAIN GRID */}
        <div className="grid xl:grid-cols-3 gap-6 mb-10">

          {/* LEFT */}
          <div className="xl:col-span-2 space-y-6">

            {/* RECENT CERTIFICATES */}
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="rounded-[2.5rem] p-8 border"
              style={{
                backgroundColor: colors.surface,
                borderColor: 'rgba(255,255,255,0.08)',
                boxShadow: shadows.lg,
              }}
            >

              <div className="flex items-center justify-between mb-8">

                <div>

                  <h2 className="text-3xl font-bold mb-2">
                    Recent Certificates
                  </h2>

                  <p
                    style={{
                      color: colors.textSecondary,
                    }}
                  >
                    Latest student certification activity
                  </p>

                </div>

                <FileBadge
                  className="w-8 h-8"
                  style={{
                    color: colors.primary,
                  }}
                />

              </div>

              <div className="space-y-5">

                {recentCertificates.map((item, index) => (

                  <motion.div
                    key={index}
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

                    <div>

                      <h3 className="text-xl font-bold mb-1">
                        {item.student}
                      </h3>

                      <p
                        style={{
                          color: colors.textSecondary,
                        }}
                      >
                        {item.course}
                      </p>

                    </div>

                    <div className="text-right">

                      <div
                        className="px-4 py-2 rounded-xl text-sm font-bold mb-2"
                        style={{
                          backgroundColor:
                            item.status === 'Completed'
                              ? 'rgba(34,197,94,0.15)'
                              : 'rgba(245,158,11,0.15)',

                          color:
                            item.status === 'Completed'
                              ? '#22c55e'
                              : '#f59e0b',
                        }}
                      >

                        {item.status}

                      </div>

                      <p
                        style={{
                          color: colors.textSecondary,
                        }}
                      >
                        Grade: {item.grade}
                      </p>

                    </div>

                  </motion.div>

                ))}

              </div>

            </motion.div>

            {/* ACHIEVEMENT BAR */}
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="rounded-[2.5rem] p-8 border relative overflow-hidden"
              style={{
                backgroundColor: colors.surface,
                borderColor: 'rgba(255,255,255,0.08)',
                boxShadow: shadows.lg,
              }}
            >

              <div
                className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-10"
                style={{
                  background:
                    'linear-gradient(135deg,#14b8a6,#f97316)',
                }}
              ></div>

              <div className="flex items-center justify-between mb-8">

                <div>

                  <h2 className="text-3xl font-bold mb-2">
                    Certification Success
                  </h2>

                  <p
                    style={{
                      color: colors.textSecondary,
                    }}
                  >
                    Overall platform achievement rate
                  </p>

                </div>

                <Star
                  className="w-8 h-8"
                  style={{
                    color: '#facc15',
                  }}
                />

              </div>

              <div className="space-y-6">

                {[
                  {
                    label: 'Machine Learning',
                    value: '92%',
                  },

                  {
                    label: 'Full Stack',
                    value: '86%',
                  },

                  {
                    label: 'UI/UX Design',
                    value: '78%',
                  },

                  {
                    label: 'Artificial Intelligence',
                    value: '95%',
                  },

                ].map((item, i) => (

                  <div key={i}>

                    <div className="flex justify-between mb-2">

                      <span className="font-semibold">
                        {item.label}
                      </span>

                      <span
                        style={{
                          color: colors.textSecondary,
                        }}
                      >
                        {item.value}
                      </span>

                    </div>

                    <div
                      className="w-full h-4 rounded-full overflow-hidden"
                      style={{
                        backgroundColor:
                          'rgba(255,255,255,0.08)',
                      }}
                    >

                      <motion.div
                        initial={{
                          width: 0,
                        }}
                        animate={{
                          width: item.value,
                        }}
                        transition={{
                          duration: 1,
                          delay: i * 0.2,
                        }}
                        className="h-full rounded-full"
                        style={{
                          background:
                            'linear-gradient(90deg,#14b8a6,#f97316)',
                        }}
                      ></motion.div>

                    </div>

                  </div>

                ))}

              </div>

            </motion.div>

          </div>

          {/* RIGHT */}
          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            className="rounded-[2.5rem] p-8 border relative overflow-hidden"
            style={{
              backgroundColor: colors.surface,
              borderColor: 'rgba(255,255,255,0.08)',
              boxShadow: shadows.lg,
            }}
          >

            <div
              className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-10"
              style={{
                background:
                  'linear-gradient(135deg,#8b5cf6,#14b8a6)',
              }}
            ></div>

            <div className="flex items-center gap-3 mb-10">

              <ShieldCheck
                className="w-8 h-8"
                style={{
                  color: '#14b8a6',
                }}
              />

              <h2 className="text-3xl font-bold">
                Platform Rank
              </h2>

            </div>

            <div className="flex items-center justify-center mb-10">

              
              

                <div className="text-center">

                  <h1 className="text-6xl font-bold mb-3">
                    96%
                  </h1>

                  <p
                    style={{
                      color: colors.textSecondary,
                    }}
                  >
                    Certification Accuracy
                  </p>

                </div>


            </div>

            <div className="space-y-5">

              {[
                'Certificates verified successfully',
                'AI grading system active',
                'Fraud detection enabled',
                'Blockchain validation integrated',
              ].map((item, i) => (

                <motion.div
                  key={i}
                  whileHover={{
                    x: 8,
                  }}
                  className="p-4 rounded-2xl border flex items-center justify-between"
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

        </div>

      </main>

    </div>
  );
}