import {
  CheckCircle2,
  AlertTriangle,
  Info,
} from "lucide-react";

import { motion } from "framer-motion";

function Toast({

  message,

  type = "success",

}) {

  const icons = {

    success:
      <CheckCircle2 size={18} />,

    error:
      <AlertTriangle size={18} />,

    warning:
      <Info size={18} />,
  };

  const styles = {

    success:
      `
        border-green-500/20
        bg-green-500/10
        text-green-400
      `,

    error:
      `
        border-red-500/20
        bg-red-500/10
        text-red-400
      `,

    warning:
      `
        border-yellow-500/20
        bg-yellow-500/10
        text-yellow-400
      `,
  };

  return (

    <motion.div

      initial={{
        opacity: 0,
        x: 100,
      }}

      animate={{
        opacity: 1,
        x: 0,
      }}

      exit={{
        opacity: 0,
        x: 100,
      }}

      className={`
        fixed
        right-5 top-5
        z-[100]

        flex items-center
        gap-3

        rounded-2xl

        border

        px-5 py-4

        shadow-2xl

        backdrop-blur-xl

        ${styles[type]}
      `}
    >

      {icons[type]}

      <span
        className="
          text-sm
          font-medium
        "
      >

        {message}

      </span>

    </motion.div>
  );
}

export default Toast;