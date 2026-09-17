import { Reveal } from '../components/Reveal'
import { useReduced } from '../components/motionPrefs'
import { COLLABORATION, PARTNERS, PREVIOUS_PARTNER, SPONSORS } from '../content/facts'
import { IndustrialScene } from './IndustrialScene'

/* Industry–academia collaboration: the partnerships are what outlast the season.
   No company names on the sheet — the logos say who; the lines say what was
   built together. Logos are SVGs in public/img/partners/, cropped to their
   artwork so each one fills its tile. The lower band shows the kind of work it
   leads to: an operator on an industrial arm, not a rover in a desert. Everyone
   else behind the team goes past on a slow conveyor along the foot of the
   sheet, so the sheet never has to hold all of them at once. The strip below
   that stays clear for the rover, as on every other slide. */

function Logo({ slot, name, className, height }: { slot: string; name: string; className: string; height?: number }) {
  return (
    <div className={className} style={{ height }}>
      <img src={`./img/partners/${slot}`} alt={name} />
    </div>
  )
}

/* The list twice over, moved left by half its width on a loop, is a belt with
   no seam. Still when motion is reduced — the first few then simply stand. */
function Conveyor() {
  const reduced = useReduced()
  const belt = [...SPONSORS, ...SPONSORS]
  return (
    <div className={`marquee${reduced ? ' marquee--still' : ''}`} aria-label="Sponsors and suppliers">
      <div className="marquee__track">
        {belt.map((s, i) => (
          <img key={`${s.slot}-${i}`} src={`./img/partners/${s.slot}`} alt={i < SPONSORS.length ? s.name : ''} aria-hidden={i >= SPONSORS.length} />
        ))}
      </div>
    </div>
  )
}

export function S12Partners() {
  return (
    <div className="slide__inner">
      <Reveal className="abs" style={{ left: 0, top: 0, width: 1400 }}>
        <h2 className="heading">Beyond the competition.</h2>
        <p className="small" style={{ marginTop: 8 }}>Industry–academia collaboration</p>
      </Reveal>

      <Reveal delay={0.1} className="abs" style={{ left: 0, top: 104, width: 1180 }}>
        <p className="lead" style={{ color: 'var(--ink-2)', fontSize: 31 }}>
          Working with industry does not just empower the team — it puts real industrial requirements in front of us, and we
          solve them.
        </p>
      </Reveal>

      {/* the global partners: one tile each, and what each collaboration produced */}
      <div className="abs" style={{ left: 0, top: 196, width: 1728, display: 'grid', gridTemplateColumns: '170px repeat(5, 1fr)', columnGap: 28 }}>
        <Reveal delay={0.2} className="ruled ruled--ink">
          <p className="body" style={{ fontWeight: 600, fontSize: 24, lineHeight: 1.2 }}>Global industry partners</p>
        </Reveal>
        {PARTNERS.map((p, i) => (
          <Reveal key={p.slot} delay={0.26 + i * 0.07} className="ruled">
            <Logo slot={p.slot} name={p.name} className="logo-slot" height={84} />
            <p className="small" style={{ marginTop: 6, fontSize: 20, lineHeight: 1.28 }}>{p.what}</p>
          </Reveal>
        ))}
      </div>

      {/* the work it leads to: an operator on an industrial arm, at nine-tenths size */}
      <Reveal delay={0.7} y={0} className="abs" style={{ left: 0, top: 430, width: 738, height: 259 }}>
        <div style={{ width: 820, height: 288, transform: 'scale(0.9)', transformOrigin: 'top left' }}>
          <IndustrialScene />
        </div>
      </Reveal>

      {/* why: two reasons it is not about the rulebook, sharing the band's height */}
      <div className="abs" style={{ left: 768, top: 428, width: 522, height: 262, display: 'grid', gridTemplateRows: '1fr 1fr', gap: 20 }}>
        {COLLABORATION.map((c, i) => (
          <Reveal key={c.k} delay={0.66 + i * 0.08} className="ruled">
            <p className="body" style={{ fontWeight: 600, fontSize: 25, lineHeight: 1.15, marginBottom: 6 }}>{c.k}</p>
            <p className="small" style={{ fontSize: 20, lineHeight: 1.3 }}>{c.v}</p>
          </Reveal>
        ))}
      </div>

      {/* the one that came before: the trust of the country's largest conglomerate */}
      <Reveal delay={0.9} className="abs ruled ruled--red" style={{ left: 1330, top: 428, width: 398, height: 262 }}>
        <Logo slot={PREVIOUS_PARTNER.slot} name={PREVIOUS_PARTNER.name} className="logo-slot" height={78} />
        <p className="body" style={{ fontWeight: 600, fontSize: 25, lineHeight: 1.2, marginTop: 6 }}>{PREVIOUS_PARTNER.line}</p>
        <p className="small" style={{ marginTop: 8, fontSize: 20 }}>Previous partner · {PREVIOUS_PARTNER.when}</p>
      </Reveal>

      {/* everyone else behind the team, going past on the belt */}
      <Reveal delay={1.0} y={6} className="abs" style={{ left: 0, top: 712, width: 1728, height: 64, display: 'flex', alignItems: 'center', gap: 24 }}>
        <p className="small" style={{ flex: '0 0 170px', fontSize: 22, lineHeight: 1.2, fontWeight: 500 }}>Also behind the team</p>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Conveyor />
        </div>
      </Reveal>
    </div>
  )
}
