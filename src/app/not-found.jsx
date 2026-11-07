import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-stone-950 px-6 py-20">
      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/10 blur-3xl" />

      {/* Big watermark number */}
      <span
        className="pointer-events-none absolute select-none text-[14rem] font-bold leading-none text-white/[0.03] sm:text-[22rem]"
        style={{ fontFamily: "Georgia, serif" }}
      >
        404
      </span>

      <div className="relative text-center">
        {/* Book icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400 text-stone-950 shadow-lg shadow-amber-500/30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-8 w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.5C10.5 5.3 8.4 4.7 6 4.7c-1 0-1.9.1-2.8.4v13.5c.9-.3 1.8-.4 2.8-.4 2.4 0 4.5.6 6 1.8m0-13.5c1.5-1.2 3.6-1.8 6-1.8 1 0 1.9.1 2.8.4v13.5c-.9-.3-1.8-.4-2.8-.4-2.4 0-4.5.6-6 1.8m0-13.5v13.5"
            />
          </svg>
        </div>

        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
          Error 404
        </p>

        <h1
          className="mt-3 text-4xl font-bold text-white sm:text-5xl md:text-6xl"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          Page not found
        </h1>

        <p className="mx-auto mt-5 max-w-md leading-relaxed text-stone-400">
          This page was borrowed and never returned. It may have been moved, or
          the link is wrong.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 rounded-full bg-amber-400 px-8 py-4 text-sm font-bold uppercase tracking-wider text-stone-950 shadow-lg shadow-amber-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-amber-400/50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M11 18l-6-6 6-6" />
            </svg>
            Go Home
          </Link>

          <Link
            href="/All-Books"
            className="rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300/50 hover:bg-white/10"
          >
            Browse Books
          </Link>
        </div>
      </div>
    </main>
  );
}