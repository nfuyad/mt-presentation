import type { ComponentType } from 'react'
import { S01Cover } from './S01Cover'
import { S02About } from './S02About'
import { S03Rover } from './S03Rover'
import { S04Benchmark } from './S04Benchmark'
import { S05WhyURC } from './S05WhyURC'
import { S10Seasons } from './S10Seasons'
import { S11Outreach } from './S11Outreach'
import { S12Partners } from './S12Partners'
import { S13Struggle } from './S13Struggle'
import { S14Close } from './S14Close'

/* Order of record — must match SLIDES in src/content/deck.ts. */
export const SLIDE_COMPONENTS: ComponentType[] = [
  S01Cover,
  S02About,
  S03Rover,
  S04Benchmark,
  S05WhyURC,
  S10Seasons,
  S11Outreach,
  S12Partners,
  S13Struggle,
  S14Close,
]
