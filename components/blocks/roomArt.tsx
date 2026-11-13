/* ────────────────────────────────────────────────────────────────────────────
   The five rooms, drawn once and used twice: the full walk on the Additional
   Services page, and three of them again as the teaser on the home page.
   Geometry comes from isoRoom.tsx — positions are named in room space and
   projected there, so all five share one camera and read as one house.
   ──────────────────────────────────────────────────────────────────────── */

import {
  INK,
  OLIVE,
  HAIR,
  PAPER,
  WALL,
  Shell,
  floor,
  floorUp,
  leftWall,
  rightWall,
  poly,
  line,
  box,
} from "./isoRoom"

export type ArtProps = { className?: string }

export function Frame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 260 192" fill="none" role="presentation" aria-hidden className={className}>
      {children}
    </svg>
  )
}

/* ── 1. The bathroom — the job they called us for ─────────────────────── */

export function BathroomArt({ className }: ArtProps) {
  const tub = box([0.16, 0.1], [0.74, 0.46], 20)
  return (
    <Frame className={className}>
      <Shell tiles />
      <path d={tub.top} fill="#ffffff" stroke={INK} strokeWidth="1.7" strokeLinejoin="round" />
      <path d={tub.left} fill="#f0ede8" stroke={INK} strokeWidth="1.7" strokeLinejoin="round" />
      <path d={tub.front} fill="#ffffff" stroke={INK} strokeWidth="1.7" strokeLinejoin="round" />
      {/* the water inside */}
      <path
        d={poly(
          floorUp(0.24, 0.16, 20),
          floorUp(0.66, 0.16, 20),
          floorUp(0.66, 0.4, 20),
          floorUp(0.24, 0.4, 20),
        )}
        fill={OLIVE}
        fillOpacity="0.32"
        stroke={INK}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* shower, on the wall above the tub */}
      <path d={line(rightWall(0.22, 50), rightWall(0.22, 34))} stroke={INK} strokeWidth="2" strokeLinecap="round" />
      <path d={line(rightWall(0.14, 32), rightWall(0.3, 32))} stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
      <g stroke={OLIVE} strokeWidth="1.8" strokeLinecap="round">
        <path d={line(rightWall(0.17, 28), rightWall(0.17, 20))} />
        <path d={line(rightWall(0.22, 28), rightWall(0.22, 17))} />
        <path d={line(rightWall(0.27, 28), rightWall(0.27, 20))} />
      </g>
    </Frame>
  )
}

/* ── 2. Painting — the hallway, while the sheets are already down ─────── */

export function PaintingArt({ className }: ArtProps) {
  const tray = box([0.06, 0.68], [0.3, 0.9], 5)
  const roller = box([0.4, 0.74], [0.58, 0.86], 8)
  return (
    <Frame className={className}>
      <Shell leftTint={0.08} />
      {/* the half that already has its new colour */}
      <path
        d={poly(leftWall(0, 0), leftWall(0.52, 0), leftWall(0.52, WALL), leftWall(0, WALL))}
        fill={OLIVE}
        fillOpacity="0.5"
        stroke={INK}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {/* the wet edge where today's work stopped */}
      <path
        d={line(leftWall(0.52, 0), leftWall(0.52, WALL))}
        stroke={OLIVE}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* dust sheet over the near half of the floor */}
      <path
        d={poly(floor(0, 0.6), floor(1, 0.6), floor(1, 1), floor(0, 1))}
        fill={PAPER}
        fillOpacity="0.9"
        stroke={HAIR}
        strokeWidth="1.5"
        strokeDasharray="7 5"
        strokeLinejoin="round"
      />
      {/* tray, standing on the sheet */}
      <path d={tray.top} fill={OLIVE} fillOpacity="0.5" stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
      <path d={tray.left} fill="#f0ede8" stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
      <path d={tray.front} fill={PAPER} stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
      {/* the roller, set down beside it — on the floor it reads as a roller,
          on the wall it only ever read as a light fitting */}
      <path d={roller.top} fill={OLIVE} fillOpacity="0.55" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
      <path d={roller.left} fill="#f0ede8" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
      <path d={roller.front} fill={OLIVE} fillOpacity="0.3" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
      <path
        d={line(floorUp(0.58, 0.8, 4), floorUp(0.8, 0.8, 4))}
        stroke={INK}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d={line(floorUp(0.73, 0.8, 4), floorUp(0.8, 0.8, 4))}
        stroke={OLIVE}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </Frame>
  )
}

/* ── 3. Flooring — boards going down across the room ──────────────────── */

