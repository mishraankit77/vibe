import { motion } from "framer-motion"

export default function FeatureCard({ title, description }) {
  return (
    <motion.div
      whileHover={{
        rotateX: 5,
        rotateY: -5,
        scale: 1.04
      }}
      transition={{ type: "spring", stiffness: 200 }}
      className="relative rounded-2xl bg-white/5 border border-white/10 p-8 backdrop-blur-xl overflow-hidden"
    >

      {/* gradient glow */}

      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition duration-500 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-xl" />

      <h3 className="text-xl font-semibold mb-3">{title}</h3>

      <p className="text-sm text-zinc-400">
        {description}
      </p>

    </motion.div>
  )
}