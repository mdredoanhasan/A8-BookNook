import Image from "next/image";
import Link from "next/link";

const goodToKnow = [
  "Anyone can add a book to the shelf.",
  "Books are borrowed for a few days, not forever.",
  "Return a book from My Borrows, so the next reader can have it.",
  "Everything you added or borrowed stays in one place.",
];

export default function AboutBookNook() {
  return (
    <section className="relative overflow-hidden bg-stone-900 py-24 md:py-32">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
      <span
        className="pointer-events-none absolute -right-6 -top-10 select-none text-[16rem] font-bold leading-none text-white/3 md:text-[22rem]"
        style={{ fontFamily: "Georgia, serif" }}
      >
        B
      </span>

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 md:px-12 lg:grid-cols-2 lg:gap-24">
        {/* Image side */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          {/* Glow + offset frame */}
          <div className="absolute -inset-6 rounded-[2.5rem] bg-linear-to-br from-amber-400/20 via-transparent to-transparent blur-2xl" />
          <div className="absolute -bottom-5 -right-5 h-full w-full rounded-3xl border border-amber-300/40" />

          <div className="relative aspect-4/5 overflow-hidden rounded-3xl shadow-2xl shadow-black/40">
            <Image
              src="https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1200&q=80"
              alt="A person reading an open book"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-stone-950/60 via-transparent to-transparent" />
          </div>

          {/* Floating glass badge */}
          <div className="float-soft absolute -left-4 bottom-10 rounded-2xl border border-white/20 bg-stone-950/60 px-5 py-4 shadow-xl backdrop-blur-xl md:-left-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-300">
              Our idea
            </p>
            <p
              className="mt-1 text-lg font-bold text-white"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Add · Borrow · Return
            </p>
          </div>
        </div>

        {/* Text side */}
        <div>
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
            <span className="h-px w-8 bg-amber-300/70" />
            About BookNook
          </span>

          <h2
            className="mt-5 text-4xl font-bold leading-tight text-white md:text-5xl"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            A library that grows when{" "}
            <span className="text-amber-300">readers share.</span>
          </h2>

          <p className="mt-7 max-w-xl leading-relaxed text-stone-300 first-letter:float-left first-letter:mr-3 first-letter:text-6xl first-letter:font-bold first-letter:leading-[0.85] first-letter:text-amber-300 first-letter:font-[Georgia,serif]">
            BookNook is a small online library built on a simple idea: books are
            meant to be read, not to sit quietly on a shelf. Readers add the
            books they love, and other readers borrow them for a few days.
            When the reading is done, the book goes back and the next story
            begins its journey.
          </p>

          <p className="mt-5 max-w-xl leading-relaxed text-stone-400">
            There is nothing complicated here. You can see every book in the
            library, add your own, borrow one that catches your eye, and keep
            track of what you have borrowed so returning it is never a worry.
          </p>

          <blockquote className="relative mt-9 max-w-xl rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <span
              className="absolute -top-5 left-5 text-6xl leading-none text-amber-300"
              style={{ fontFamily: "Georgia, serif" }}
            >
              “
            </span>
            <p
              className="text-xl italic leading-relaxed text-stone-100"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Every book here is waiting for its next reader.
            </p>
          </blockquote>

          {/* Good to know */}
          <ul className="mt-9 grid max-w-xl gap-3 sm:grid-cols-2">
            {goodToKnow.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-stone-300">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-400 text-stone-950">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    className="h-3 w-3"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-11 flex flex-wrap items-center gap-4">
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>

            <Link
              href="/Add-Book"
              className="rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300/50 hover:bg-white/10"
            >
              Add a Book
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}