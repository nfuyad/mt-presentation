import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Reveal, EASE } from '../components/Reveal'
import { useReduced } from '../components/motionPrefs'
import { ROVER } from '../content/facts'
import { ACTS, RoverScene } from './RoverScene'

/* What Taurus is for, played rather than listed: it drives itself to an astronaut,
   hands over a tool, runs the science where it stands, and does all of it on a link
   from three kilometres away. The general arrangement drawing sits beside the
   sequence so the audience can see the machine the animation is describing. */

const EVERY = 4200

export function S03Rover() {
  const reduced = useReduced()
  const [act, setAct] = useState(reduced ? 1 : 0)

  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => setAct((a) => (a + 1) % ACTS.length), EVERY)
    return () => window.clearInterval(id)
  }, [reduced])

  return (
    <div className="slide__inner">
      <Reveal className="abs" style={{ left: 0, top: 0, width: 900 }}>
        <h2 className="heading">{ROVER.name}</h2>
        <p className="lead" style={{ marginTop: 10, color: 'var(--ink-2)' }}>
          An astronaut-assisting rover · {ROVER.mass} · {ROVER.envelope}
        </p>
      </Reveal>

      {/* the drawing of the machine, straight on the sheet */}
      <motion.img
        className="abs drawing"
        src="./img/rover-cad.png"
        alt="Annotated CAD drawing of the Taurus rover"
        style={{ left: 0, top: 176, width: 520, height: 470, objectFit: 'contain' }}
        initial={{ opacity: reduced ? 0.92 : 0, scale: reduced ? 1 : 1.03 }}
        animate={{ opacity: 0.92, scale: 1 }}
        transition={{ duration: reduced ? 0 : 1, ease: [0.2, 0.7, 0.25, 1], delay: reduced ? 0 : 0.14 }}
      />

      {/* the sequence */}
      <Reveal delay={0.08} y={0} className="abs" style={{ left: 590, top: 150, width: 1138, height: 442 }}>
        <RoverScene act={act} />
      </Reveal>

      <div className="abs" style={{ left: 590, top: 612, width: 1138 }}>
        <motion.p key={act} className="lead" style={{ fontWeight: 500, minHeight: 92 }} initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}>
          {ACTS[act].line}
        </motion.p>
      </div>

      {/* the four things it does, lighting up in turn */}
      <div className="abs" style={{ left: 590, top: 716, width: 1138, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28 }}>
        {ACTS.map((a, i) => (
          <Reveal key={a.id} delay={0.2 + i * 0.07}>
            <motion.div
              className="act"
              animate={{ color: i === act ? 'rgb(232, 39, 39)' : 'rgb(168, 119, 106)' }}
              transition={{ duration: reduced ? 0 : 0.3, ease: EASE }}
            >
              <motion.span
                className="act__bar"
                animate={{ backgroundColor: i === act ? 'rgb(232, 39, 39)' : 'rgb(233, 195, 159)', scaleY: i === act ? 1 : 0.5 }}
                transition={{ duration: reduced ? 0 : 0.3, ease: EASE }}
                style={{ transformOrigin: 'center top' }}
              />
              {a.label}
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
