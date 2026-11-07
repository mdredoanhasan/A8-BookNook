import { Suspense } from "react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import MyBooksList from "@/components/MyBooksList";
import { apiUrl } from "@/lib/api-url";

const MyBooksContent = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const email = session?.user?.email;

  if (!email) redirect("/sign-in");

  const requestHeaders = await headers();
  const { token } = await auth.api.getToken({ headers: requestHeaders });
  const res = await fetch(apiUrl(`/My-Books/${encodeURIComponent(email)}`), {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Could not load your books (server returned ${res.status}).`);
  }

  const data = await res.json();

  if (!Array.isArray(data)) {
    throw new Error("The server returned an invalid books list.");
  }

  const mybooks = data.filter(Boolean);

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
        <p className="bg-stone-950 p-10 text-center text-stone-400">Loading...</p>
      }
    >
      <MyBooksContent />
    </Suspense>
  );
};

export default MyBooksPage;