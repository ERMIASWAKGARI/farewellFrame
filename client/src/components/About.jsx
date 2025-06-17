// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { GraduationCap, Quote, ScrollText, Sparkles } from 'lucide-react'

const About = () => {
  return (
    <section className="relative max-w-6xl mx-auto px-4 py-16 sm:py-24">
      {/* Floating background elements */}
      <motion.div
        className="absolute -top-20 -left-20 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl"
        animate={{
          x: [0, 20, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute -bottom-10 -right-10 w-72 h-72 bg-orange-400/15 rounded-full blur-3xl"
        animate={{
          x: [0, -20, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      <div className="relative bg-background/80 backdrop-blur-sm border border-border rounded-2xl shadow-2xl overflow-hidden">
        {/* Decorative border animation */}
        <div className="absolute inset-0 border-2 border-transparent animate-border-pulse rounded-2xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 md:p-12">
          {/* Text content */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-primary mb-6 flex items-center gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <ScrollText className="w-8 h-8" />
              The Digital Farewell
            </motion.h2>

            <motion.div
              className="space-y-4 text-text-secondary"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <p className="flex items-start gap-2">
                <Quote className="w-5 h-5 mt-1 flex-shrink-0 text-primary/60" />
                <span>
                  Where campus walls meet digital memories. Share your final
                  words, roasts, and wisdom without the paper cuts.
                </span>
              </p>

              <p className="flex items-start gap-2">
                <Quote className="w-5 h-5 mt-1 flex-shrink-0 text-primary/60" />
                <span>
                  A pixel-perfect tribute to your journey. Laugh, cry, and
                  connect one last time before the real world hits.
                </span>
              </p>
            </motion.div>
          </motion.div>

          {/* Animated graduation cap */}
          <motion.div
            className="flex items-center justify-center relative"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <div className="relative w-64 h-64">
              {/* Cap shadow */}
              <motion.div
                className="absolute bottom-0 left-1/2 w-3/4 h-4 bg-black/10 blur-md rounded-full -translate-x-1/2"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.8, 0.6, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Floating cap */}
              <motion.div
                className="relative z-10"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <GraduationCap className="w-full h-full text-primary" />
              </motion.div>

              {/* Floating particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-0 left-0 w-2 h-2 rounded-full bg-primary/80"
                  initial={{ opacity: 0 }}
                  animate={{
                    x: [0, Math.random() * 100 - 50],
                    y: [0, Math.random() * 100 - 50],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 3,
                    delay: Math.random() * 2,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 5,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
        {/* Animated scrolling tags */}
        <div className="overflow-hidden relative h-10">
          <motion.div
            className="absolute whitespace-nowrap flex gap-4 will-change-transform"
            animate={{ x: ['0%', '-100%'] }}
            transition={{
              duration: 50,
              ease: 'linear',
              repeat: Infinity,
              repeatType: 'loop', // ✅ Add this
            }}
          >
            {Array(1)
              .fill([
                '#DigitalGoodbye',
                '#WeMadeIt',
                '#OneLastPost',
                '#GradVibes',
                '#BittersweetExit',
                '#FromBooksToBills',
                '#SignOutNotSignedOff',
                '#CapsOff',
                '#ScrollOut',
                '#MemoryLane',
                '#FarewellFiesta',
                '#LastLaugh',
                '#GradGoals',
                '#NoMoreExams',
                '#AlumniAlert',
                '#OnwardAndUpward',
              ])
              .flat()
              .map((tag, i) => (
                <span
                  key={i}
                  className="text-sm font-medium px-3 py-1 bg-primary/10 text-primary rounded-full shrink-0"
                >
                  {tag}
                </span>
              ))}
          </motion.div>
        </div>

        {/* Bottom sparkles */}
        <motion.div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Sparkles className="w-16 h-16 text-primary animate-pulse" />
        </motion.div>
      </div>
    </section>
  )
}

export default About
