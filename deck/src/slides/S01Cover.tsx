import { motion } from 'motion/react'
import { Reveal } from '../components/Reveal'
import { Logo } from '../components/Logo'
import { useReduced } from '../components/motionPrefs'

/* The opening frame: the photograph is the slide. Words go where the desert is
   empty, on a wash of the deck's own paper poured in from the left, set like a
   title page: imprint at the head, title, then the occasion. */
export function S01Cover() {
  const reduced = useReduced()
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <motion.img
        src="./img/taurus-mdrs-2026.jpg"
        alt="Taurus, the 2026 rover, at the Mars Desert Research Station in Utah"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 44%' }}
        initial={{ opacity: reduced ? 1 : 0, scale: reduced ? 1 : 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduced ? 0 : 1.2, ease: [0.2, 0.7, 0.25, 1] }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(255,251,247,0.96) 0%, rgba(255,251,247,0.9) 25%, rgba(255,251,247,0.46) 43%, rgba(255,251,247,0) 62%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(255,251,247,0.8) 0%, rgba(255,251,247,0.46) 10%, rgba(255,251,247,0) 22%)' }} />

      {/* The two marks, top left on the paper wash, where a title page carries its
          imprint. */}
      <Reveal className="abs lockup" style={{ left: 96, top: 84 }}>
        <Logo width={116} />
        <span className="lockup__rule" />
        <img className="lockup__mark" src="./img/bracu-logo.png" alt="BRAC University" />
      </Reveal>

      <Reveal delay={0.1} className="abs" style={{ left: 96, top: 356, width: 920 }}>
        <h1 className="statement" style={{ fontSize: 92, lineHeight: 0.95, letterSpacing: '-0.025em' }}>
          Built by
          <br />
          Dreamers and
          <br />
          Problem Solvers
        </h1>
      </Reveal>
    </div>
  )
}
