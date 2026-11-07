import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";
import { Suspense } from "react";
import MyBooksList from "@/components/MyBooksList";

const MyBooksContent = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const email = session?.user?.email;

  const res = await fetch(`http://localhost:5000/My-Books/${email}`, {
    cache: "no-store",
  });
  const mybooks = await res.json();

  return (
    <main className="relative overflow-hidden bg-stone-950 px-6 py-16">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
          Your books
        </p>
        <h1
          className="mt-3 text-4xl font-bold text-white md:text-5xl"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          My Books
        </h1>
        <p className="mt-3 text-stone-400">
          The books you added to BookNook. Edit or delete them any time.
        </p>

        <MyBooksList books={mybooks} />
      </div>
    </main>
  );
};

const MyBooksPage = () => {
  return (
    <Suspense
      fallback={
        <p className="bg-stone-950 p-10 text-center text-stone-400">
          Loading...
        </p>
      }
    >
      <MyBooksContent />
    </Suspense>
  );
};

export default MyBooksPage;
