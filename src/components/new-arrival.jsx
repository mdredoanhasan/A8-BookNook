import { Suspense } from "react";
import Link from "next/link";

const NewArrivalContent = async () => {
  const res = await fetch("http://localhost:5000/new-arrival", {
    cache: "no-store",
  });
  const books = await res.json();

  return (
    <section className="relative overflow-hidden bg-stone-950 px-6 py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
            Fresh on the shelf
          </span>
          <h2
            className="mt-6 text-4xl font-bold text-white md:text-5xl"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            New Arrivals
          </h2>
          <p className="mt-4 text-stone-400">
            The latest books added to BookNook.
          </p>
        </div>

        {/* Cards: 3 per row on desktop */}
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <div
              key={book._id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-300/40 hover:shadow-xl hover:shadow-amber-500/10"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-stone-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />

                <span className="absolute left-4 top-4 rounded-full border border-amber-300/30 bg-stone-950/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300 backdrop-blur-md">
                  {book.category}
                </span>
              </div>

              {/* Info */}
              <div className="flex flex-1 flex-col p-6">
                <h3
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  {book.title}
                </h3>
                <p className="mt-1 text-sm text-stone-400">by {book.author}</p>

                <Link
                  href={`/All-Books/${book._id}`}
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-amber-400 px-6 py-3 text-sm font-bold uppercase tracking-wider text-stone-950 shadow-lg shadow-amber-500/30 transition-all duration-300 hover:bg-amber-300 hover:shadow-amber-400/50"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* See all books */}
        <div className="mt-14 text-center">
          <Link
            href="/All-Books"
            className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300/50 hover:bg-white/10"
          >
            See All Books
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
        </div>
      </div>
    </section>
  );
};

const NewArrivalPage = () => {
  return (
    <Suspense
      fallback={
        <p className="bg-stone-950 p-10 text-center text-stone-400">Loading...</p>
      }
    >
      <NewArrivalContent />
    </Suspense>
  );
};

export default NewArrivalPage;