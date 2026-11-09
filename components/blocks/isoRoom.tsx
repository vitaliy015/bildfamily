/* ────────────────────────────────────────────────────────────────────────────
   One isometric room, drawn five times.

   Every stop on the Additional Services map is the same room seen from the
   same corner, so the five pictures read as one house rather than five
   unrelated icons. Positions are therefore never typed in as raw coordinates:
   each point is named in room space — a spot on the floor, or a spot on one of
   the two walls — and projected here. Moving a wall moves everything on it.

   Room space:
     floor(a, b)      a = towards the back-left wall, b = towards the viewer
     leftWall(t, h)   t = along the back-left wall, h = height off the floor
     rightWall(t, h)  t = along the back-right wall, h = height off the floor
   All three take 0‥1 for position and 0‥WALL for height.
   ──────────────────────────────────────────────────────────────────────── */

export const INK = "#1c1a18"
export const OLIVE = "#8a8a5c"
export const HAIR = "#c4c0b8"
export const PAPER = "#faf9f5"

// The left corner of the floor, and the two floor axes from it.
const O = { x: 24, y: 122 }
const A = { x: 106, y: -53 } // towards the back-left wall
const B = { x: 106, y: 53 } // towards the viewer
export const WALL = 56 // wall height, in the same units

const p = (x: number, y: number) => `${round(x)},${round(y)}`
const round = (n: number) => Math.round(n * 10) / 10

export const floor = (a: number, b: number) =>
  p(O.x + A.x * a + B.x * b, O.y + A.y * a + B.y * b)

export const leftWall = (t: number, h: number) =>
  p(O.x + A.x * t, O.y + A.y * t - h)

export const rightWall = (t: number, h: number) =>
  p(O.x + A.x + B.x * t, O.y + A.y + B.y * t - h)

/** Closed polygon through the given room-space points. */
export const poly = (...pts: string[]) => `M${pts.join("L")}Z`

/** Open line through the given room-space points. */
export const line = (...pts: string[]) => `M${pts.join("L")}`

/**
 * A box standing on the floor: its footprint corners given as (a, b) pairs
 * going round, and its height. Returns the three faces a viewer can see.
 */
export function box(
  [a0, b0]: [number, number],
  [a1, b1]: [number, number],
  h: number,
) {
  const topBackLeft = floorUp(a0, b0, h)
  const topBackRight = floorUp(a1, b0, h)
  const topFrontRight = floorUp(a1, b1, h)
  const topFrontLeft = floorUp(a0, b1, h)
  return {
    top: poly(topBackLeft, topBackRight, topFrontRight, topFrontLeft),
    // the face looking down-left towards the viewer
    left: poly(topBackLeft, topFrontLeft, floor(a0, b1), floor(a0, b0)),
    // the face looking down-right towards the viewer
    front: poly(topFrontLeft, topFrontRight, floor(a1, b1), floor(a0, b1)),
    corners: { topBackLeft, topBackRight, topFrontRight, topFrontLeft },
  }
}

const floorUp = (a: number, b: number, h: number) =>
  p(O.x + A.x * a + B.x * b, O.y + A.y * a + B.y * b - h)

export { floorUp }

/** The empty room: floor and the two walls behind it. */
export function Shell({ leftTint = 0.26, rightTint = 0.14, tiles = false }) {
  return (
    <>
      <path
        d={poly(floor(0, 1), floor(1, 1), floor(1, 0), floor(0, 0))}
        fill={OLIVE}
        fillOpacity="0.12"
        stroke={INK}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d={poly(leftWall(0, 0), leftWall(1, 0), leftWall(1, WALL), leftWall(0, WALL))}
        fill={OLIVE}
        fillOpacity={leftTint}
        stroke={INK}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d={poly(rightWall(0, 0), rightWall(1, 0), rightWall(1, WALL), rightWall(0, WALL))}
        fill={OLIVE}
        fillOpacity={rightTint}
        stroke={INK}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {tiles && (
        <g stroke={PAPER} strokeWidth="1.5">
          <path d={line(leftWall(0, 28), leftWall(1, 28))} />
          <path d={line(leftWall(0.33, 0), leftWall(0.33, WALL))} />
          <path d={line(leftWall(0.66, 0), leftWall(0.66, WALL))} />
          <path d={line(rightWall(0, 28), rightWall(1, 28))} />
          <path d={line(rightWall(0.33, 0), rightWall(0.33, WALL))} />
          <path d={line(rightWall(0.66, 0), rightWall(0.66, WALL))} />
        </g>
      )}
    </>
  )
}
