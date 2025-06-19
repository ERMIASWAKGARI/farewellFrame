// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { BsFillSendFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import TypewriterQuote from './TypewriterQuote'

const messages = [
  {
    name: 'Amanuel T.',
    photo: '/DSC_3312.jpg',
    message: 'Never forget the night we camped by the labs!',
  },
  {
    name: 'Selam M.',
    photo: 'photo_2025-05-23_16-21-39.jpg',
    message: 'Cheers to the sleepless thesis nights! ❤️',
  },
  {
    name: 'Abdi Y.',
    photo: '/ecommerce1.png',
    message: 'So long, Room 205. You were noisy but home.',
  },
]

const floatVariants = {
  animate: (delay = 0) => ({
    y: [0, -20, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      y: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      },
      rotate: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      },
    },
  }),
}

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center text-center 
             px-4 sm:px-6 lg:px-12 
             pt-16
             bg-background"
    >
      {' '}
      {/* 🌈 Background Floating SVGs */}
      <motion.img
        src="/graduation-hats-animate.svg"
        alt="floating cap"
        className="absolute top-10 left-10 w-28 sm:w-36 md:w-40 opacity-50 z-0"
        variants={floatVariants}
        custom={0}
        animate="animate"
      />
      <motion.img
        src="/graduation-hats-animate (1).svg"
        alt="certificate"
        className="absolute bottom-20 right-16 w-24 sm:w-32 md:w-36 opacity-60 z-0"
        variants={floatVariants}
        custom={1}
        animate="animate"
      />
      <motion.img
        src="/graduation-hats-animate (2).svg"
        alt="confetti"
        className="absolute top-[30%] left-[45%] w-16 sm:w-24 md:w-28 opacity-40 z-0"
        variants={floatVariants}
        custom={2}
        animate="animate"
      />
      {/* 🧠 Main Content */}
      <div className="z-10 max-w-5xl w-full flex flex-col items-center justify-center">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-text-primary leading-tight drop-shadow-md"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          🎓 Celebrate the Memories
        </motion.h1>

        <TypewriterQuote />

        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <Link
            to="/upload"
            className="px-6 py-3 text-sm sm:text-base font-medium rounded-md bg-button hover:bg-primary/90 dark:hover:bg-primary/90 text-text-primary transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <BsFillSendFill /> Upload Your Farewell
          </Link>
          <Link
            to="/#gallery"
            className="px-6 py-3 text-sm sm:text-base font-medium rounded-md border border-border text-text-primary hover:bg-primary/10 transition-all shadow-sm"
          >
            Browse Gallery
          </Link>
        </div>
      </div>
      {/* 💌 Floating Message Card */}
      <div className="z-10 mt-20 w-full flex justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -40 },
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.6 }}
            className="relative bg-white/80 dark:bg-gray-800/90 backdrop-blur-md shadow-xl border border-border rounded-2xl px-6 py-4 w-[90%] max-w-md"
          >
            <div className="absolute -inset-1 rounded-2xl border-2 border-dashed border-primary pointer-events-none animate-pulse opacity-10" />

            <div className="flex items-center gap-4">
              <img
                src={messages[currentIndex].photo}
                alt={messages[currentIndex].name}
                className="w-14 h-14 rounded-full object-cover border-2 border-border shadow-sm"
              />
              <div>
                <p className="text-sm font-semibold text-text-primary">
                  {messages[currentIndex].name}
                </p>
                <p className="text-xs text-text-secondary mt-1">
                  {messages[currentIndex].message}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default HeroSection
