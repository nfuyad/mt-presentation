# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
A mixed, partly standing audience at a STEM fair hosted by the Edward M. Kennedy (EMK) Center with the U.S. Embassy Dhaka: school and college students (Class 10 upward), university students, EducationUSA advisers, Embassy staff, other exhibitor teams, possibly press. Some know the University Rover Challenge (URC) and will check numbers mid-talk. A second user is the presenter, an undergraduate team member driving the deck with arrow keys or a clicker and reading the presenter panel.

## Product Purpose
A live presentation for BRACU Mongol-Tori, BRAC University's student Mars rover team. It has to make a room of Bangladeshi students believe a world-class engineering result can come out of a lab in Dhaka, and show them how to join. Secondary goals, in order: recruitment (the team takes members every semester), credibility with the Embassy/EMK for future collaboration, and sponsor/partner visibility.

## Positioning
A team from a country with no space agency competes at America's premier student rover competition, fails badly (21st in 2024), and comes back better (8th in 2025, 7th in 2026). The comeback is the story, not the ranking. The failure is shown on screen deliberately.

## Operating Context
- Projected in a lit room at a fair; large type, high contrast, no hairlines or small-print charts.
- Driven by keyboard or a clicker with arrow keys only; `s` opens a presenter panel with script, notes, clock and per-slide budget.
- Must open cold on a stranger's laptop with no network: fonts and images bundled; 2D rover fallback without WebGL; `?static` disables animation.
- Also published to GitHub Pages at https://so-ohan.github.io/mt-presentation/.
- 14 slides, about 7.5 minutes.

## Capabilities and Constraints
- Vite + React + TypeScript deck in `deck/`, fixed 1920×1080 sheet scaled to the window, never reflowed.
- All words live in `deck/src/content/deck.ts`, all numbers in `deck/src/content/facts.ts`. Copy is locked: design changes must not alter wording, numbers or claims.
- A rover drives along the foot of every slide as the progress bar (`src/rover/`); content below about y=870 is driven over.

## Brand Commitments
- Name: BRACU Mongol-Tori (মঙ্গল তরী, "Mars vessel"), shown with the BRAC University mark.
- Colours are the two logo inks, red `#E82727` and orange `#FC9D2D`. Keep them.
- The driving-rover progress track is part of the identity. Keep it.
- Tone: plain, confident, specific. No "we are proud to present"; numbers over adjectives.

## Evidence on Hand
- Facts with sources: `02-facts.md`, `deck/src/content/facts.ts`. Anything marked unverified must not appear.
- Photographs in `img/` and optimised copies in `deck/public/img/`; partner logos in `deck/public/img/partners/`.
- Absent: a verified macro shot of the jamdani etching; the 2017 result (excluded). Do not fabricate either.

## Product Principles
1. Every number must survive being Googled mid-talk.
2. The failure is the hinge of the story; never hide or soften it.
3. Legible from the back of a lit room beats clever.
4. Generous to other Bangladeshi teams; the national story is bigger than ours.
5. Recruitment is the only conversion: the close must make joining obvious.

## Accessibility & Inclusion
Body text contrast at least 7:1 against the ground. Nothing below 22px on the 1920×1080 frame for audience-facing text. Honour `prefers-reduced-motion`. Visible keyboard focus on the join link.
