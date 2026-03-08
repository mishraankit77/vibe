import { motion } from "framer-motion"

export default function AuroraBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">

      <motion.div
        animate={{
          x: [0, 100, -100, 0],
          y: [0, -80, 80, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute w-[700px] h-[700px] bg-purple-600/30 blur-[160px] rounded-full top-[-200px] left-[-200px]"
      />

      <motion.div
        animate={{
          x: [0, -120, 120, 0],
          y: [0, 100, -100, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute w-[600px] h-[600px] bg-blue-600/30 blur-[150px] rounded-full bottom-[-200px] right-[-200px]"
      />

    </div>
  )
}