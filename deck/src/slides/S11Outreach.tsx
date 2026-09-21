import { Reveal } from '../components/Reveal'
import { Frame } from '../components/Frame'
import { Odometer } from '../components/Odometer'
import { OUTREACH } from '../content/facts'

const PHOTOS = [
  { src: 'outreach-vnsc.jpg', alt: 'School students around the rover' },
  { src: 'outreach-hypersonic.jpg', alt: 'A student trying the rover arm', pos: 'center 30%' },
  { src: 'auditorium.jpg', alt: 'A full auditorium at an outreach talk' },
  { src: 'emk-presentation.jpg', alt: 'Presenting at the EMK Center' },
]

/* Achievements do not come from working alone: the outreach half of the year. */
export function S11Outreach() {
  return (
    <div className="slide__inner">
      <Reveal className="abs" style={{ left: 0, top: 0, width: 1200 }}>
        <h2 className="heading">We also build future engineers!</h2>
      </Reveal>

      {/* the count, set large on the sheet, and what it counts */}
      <Reveal delay={0.1} className="abs" style={{ left: 0, top: 130, width: 620 }}>
        <Odometer className="bignum" value={OUTREACH.institutions} suffix="+" size={168} delay={0.35} style={{ display: 'flex' }} />
        <p className="lead" style={{ fontWeight: 500, lineHeight: 1.2, marginTop: 14 }}>schools and colleges across Bangladesh</p>
        <p className="small" style={{ marginTop: 8, fontSize: 24 }}>STEM sessions in the past {OUTREACH.years} years</p>
      </Reveal>

      <Reveal delay={0.2} className="abs ruled" style={{ left: 0, top: 486, width: 600 }}>
        <p className="body" style={{ color: 'var(--ink-2)' }}>
          And we mentor school teams into{' '}
          {OUTREACH.mentors.map((m, i) => (
            <span key={m}>
              {i > 0 && (i === OUTREACH.mentors.length - 1 ? ' and ' : ', ')}
              <b style={{ fontWeight: 600, color: 'var(--ink)' }}>{m}</b>
            </span>
          ))}
          .
        </p>
        <p className="body" style={{ color: 'var(--ink-2)', marginTop: 18 }}>
          We believe that the next generation of engineers and scientists will be the ones to take humanity to Mars. We are proud to mentor them, and to show them that they can do it too.
        </p>
      </Reveal>

      <Reveal delay={0.06} y={0} scale={0.985} className="abs" style={{ left: 680, top: 90, width: 1048, height: 440 }}>
        <Frame src="outreach.png" alt="MT Outreach" delay={0.06} style={{ width: '100%', height: '100%' }} position="center 52%" />
      </Reveal>

      <div className="abs" style={{ left: 680, top: 560, width: 1048, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
        {PHOTOS.map((p, i) => (
          <Reveal key={p.src} delay={0.3 + i * 0.06} y={10}>
            <Frame src={p.src} alt={p.alt} position={p.pos} delay={0.3 + i * 0.06} style={{ height: 186 }} />
          </Reveal>
        ))}
      </div>
    </div>
  )
}
