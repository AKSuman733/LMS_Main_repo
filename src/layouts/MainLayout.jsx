import { Outlet } from "react-router-dom";

import { motion } from "framer-motion";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

import {
  colors,
  shadows,
} from "../styles/designTokens";

function MainLayout() {

  return (

    <div
      className="
        relative

        flex
        min-h-screen
        flex-col

        overflow-hidden

        bg-[var(--color-background)]

        text-white
      "
    >

      {/* ================= GLOBAL BACKGROUND ================= */}

      {/* ================= TOP LEFT GLOW ================= */}

      <div
        className="
          pointer-events-none

          fixed
          left-[-100px]
          top-[-140px]

          h-[320px]
          w-[320px]

          rounded-full

          bg-[var(--color-secondary)]/10

          blur-[110px]
        "
      />

      {/* ================= TOP RIGHT GLOW ================= */}

      <div
        className="
          pointer-events-none

          fixed
          right-[-120px]
          top-[100px]

          h-[300px]
          w-[300px]

          rounded-full

          bg-purple-500/10

          blur-[110px]
        "
      />

      {/* ================= BOTTOM GLOW ================= */}

      <div
        className="
          pointer-events-none

          fixed
          bottom-[-140px]
          left-[30%]

          h-[340px]
          w-[340px]

          rounded-full

          bg-[var(--color-primary)]/10

          blur-[110px]
        "
      />

      {/* ================= GRID EFFECT ================= */}

      <div
        className="
          pointer-events-none

          fixed inset-0

          opacity-[0.02]
        "

        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(255,255,255,0.08) 1px,
              transparent 1px
            ),

            linear-gradient(
              to bottom,
              rgba(255,255,255,0.08) 1px,
              transparent 1px
            )
          `,

          backgroundSize:
            "90px 90px",
        }}
      />

      {/* ================= FLOATING PARTICLES ================= */}

      <motion.div
        animate={{
          y: [0, -12, 0],
        }}

        transition={{
          duration: 6,
          repeat: Infinity,
        }}

        className="
          pointer-events-none

          fixed
          left-[8%]
          top-[20%]

          h-2.5
          w-2.5

          rounded-full

          bg-[var(--color-secondary)]

          shadow-[var(--shadow-teal)]

          blur-sm
        "
      />

      <motion.div
        animate={{
          y: [0, 15, 0],
        }}

        transition={{
          duration: 8,
          repeat: Infinity,
        }}

        className="
          pointer-events-none

          fixed
          right-[12%]
          top-[65%]

          h-3
          w-3

          rounded-full

          bg-[var(--color-primary)]

          blur-sm
        "
      />

      <motion.div
        animate={{
          y: [0, -10, 0],
        }}

        transition={{
          duration: 7,
          repeat: Infinity,
        }}

        className="
          pointer-events-none

          fixed
          bottom-[18%]
          left-[18%]

          h-2
          w-2

          rounded-full

          bg-blue-400

          blur-sm
        "
      />

      {/* ================= NAVBAR ================= */}

      <div className="relative z-50">

        <Navbar />

      </div>

      {/* ================= MAIN CONTENT ================= */}

      <main
        className="
          relative z-10

          flex-1
        "
      >

        <motion.div
          initial={{
            opacity: 0,
            y: 12,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.4,
          }}
        >

          <Outlet />

        </motion.div>

      </main>

      {/* ================= FOOTER ================= */}

      <div className="relative z-10">

        <Footer />

      </div>

    </div>
  );
}

export default MainLayout;