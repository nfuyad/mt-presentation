import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { motion } from 'motion/react'
import { Reveal, EASE } from '../components/Reveal'
import { Logo } from '../components/Logo'
import { useReduced } from '../components/motionPrefs'
import { JOIN_URL } from '../content/deck'

/* Two closes, back to back — the school-visit sign-off and the astronaut close,
   each too good to cut. The slide opens on the first, holds, then crosses into
   the second and settles there: same paper-on-photo treatment and the same
   deck-native motion (Reveal, wipe-in statement, QR pulse) both closes already
   shared, just sequenced instead of chosen between. Reduced motion skips
   straight to the second — the one the QR and the standing statement live on. */

const SCHOOL_LINES = ['Come and ask', 'us anything']
const CLOSE_LINES = ['Come and break', 'things with us.']
const QR = 220
const PAD = 14
const HOLD_MS = 4600
const CROSS_S = 0.9

export function S14Close() {
  const reduced = useReduced()
  const [showFinal, setShowFinal] = useState(false)
  const rise = [0.2, 0.7, 0.25, 1] as const

  useEffect(() => {
    if (reduced) {
      setShowFinal(true)
      return
    }
    const id = window.setTimeout(() => setShowFinal(true), HOLD_MS)
    return () => window.clearTimeout(id)
  }, [reduced])

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {!showFinal && (
        <div style={{ position: 'absolute', inset: 0 }}>
          <motion.img
            src="./img/school-visit-close.jpg"
            alt="A young visitor with a Mongol-Tori rover controller in her hands, flanked by two team members"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 22%' }}
            initial={{ opacity: 0, scale: 1.045 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: rise }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(24,12,9,0.88) 0%, rgba(24,12,9,0.74) 30%, rgba(24,12,9,0.32) 56%, rgba(24,12,9,0) 76%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(24,12,9,0.6) 0%, rgba(24,12,9,0) 26%)' }} />

          <Reveal className="abs lockup" style={{ left: 96, top: 84, color: 'var(--paper)' }}>
            <Logo width={100} />
            <span className="lockup__rule" style={{ background: 'rgba(255,251,247,0.3)' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontFamily: 'var(--bangla)', fontSize: 22, color: 'var(--paper)' }}>মঙ্গল তরী</span>
              <span className="small" style={{ fontSize: 15, color: 'rgba(255,251,247,0.6)' }}>Mars Chariot</span>
            </div>
          </Reveal>

          <div className="abs" style={{ left: 96, top: 300, width: 900 }}>
            {SCHOOL_LINES.map((line, i) => (
              <motion.span
                key={line}
                className="statement"
                style={{ display: 'block', fontSize: 88, lineHeight: 0.98, color: 'var(--paper)' }}
                initial={{ clipPath: 'inset(0 100% 0 0)', y: 12 }}
                animate={{ clipPath: 'inset(0 0 0 0)', y: 0 }}
                transition={{ duration: 0.75, delay: 0.3 + i * 0.24, ease: EASE }}
              >
                {line}
              </motion.span>
            ))}
            <Reveal delay={1.0}>
              <p className="lead" style={{ marginTop: 24, color: 'rgba(255,251,247,0.84)', maxWidth: 560, fontSize: 26 }}>
                What broke, what it cost, how you join a team, whether we have ever set something on fire. <em style={{ fontStyle: 'normal', color: 'var(--orange)' }}>Yes.</em>
              </p>
            </Reveal>
            <Reveal delay={1.2}>
              <p style={{ fontFamily: 'var(--bangla)', fontSize: 28, color: 'var(--orange)', marginTop: 14 }}>তুমিও পারবে</p>
            </Reveal>
            <Reveal delay={1.35}>
              <p className="small" style={{ marginTop: 18, color: 'rgba(255,251,247,0.6)' }}>Somebody let us touch a robot once — that is the only reason we are here.</p>
            </Reveal>
          </div>
        </div>
      )}

      <motion.div
        key="astronaut"
        style={{ position: 'absolute', inset: 0 }}
        initial={{ opacity: reduced ? 1 : 0 }}
        animate={{ opacity: showFinal ? 1 : 0 }}
        transition={{ duration: CROSS_S, ease: 'easeInOut' }}
      >
        {/* The whole picture, uncropped — its own marks sit in the top corners, so the
            slow push-in is anchored to the top-right and that corner never moves. */}
        <motion.div
          style={{ position: 'absolute', inset: 0, transformOrigin: '100% 0%' }}
          initial={{ scale: 1 }}
          animate={{ scale: reduced ? 1 : 1.045 }}
          transition={{ duration: 28, ease: 'easeOut' }}
        >
          <motion.img
            src="./img/final.jpg"
            alt="An astronaut on stage, arms wide, in front of a full auditorium"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
            initial={{ opacity: reduced ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduced ? 0 : 1.1, delay: reduced ? 0 : HOLD_MS / 1000, ease: rise }}
          />
        </motion.div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(24,12,9,0.9) 0%, rgba(24,12,9,0.8) 26%, rgba(24,12,9,0.42) 46%, rgba(24,12,9,0) 62%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(24,12,9,0.7) 0%, rgba(24,12,9,0) 30%)' }} />
        {/* a lighter wash on the right, under the QR and its label */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(270deg, rgba(24,12,9,0.62) 0%, rgba(24,12,9,0.28) 22%, rgba(24,12,9,0) 40%)' }} />

        {/* the statement, one line at a time */}
        <div className="abs" style={{ left: 96, top: 196, width: 900 }}>
          {CLOSE_LINES.map((line, i) => (
            <motion.span
              key={line}
              className="statement"
              style={{ display: 'block', fontSize: 92, lineHeight: 0.98, color: 'var(--paper)' }}
              initial={{ clipPath: reduced ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)', y: reduced ? 0 : 12 }}
              animate={{ clipPath: 'inset(0 0 0 0)', y: 0 }}
              transition={{ duration: reduced ? 0 : 0.75, delay: reduced ? 0 : HOLD_MS / 1000 + 0.3 + i * 0.24, ease: EASE }}
            >
              {line}
            </motion.span>
          ))}
          <Reveal delay={reduced ? 0 : HOLD_MS / 1000 + 1.0}>
            <p className="lead" style={{ marginTop: 28, color: 'rgba(255,251,247,0.84)', maxWidth: 560 }}>
              Join the journey of future exploration. Build your dream and solve problems with us,
              and be part of the next generation of space robotics.
            </p>
          </Reveal>
          <Reveal delay={reduced ? 0 : HOLD_MS / 1000 + 1.15}>
            <p className="small" style={{ marginTop: 20, color: 'rgba(255,251,247,0.6)', letterSpacing: '0.02em' }}>
              25th Anniversary of BRAC University
            </p>
          </Reveal>
        </div>

        {/* the QR: it scans itself in, then its corners keep a slow pulse */}
        <Reveal delay={reduced ? 0 : HOLD_MS / 1000 + 1.25} className="abs" style={{ right: 96, top: 596, display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', gap: 32, textAlign: 'right' }}>
          <a
            href={JOIN_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Open the Mongol-Tori join page"
            style={{ position: 'relative', display: 'block', padding: PAD, background: '#fff', borderRadius: 20, border: '3px solid rgba(255,255,255,0.45)', lineHeight: 0, pointerEvents: showFinal ? 'auto' : 'none' }}
          >
            <QRCodeSVG value={JOIN_URL} size={QR} bgColor="#ffffff" fgColor="#3b1c14" level="M" />
            {!reduced && (
              <>
                <motion.span
                  aria-hidden="true"
                  style={{ position: 'absolute', left: PAD, right: PAD, height: 3, borderRadius: 2, background: 'var(--red)' }}
                  initial={{ top: PAD, opacity: 0 }}
                  animate={{ top: [PAD, PAD + QR, PAD + QR], opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, delay: HOLD_MS / 1000 + 1.7, ease: 'easeInOut' }}
                />
                <motion.svg
                  aria-hidden="true"
                  viewBox="0 0 100 100"
                  style={{ position: 'absolute', inset: -12, width: 'calc(100% + 24px)', height: 'calc(100% + 24px)', transformOrigin: 'center' }}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: [0, 0.95, 0.45, 0.95], scale: [0.96, 1, 1.03, 1] }}
                  transition={{ duration: 2.2, delay: HOLD_MS / 1000 + 3.2, repeat: Infinity, repeatDelay: 1.6, ease: 'easeInOut' }}
                >
                  <path d="M2 18 V2 H18 M82 2 H98 V18 M98 82 V98 H82 M18 98 H2 V82" fill="none" stroke="var(--red)" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                </motion.svg>
              </>
            )}
          </a>
          <div>
            <p className="lead" style={{ fontWeight: 500, color: 'var(--paper)' }}>Scan to join</p>
            <p className="small" style={{ marginTop: 6, fontSize: 22, color: 'rgba(255,251,247,0.72)' }}>{JOIN_URL.replace(/^https?:\/\//, '')}</p>
          </div>
        </Reveal>
      </motion.div>
    </div>
  )
}
