"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    tag: "Step 01 · Add",
    title: "Add a Book to the Shelf",
    text: "Got a story worth sharing? Add it to BookNook and let other readers discover it.",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 2,
    tag: "Step 02 · Borrow",
    title: "Borrow a Book for a Few Days",
    text: "Pick any available book, borrow it, and enjoy it at your own pace. No fuss.",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 3,
    tag: "Step 03 · Return",
    title: "Return It, Then Read Another",
    text: "Track everything you borrowed and return books in one click so the next reader can enjoy them.",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1920&q=80",
  },
];

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function Banner() {
  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  if (!mounted) {
    return <section className="h-[85vh] min-h-140 w-full bg-stone-950" />;
  }

  return (
    <section className="relative w-full">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        speed={900}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="booknook-swiper h-[85vh] min-h-140 w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                sizes="100vw"
                className="kenburns object-cover"
              />

              <div className="absolute inset-0 bg-linear-to-r from-stone-950/90 via-stone-950/60 to-stone-950/10" />
              <div className="absolute inset-0 bg-linear-to-t from-stone-950/70 via-transparent to-transparent" />

              <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 md:px-12">
                <div className="max-w-2xl">
                  <span className="reveal inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                    {slide.tag}
                  </span>

                  <h1
                    className="reveal mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
                    style={{
                      animationDelay: "0.15s",
                      fontFamily: "Georgia, 'Times New Roman', serif",
                    }}
                  >
                    {slide.title}
                  </h1>

                  <p
                    className="reveal mt-6 max-w-lg text-base leading-relaxed text-stone-200 md:text-lg"
                    style={{ animationDelay: "0.3s" }}
                  >
                    {slide.text}
                  </p>

                  <div
                    className="reveal mt-10 flex flex-wrap items-center gap-4"
                    style={{ animationDelay: "0.45s" }}
                  >
                    <Link
                      href="/All-Books"
                      className="group inline-flex items-center gap-3 rounded-full bg-amber-400 px-8 py-4 text-sm font-bold uppercase tracking-wider text-stone-950 shadow-lg shadow-amber-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-amber-400/50"
                    >
                      Browse Books

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 12h14M13 6l6 6-6 6"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}