import { motion } from 'motion/react'
import { useReduced } from '../components/motionPrefs'
import { Reveal, EASE } from '../components/Reveal'
import { SEASONS } from '../content/facts'

/* The one orchestrated moment in the deck: the line draws itself, then finishes on 2026. */
const W = 1728
const H = 680
const PAD = { l: 90, r: 120, t: 110, b: 120 }
const MAX_RANK = 24

const xOf = (i: number) => PAD.l + (i * (W - PAD.l - PAD.r)) / (SEASONS.length - 1)
const yOf = (rank: number) => PAD.t + ((rank - 1) * (H - PAD.t - PAD.b)) / (MAX_RANK - 1)

const PATH = SEASONS.map((s, i) => `${i === 0 ? 'M' : 'L'}${xOf(i)} ${yOf(s.rank ?? 1)}`).join(' ')

export function S10Seasons() {
  const reduced = useReduced()
  const T = (delay: number, duration: number) => ({ duration: reduced ? 0 : duration, delay: reduced ? 0 : delay, ease: EASE })
  const pointDelay = [0.3, 0.7, 1.1, 1.5, 1.9, 2.3]
  const stroke = 'var(--orange)'

  return (
    <div className="slide__inner">
      <Reveal className="abs" style={{ left: 0, top: 0 }}>
        <h2 className="heading">Eight seasons. One direction.</h2>
        <p className="small" style={{ marginTop: 8 }}>Global rank at the University Rover Challenge · lower is better</p>
      </Reveal>

      <svg className="abs" style={{ left: 0, top: 120 }} width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Rank by year: 13th in 2018, 4th in 2021, 16th in 2023, 21st in 2024, 8th in 2025, 7th in 2026">
        {[1, 5, 10, 15, 20].map((r) => (
          <g key={r}>
            <line x1={PAD.l - 20} x2={W - PAD.r + 20} y1={yOf(r)} y2={yOf(r)} stroke="var(--line)" strokeWidth="2" strokeDasharray={r === 1 ? undefined : '2 10'} />
            <text x={PAD.l - 34} y={yOf(r) + 8} textAnchor="end" fontFamily="var(--body)" fontSize="24" style={{ fontVariantNumeric: 'tabular-nums' }} fill="var(--ink-3)">
              {r === 1 ? '1st' : r}
            </text>
          </g>
        ))}
        {SEASONS.map((s, i) => (
          <text key={s.year} x={xOf(i)} y={H - 16} textAnchor="middle" fontFamily="var(--body)" fontWeight="500" fontSize="26" fill="var(--ink)" style={{ fontVariantNumeric: 'tabular-nums' }}>
            {s.year}
          </text>
        ))}

        <motion.path
          d={PATH}
          stroke={stroke}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={reduced ? 0 : 1}
          initial={{ strokeDashoffset: reduced ? 0 : 1 }}
          animate={{ strokeDashoffset: 0 }}
          transition={T(0.3, 1.8)}
        />

        {SEASONS.map((s, i) => {
          if (s.rank == null) return null
          const cx = xOf(i)
          const cy = yOf(s.rank)
          const isLow = s.year === 2024
          const isBest = s.year === 2026
          const r = isLow || isBest ? 16 : 11
          return (
            <motion.g key={s.year} initial={{ opacity: 0, scale: reduced ? 1 : 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={T(pointDelay[i], 0.3)} style={{ transformOrigin: `${cx}px ${cy}px` }}>
              <circle cx={cx} cy={cy} r={r} fill={isLow || isBest ? 'var(--red)' : 'var(--orange)'} stroke="var(--paper)" strokeWidth="4" />
              <text x={cx} y={isLow ? cy + 58 : cy - 26} textAnchor="middle" fontFamily="var(--display)" fontWeight="700" fontSize={isLow || isBest ? 40 : 30} fill={isLow || isBest ? 'var(--red)' : 'var(--ink)'}>
                {s.label}
              </text>
              {s.note && (
                <text x={cx} y={isLow ? cy + 92 : cy - 66} textAnchor="middle" fontFamily="var(--body)" fontSize="22" fill="var(--ink-2)">
                  {s.note}
                </text>
              )}
            </motion.g>
          )
        })}
      </svg>
    </div>
  )
}
