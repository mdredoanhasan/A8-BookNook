
import Link from "next/link";
import { Suspense } from "react";

async function AllBooksContent() {
  const res = await fetch("http://localhost:5000/All-Books", {
    cache: "no-store",
  });
  const books = await res.json();

  return (
      <main className="relative overflow-hidden bg-stone-950 px-6 py-16">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
          The library
        </p>
        <h1
          className="mt-3 text-4xl font-bold text-white md:text-5xl"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          All Books
        </h1>
        <p className="mt-3 max-w-xl text-stone-400">
          Every book on the shelf. Pick one and see the details.
        </p>

        {/* Grid: 3 cards per row on desktop */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <div
              key={book._id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-300/40 hover:shadow-xl hover:shadow-amber-500/10"
            >
              {/* Image */}
              <div className="relative aspect-4/5 overflow-hidden bg-stone-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-stone-950/60 via-transparent to-transparent" />

                {/* Category */}
                <span className="absolute left-4 top-4 rounded-full border border-amber-300/30 bg-stone-950/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300 backdrop-blur-md">
                  {book.category}
                </span>
              </div>

              {/* Info */}
              <div className="flex flex-1 flex-col p-6">
                <h2
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  {book.title}
                </h2>
                <p className="mt-1 text-sm text-stone-400">by {book.author}</p>

                <Link
                  href={`/All-Books/${book._id}`}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold uppercase tracking-wider text-stone-950 shadow-lg shadow-amber-500/30 transition-all duration-300 hover:bg-amber-300 hover:shadow-amber-400/50"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default function AllBooksPage() {
  return (
    <Suspense
      fallback={
        <main className="bg-stone-950 px-6 py-16 text-center text-stone-400">
          Loading books...
        </main>
      }
    >
      <AllBooksContent />
    </Suspense>
  );
}