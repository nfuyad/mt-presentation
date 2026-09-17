import { Reveal } from '../components/Reveal'
import { Frame } from '../components/Frame'
import { Placeholder } from '../components/Placeholder'
import { IconAutonomy, IconDelivery, IconScience, IconService } from '../components/Icons'
import { MISSIONS, type Mission as MissionData } from '../content/facts'

const ICONS = { servicing: IconService, autonomous: IconAutonomy, science: IconScience, delivery: IconDelivery }

/* One layout, four missions — so the set reads as a series rather than four
   unrelated slides. `photoReady` flips a slide from placeholder to photograph the
   moment the file lands in public/img. */
export function Mission({ id, photoReady = false }: { id: MissionData['id']; photoReady?: boolean }) {
  const m = MISSIONS.find((x) => x.id === id)!
  const Icon = ICONS[id as keyof typeof ICONS]

  return (
    <div className="slide__inner">
      {/* one column, top to bottom: the mark, the name, what it asks, and the ruled
          list of what the judges score */}
      <div className="abs" style={{ left: 0, top: 0, width: 900, height: 740, display: 'flex', flexDirection: 'column' }}>
        <Reveal style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <span style={{ color: 'var(--red)', display: 'block', flex: 'none' }}>{Icon && <Icon size={68} />}</span>
          <h2 className="statement" style={{ fontSize: 68, lineHeight: 1 }}>{m.name}</h2>
        </Reveal>

        {/* a spacer that gives a one-line name room to breathe, and a two-line one less */}
        <div style={{ flex: '1 1 0', maxHeight: 150, minHeight: 44 }} />

        <Reveal delay={0.1}>
          <p className="lead" style={{ fontWeight: 500 }}>{m.lead}</p>
        </Reveal>

        <div style={{ marginTop: 40, borderBottom: '3px solid var(--line-2)' }}>
          {m.steps.map((s, i) => (
            <Reveal key={s} delay={0.2 + i * 0.09} style={{ padding: '18px 0', borderTop: '3px solid var(--line-2)' }}>
              <span className="body" style={{ color: 'var(--ink)' }}>{s}</span>
            </Reveal>
          ))}
        </div>

        {m.result && (
          <Reveal delay={0.54} style={{ marginTop: 32 }}>
            <p className="lead" style={{ fontWeight: 600, color: 'var(--red)' }}>{m.result}</p>
          </Reveal>
        )}
      </div>

      {photoReady ? (
        <Reveal delay={0.05} y={0} scale={0.985} className="abs" style={{ left: 1000, top: 40, width: 728, height: 700 }}>
          <Frame src={m.photo} alt={m.photoNote} position={m.photoPos} delay={0.05} style={{ width: '100%', height: '100%' }} />
        </Reveal>
      ) : (
        <Placeholder file={m.photo} note={m.photoNote} delay={0.05} style={{ left: 1000, top: 40, width: 728, height: 700 }} />
      )}
    </div>
  )
}
