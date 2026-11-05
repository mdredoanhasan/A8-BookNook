import BorrowButton from "@/components/borrowButton";
import Link from "next/link";
import { Suspense } from "react";

const BookDetailsContent = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/All-Books/${id}`, {
    cache: "no-store",
  });
  const book = await res.json();

  return (
    <main className="relative overflow-hidden bg-stone-950 px-6 py-16">
      <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <Link
          href="/All-Books"
          className="text-sm font-semibold text-stone-400 transition hover:text-amber-300"
        >
          ← Back to all books
        </Link>

        <div className="mt-8 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="absolute -bottom-4 -right-4 h-full w-full rounded-3xl border border-amber-300/40" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-stone-900 shadow-2xl shadow-black/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={book.image}
                alt={book.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div>
            <span className="inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">
              {book.category}
            </span>

            <h1
              className="mt-5 text-4xl font-bold leading-tight text-white md:text-5xl"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              {book.title}
            </h1>
            <p className="mt-3 text-lg text-stone-400">by {book.author}</p>

            {/* Description */}
            <div className="mt-8 border-t border-white/10 pt-8">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                About this book
              </h2>
              <p className="mt-4 leading-relaxed text-stone-300">
                {book.description}
              </p>
            </div>

            {/* Added by */}
            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-400 text-lg font-bold text-stone-950"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {book.addedByName?.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-wider text-stone-500">
                  Added by
                </p>
                <p className="truncate font-semibold text-white">
                  {book.addedByName}
                </p>
                <p className="truncate text-sm text-stone-400">
                  {book.addedBy}
                </p>
              </div>
            </div>

            <BorrowButton book={book} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default function BookDetailsPage({ params }) {
  return (
    <Suspense
      fallback={
        <main className="bg-stone-950 px-6 py-16 text-center text-stone-400">
          Loading book details...
        </main>
      }
    >
      <BookDetailsContent params={params} />
    </Suspense>
  );
}
