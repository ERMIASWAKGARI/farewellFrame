// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const quotes = [
  'The tassel was worth the hassle.',
  'Goodbye classes, hello real world.',
  'Memories made here will last forever.',
  'We came, we saw, we graduated.',
  'Onward and upward!',
]

// Using plain constants instead of enum
const TYPING = 'typing'
const PAUSING = 'pausing'
const DELETING = 'deleting'

const TypewriterQuote = () => {
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [phase, setPhase] = useState(TYPING)

  useEffect(() => {
    const currentQuote = quotes[quoteIndex]

    if (phase === TYPING) {
      if (displayedText.length < currentQuote.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentQuote.slice(0, displayedText.length + 1))
        }, 60)
        return () => clearTimeout(timeout)
      } else {
        const timeout = setTimeout(() => setPhase(PAUSING), 2000)
        return () => clearTimeout(timeout)
      }
    }

    if (phase === PAUSING) {
      const timeout = setTimeout(() => setPhase(DELETING), 1000)
      return () => clearTimeout(timeout)
    }

    if (phase === DELETING) {
      if (displayedText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, -1))
        }, 40)
        return () => clearTimeout(timeout)
      } else {
        setQuoteIndex((prev) => (prev + 1) % quotes.length)
        setPhase(TYPING)
      }
    }
  }, [displayedText, phase, quoteIndex])

  return (
    <motion.p
      className="mt-6 text-text-secondary max-w-2xl text-base sm:text-lg md:text-xl italic min-h-[2.5rem]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 1 }}
    >
      {displayedText}
      <span className="animate-pulse">|</span>
    </motion.p>
  )
}

export default TypewriterQuote