export function FlooringArt({ className }: ArtProps) {
  const stack = box([0.52, 0.66], [0.92, 0.9], 11)
  const laid = 0.56
  return (
    <Frame className={className}>
      <Shell />
      {/* The boarded strip runs right up to the left wall, so it has to sit
          clearly below that wall in value or it reads as climbing it. */}
      <path
        d={poly(floor(0, 0), floor(1, 0), floor(1, laid), floor(0, laid))}
        fill={OLIVE}
        fillOpacity="0.46"
        stroke={INK}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <g stroke={INK} strokeWidth="1.1" strokeOpacity="0.45">
        <path d={line(floor(0, 0.14), floor(1, 0.14))} />
        <path d={line(floor(0, 0.28), floor(1, 0.28))} />
        <path d={line(floor(0, 0.42), floor(1, 0.42))} />
      </g>
      {/* the ends of the boards, staggered the way they are actually laid */}
      <g stroke={INK} strokeWidth="1.1" strokeOpacity="0.3">
        <path d={line(floor(0.36, 0), floor(0.36, 0.14))} />
        <path d={line(floor(0.64, 0.14), floor(0.64, 0.28))} />
        <path d={line(floor(0.3, 0.28), floor(0.3, 0.42))} />
        <path d={line(floor(0.7, 0.42), floor(0.7, laid))} />
      </g>
      {/* the next boards, still stacked */}
      <path d={stack.top} fill={OLIVE} fillOpacity="0.4" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
      <path d={stack.left} fill="#f0ede8" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
      <path d={stack.front} fill={PAPER} stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
      <g stroke={INK} strokeWidth="1" strokeOpacity="0.4">
        <path d={line(floorUp(0.52, 0.74, 11), floorUp(0.92, 0.74, 11))} />
        <path d={line(floorUp(0.52, 0.82, 11), floorUp(0.92, 0.82, 11))} />
      </g>
    </Frame>
  )
}

/* ── 4. Drywall — a board going up on bare studs ──────────────────────── */

export function DrywallArt({ className }: ArtProps) {
  const leaning = box([0.06, 0.62], [0.4, 0.86], 6)
  return (
    <Frame className={className}>
      <Shell />
      {/* studs, still showing */}
      <g stroke={HAIR} strokeWidth="2.4">
        {[0.12, 0.28, 0.44, 0.6, 0.76, 0.92].map((t) => (
          <path key={t} d={line(rightWall(t, 0), rightWall(t, WALL))} />
        ))}
      </g>
      {/* the board being fitted over them */}
      <path
        d={poly(rightWall(0.06, 5), rightWall(0.52, 5), rightWall(0.52, 50), rightWall(0.06, 50))}
        fill={OLIVE}
        fillOpacity="0.3"
        stroke={INK}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {/* taped edge where the next board will meet it */}
      <path d={line(rightWall(0.52, 5), rightWall(0.52, 50))} stroke={OLIVE} strokeWidth="4" strokeOpacity="0.8" strokeLinecap="round" />
      {/* screws */}
      <g stroke={INK} strokeWidth="1.8" strokeLinecap="round">
        {[0.14, 0.3, 0.46].flatMap((t) =>
          [14, 30, 44].map((h) => (
            <path key={`${t}-${h}`} d={line(rightWall(t - 0.015, h), rightWall(t + 0.015, h))} />
          )),
        )}
      </g>
      {/* spare boards waiting on the floor */}
      <path d={leaning.top} fill={PAPER} stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
      <path d={leaning.left} fill="#f0ede8" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
      <path d={leaning.front} fill={PAPER} stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
    </Frame>
  )
}

/* ── 5. The kitchen — the bigger one ──────────────────────────────────── */

export function KitchenArt({ className }: ArtProps) {
  const run = box([0.74, 0.06], [1, 0.94], 26)
  return (
    <Frame className={className}>
      <Shell />
      {/* upper cabinets */}
      <path
        d={poly(rightWall(0.1, 33), rightWall(0.82, 33), rightWall(0.82, 53), rightWall(0.1, 53))}
        fill={OLIVE}
        fillOpacity="0.28"
        stroke={INK}
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d={line(rightWall(0.46, 33), rightWall(0.46, 53))} stroke={INK} strokeWidth="1.2" strokeOpacity="0.5" />
      <g stroke={INK} strokeWidth="1.8" strokeLinecap="round">
        <path d={line(rightWall(0.42, 37), rightWall(0.42, 42))} />
        <path d={line(rightWall(0.5, 37), rightWall(0.5, 42))} />
      </g>
      {/* the counter run */}
      <path d={run.top} fill={PAPER} stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
      <path d={run.left} fill="#f0ede8" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
      <path d={run.front} fill={OLIVE} fillOpacity="0.2" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
      {/* cupboard doors along the front */}
      <g stroke={INK} strokeWidth="1.2" strokeOpacity="0.45">
        <path d={line(floorUp(0.74, 0.35, 26), floor(0.74, 0.35))} />
        <path d={line(floorUp(0.74, 0.64, 26), floor(0.74, 0.64))} />
      </g>
      <g stroke={INK} strokeWidth="1.8" strokeLinecap="round">
        <path d={line(floorUp(0.74, 0.18, 20), floorUp(0.74, 0.26, 20))} />
        <path d={line(floorUp(0.74, 0.46, 20), floorUp(0.74, 0.54, 20))} />
        <path d={line(floorUp(0.74, 0.74, 20), floorUp(0.74, 0.82, 20))} />
      </g>
      {/* sink cut into the counter, and the tap behind it */}
      <path
        d={poly(
          floorUp(0.82, 0.38, 26),
          floorUp(0.96, 0.38, 26),
          floorUp(0.96, 0.58, 26),
          floorUp(0.82, 0.58, 26),
        )}
        fill={OLIVE}
        fillOpacity="0.4"
        stroke={INK}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d={`${line(floorUp(0.99, 0.46, 26), floorUp(0.99, 0.46, 44))} ${line(
          floorUp(0.99, 0.46, 44),
          floorUp(0.9, 0.46, 44),
        )} ${line(floorUp(0.9, 0.46, 44), floorUp(0.9, 0.46, 38))}`}
        stroke={INK}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Frame>
  )
}
