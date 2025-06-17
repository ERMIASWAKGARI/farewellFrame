// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

const NotFound = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-background overflow-hidden px-6 text-center">
      {/* Background glow blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary rounded-full blur-[100px] opacity-20 animate-pulse -z-10" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-secondary rounded-full blur-[100px] opacity-20 animate-pulse -z-10" />

      {/* 🔥 Animated SVG */}
      <motion.img
        src="/404-error-animate.svg"
        alt="404 Not Found"
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="w-64 mb-6 drop-shadow-xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-md"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-text-primary mb-8"
        >
          The page you’re looking for drifted into another galaxy.
        </motion.p>
      </motion.div>
    </div>
  )
}

export default NotFound
