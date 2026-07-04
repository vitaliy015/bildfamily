"use client"

import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover,
} from "@/components/blocks/animated-slideshow"

const SLIDES = [
  {
    id: "slide-1",
    title: "Bathroom Remodeling",
    imageUrl: "/uploads/2025/09/IMG_6731.jpg",
  },
  {
    id: "slide-2",
    title: "Basement Finishing",
    imageUrl: "/uploads/2025/09/IMG_3488.jpg",
  },
  {
    id: "slide-3",
    title: "Kitchen Updates",
    imageUrl: "/uploads/2025/09/IMG_4360.jpg",
  },
  {
    id: "slide-4",
    title: "Flooring Installation",
    imageUrl: "/uploads/2025/09/IMG_5605.jpg",
  },
  {
    id: "slide-5",
    title: "Drywall & Painting",
    imageUrl: "/uploads/2025/09/IMG_5674.jpg",
  },
]

export function ServicesSlideshow() {
  return (
    <HoverSlider className="min-h-svh place-content-center p-6 md:px-12 bg-[#faf9f5] text-[#1a1a2e]">
      {/* Label */}
      <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-[#d97706]">
        / Our Services
      </h3>

      <div className="flex flex-wrap items-center justify-evenly gap-6 md:gap-12">

        {/* Service list */}
        <div className="flex flex-col space-y-2 md:space-y-4">
          {SLIDES.map((slide, index) => (
            <TextStaggerHover
              key={slide.id}
              index={index}
              className="cursor-pointer text-4xl font-bold uppercase tracking-tighter text-[#1a1a2e] md:text-5xl"
              text={slide.title}
            />
          ))}

          {/* CTA below the list */}
          <a
            href="/services"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#d97706] hover:underline"
          >
            See all services →
          </a>
        </div>

        {/* Image area */}
        <HoverSliderImageWrap className="w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl md:max-w-md">
          {SLIDES.map((slide, index) => (
            <div key={slide.id}>
              <HoverSliderImage
                index={index}
                src={slide.imageUrl}
                alt={`${slide.title} — Inside The House Calgary`}
                className="size-full max-h-[420px] object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
          ))}
        </HoverSliderImageWrap>

      </div>
    </HoverSlider>
  )
}
