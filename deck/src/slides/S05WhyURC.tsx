import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useReduced } from '../components/motionPrefs'
import { Reveal, EASE } from '../components/Reveal'
import { ENTRANTS, JFK, TIMELINE, URC } from '../content/facts'

/* The season, stop by stop — the two dates the Mars Society publishes and the
   three stages you have to survive to get to them. */
function Timeline() {
  return (
    <div className="timeline">
      {TIMELINE.map((m, i) => (
        <Reveal key={m.label} delay={0.36 + i * 0.1} y={8} className={`timeline__stop ${m.hard ? 'timeline__stop--hard' : ''}`}>
          <p className="timeline__when">{m.when}</p>
          <p className="timeline__label">{m.label}</p>
          <p className="timeline__detail">{m.detail}</p>
        </Reveal>
      ))}
    </div>
  )
}

/* The whole field: all 116, eighteen at a time, in the country order the Mars
   Society lists them. The pages dissolve through in about half a minute, so
   every name is on the sheet while the slide is up — and none of it moves
   while you are trying to read it. */
const PAGE = 18
const PAGE_EVERY = 5200

function Roster() {
  const reduced = useReduced()
  const pages = useMemo(() => Array.from({ length: Math.ceil(ENTRANTS.length / PAGE) }, (_, k) => ENTRANTS.slice(k * PAGE, (k + 1) * PAGE)), [])
  const [page, setPage] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => setPage((v) => (v + 1) % pages.length), PAGE_EVERY)
    return () => window.clearInterval(id)
  }, [reduced, pages.length])

  return (
    <div className="roster" aria-label={`All ${ENTRANTS.length} teams that entered`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={page}
          className="roster__grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.3, ease: EASE }}
        >
          {pages[page].map((e, k) => (
            <motion.span
              key={e.team}
              className={`roster__item ${e.finalist ? 'roster__item--final' : ''}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : k * 0.022, ease: EASE }}
            >
              <b>{e.team}</b> · {e.uni}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
      <div className="roster__pages" aria-hidden="true">
        {pages.map((_, k) => (
          <span key={k} className={`roster__dot ${k === page ? 'roster__dot--on' : ''}`} />
        ))}
        <span className="roster__count">
          {page + 1} / {pages.length}
        </span>
      </div>
    </div>
  )
}

export function S05WhyURC() {
  return (
    <div className="slide__inner">
      {/* the question as a side head, the answer as the quotation it is */}
      <Reveal className="abs" style={{ left: 0, top: 0, width: 1728, display: 'grid', gridTemplateColumns: '430px 1fr', columnGap: 28, alignItems: 'baseline' }}>
        <p className="heading" style={{ fontSize: 40, color: 'var(--ink-2)', whiteSpace: 'nowrap' }}>Why the hardest one?</p>
        <div>
          <blockquote className="quote" style={{ fontSize: 40, maxWidth: 1270 }}>{JFK.quote}</blockquote>
          <p className="small" style={{ marginTop: 12 }}>
            {JFK.who} · {JFK.where}
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.18} className="abs" style={{ left: 0, top: 226, width: 960 }}>
        <p className="lead" style={{ fontWeight: 500 }}>
          We chose the University Rover Challenge as our benchmark for exactly that reason. {URC.teams} teams enter. {URC.finalists} reach
          the <b>Mars Desert Research Station</b>
        </p>
      </Reveal>

      <div className="abs" style={{ left: 0, top: 396, width: 1728 }}>
        <Reveal delay={0.3} className="small" style={{ marginBottom: 6 }}>
          The season
        </Reveal>
        <Timeline />
      </div>

      <Reveal delay={0.6} y={0} className="abs" style={{ left: 0, top: 586, width: 1728 }}>
        <p className="small" style={{ marginBottom: 8 }}>
          All {URC.teams} teams that entered · {URC.countries} countries
        </p>
        <Roster />
      </Reveal>
    </div>
  )
}
