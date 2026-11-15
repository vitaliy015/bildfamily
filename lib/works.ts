// The four before/after pairs, kept here rather than inline in the page that
// first used them. /works shows all four; the home page gallery leads with the
// first one. Two places means two chances to drift, so the copy and the alt
// text live in one list and both pages read from it.
//
// Every pair is the same room from the same angle — that is the whole point of
// the slider, and it is why these cannot be swapped for stock photography.
// Files are in public/work/.

export type Transformation = {
  slug: string
  beforeSrc: string
  afterSrc: string
  beforeAlt: string
  afterAlt: string
  title: string
  type: string
  description: string
}

export const TRANSFORMATIONS: Transformation[] = [
  {
    slug: "ensuite",
    beforeSrc: "/work/ensuite-before.jpg",
    afterSrc: "/work/ensuite-after.jpg",
    beforeAlt:
      "Dated master ensuite with green walls and corner tub before renovation, Calgary",
    afterAlt:
      "Renovated master ensuite with navy vanity, freestanding tub and marble tile, Calgary",
    title: "Master Ensuite",
    type: "Bathroom Remodel",
    description:
      "A dated corner-tub ensuite reworked into a bright spa bath — navy vanity, freestanding soaker, and full marble tile.",
  },
  {
    slug: "basement",
    beforeSrc: "/work/basement-before.jpg",
    afterSrc: "/work/basement-after.jpg",
    beforeAlt:
      "Dark basement bathroom with brown walls and dated tile before renovation, Calgary",
    afterAlt:
      "Bright basement bathroom with white walls, black glass shower and vinyl plank floor, Calgary",
    title: "Basement Bathroom",
    type: "Bathroom Remodel",
    description:
      "A dim, brown basement bath opened up with white walls, a frameless black shower and warm vinyl plank.",
  },
  {
    slug: "steam",
    beforeSrc: "/work/steam-before.jpg",
    afterSrc: "/work/steam-after.jpg",
    beforeAlt:
      "Dated beige tiled corner shower with bench before renovation, Calgary",
    afterAlt:
      "Modern stone steam shower with brushed-gold fixtures and hexagon floor, Calgary",
    title: "Steam Shower Suite",
    type: "Tile & Shower",
    description:
      "The same corner-bench footprint rebuilt as a stone steam room — seamless slabs, brushed gold, and a heated bench.",
  },
  {
    slug: "tub",
    beforeSrc: "/work/tub-before.jpg",
    afterSrc: "/work/tub-after.jpg",
    beforeAlt:
      "Dated bathroom with beige tile-surround tub and busy border before renovation, Calgary",
    afterAlt:
      "Refreshed bathroom with clean tile surround, brushed-gold fixtures and dark vanity, Calgary",
    title: "Guest Bath Refresh",
    type: "Bathroom Update",
    description:
      "Busy tile and dated fittings swapped for calm large-format tile, warm brushed-gold taps and a dark vanity.",
  },
]
