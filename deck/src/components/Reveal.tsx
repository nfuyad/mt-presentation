import type { CSSProperties, ReactNode } from 'react'
import { motion } from 'motion/react'
import { useReduced } from './motionPrefs'

/* Entering elements fade in where they will sit. They do not rise into place: the
   same slide-up on every block is what makes a deck look generated. The `y` prop
   is kept for callers, and only a deliberate travel (over 20px) is honoured. */
export const EASE = [0.22, 1, 0.36, 1] as const

interface Props {
  children: ReactNode
  delay?: number
  y?: number
  scale?: number
  className?: string
  style?: CSSProperties
}

export function Reveal({ children, delay = 0, y = 14, scale = 1, className, style }: Props) {
  const reduced = useReduced()
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: reduced || y <= 20 ? 0 : y, scale: reduced ? 1 : scale }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: reduced ? 0 : 0.4, ease: EASE, delay: reduced ? 0 : delay }}
    >
      {children}
    </motion.div>
  )
}
