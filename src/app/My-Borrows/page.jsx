import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";
import ToastOnMount from "@/components/ToastOnMount";
import BorrowTable from "./borrowTable";

async function MyBorrowContent() {
  const session = await auth.api.getSession({ headers: await headers() });
  const email = session?.user?.email;

  if (!email) {
    return (
      <main className="bg-stone-950 px-6 py-20 text-center text-stone-300">
        <h1 className="text-3xl font-bold text-white">My Borrows</h1>
        <p className="mt-4">Sign in to see the books you have borrowed.</p>
        <Link
          href="/sign-in"
          className="mt-6 inline-flex rounded-full bg-amber-400 px-6 py-3 font-semibold text-stone-950 transition hover:bg-amber-300"
        >
          Sign in
        </Link>
      </main>
    );
  }

  let borrows;
  try {
    const res = await fetch(`http://localhost:5000/My-Borrows/${email}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Could not load your borrowed books.");

    borrows = await res.json();
    if (!Array.isArray(borrows)) {
      throw new Error("The server returned an invalid borrowed-books list.");
    }
  } catch (error) {
    return (
      <main className="bg-stone-950 px-6 py-20 text-center text-stone-300">
        <h1 className="text-3xl font-bold text-white">My Borrows</h1>
        <ToastOnMount
          title="Unable to load borrows"
          description={error.message || "Please try again later."}
        />
      </main>
    );
  }

  return (
    <main className="relative min-h-full overflow-hidden bg-stone-950 px-6 py-16">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
          Your reading shelf
        </p>
        <h1
          className="mt-3 text-4xl font-bold text-white md:text-5xl"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          My Borrows
        </h1>
        <p className="mt-3 text-stone-400">
          Keep track of your borrowed books and return dates.
        </p>

        <BorrowTable borrows={borrows} />
      </div>
    </main>
  );
}

export default function MyBorrowPage() {
  return (
    <Suspense
      fallback={
        <main className="bg-stone-950 px-6 py-20 text-center text-stone-400">
          Loading your borrowed books...
        </main>
      }
    >
      <MyBorrowContent />
    </Suspense>
  );
}
