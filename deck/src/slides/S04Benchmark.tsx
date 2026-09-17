import { Reveal } from '../components/Reveal'
import { Frame } from '../components/Frame'
import { BENCHMARKS } from '../content/facts'

/* The hinge of the talk: you have built a thing, and you have no idea whether it
   is any good. */
export function S04Benchmark() {
  return (
    <div className="slide__inner">
      <Reveal className="abs" style={{ left: 0, top: 0, width: 940 }}>
        <p className="lead" style={{ fontWeight: 500, color: 'var(--ink-2)' }}>We built a rover.</p>
        <h2 className="statement" style={{ fontSize: 64, lineHeight: 1, marginTop: 8, textWrap: 'balance' }}>How do you know it is any good?</h2>
      </Reveal>

      <Reveal delay={0.12} className="abs" style={{ left: 0, top: 236, width: 940 }}>
        <p className="lead" style={{ color: 'var(--ink-2)' }}>
          Benchmarking our system against the best in the world is the only way to know whether we are competitive. We have chosen a few competitions that are relevant to our rover's capabilities...
        </p>
      </Reveal>

      {/* three competitions as the rows of a table, the chosen one in red */}
      <div className="abs" style={{ left: 0, top: 456, width: 940, borderBottom: '3px solid var(--line-2)' }}>
        {BENCHMARKS.map((b, i) => (
          <Reveal
            key={b.code}
            delay={0.22 + i * 0.1}
            style={{
              display: 'grid',
              gridTemplateColumns: '150px 1fr auto',
              gap: 28,
              alignItems: 'baseline',
              padding: '18px 0',
              borderTop: `3px solid ${b.chosen ? 'var(--red)' : 'var(--line-2)'}`,
            }}
          >
            <span className="bignum" style={{ fontSize: 56, color: b.chosen ? 'var(--red)' : 'var(--ink-3)' }}>{b.code}</span>
            <span className="body" style={{ fontWeight: 500, color: b.chosen ? 'var(--ink)' : 'var(--ink-2)' }}>
              {b.name}
              {b.chosen && <span style={{ display: 'block', color: 'var(--red)', fontSize: 24, fontWeight: 600, marginTop: 2 }}>we chose this one</span>}
            </span>
            <span className="small" style={{ fontSize: 24 }}>{b.where}</span>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.05} y={0} scale={0.985} className="abs" style={{ left: 1000, top: 60, width: 728, height: 700 }}>
        <Frame src="urc-2023.jpg" alt="A rover crossing the Utah desert at the Mars Desert Research Station" delay={0.05} style={{ width: '100%', height: '100%' }} />
      </Reveal>
    </div>
  )
}
