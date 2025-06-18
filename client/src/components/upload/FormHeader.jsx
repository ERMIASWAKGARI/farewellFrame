// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

const FormHeader = () => (
  <div className="text-center my-10">
    <motion.h1
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
      className="text-3xl sm:text-4xl font-extrabold text-primary"
    >
      Share Your Farewell Message
    </motion.h1>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
      className="mt-4 text-lg text-text-secondary"
    >
      Leave your mark before you graduate! Share your story, wisdom, and
      memories.
    </motion.p>
  </div>
)

export default FormHeader
