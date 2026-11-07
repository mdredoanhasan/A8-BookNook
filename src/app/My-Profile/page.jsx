import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";
import { redirect } from "next/navigation";

function formatMemberSince(value) {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

async function MyProfileContent() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  if (!user) redirect("/sign-in");

  const memberSince = formatMemberSince(user.createdAt);
  const initials = user.name
    ?.trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <main className="relative min-h-full overflow-hidden bg-stone-950 px-6 py-16">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
          Your account
        </p>
        <h1
          className="mt-3 text-4xl font-bold text-white md:text-5xl"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          My Profile
        </h1>
        <p className="mt-3 text-stone-400">
          Your BookNook account details and library activity.
        </p>

        <section className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
          <div className="h-2 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500" />
          <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-10">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-amber-300/50 bg-amber-400 text-3xl font-bold text-stone-950">
              {user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.image}
                  alt={`${user.name}'s profile`}
                  className="h-full w-full object-cover"
                />
              ) : (
                initials || "R"
              )}
            </div>
            <div className="min-w-0">
              <h2
                className="truncate text-2xl font-bold text-white sm:text-3xl"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {user.name || "BookNook reader"}
              </h2>
              <p className="mt-2 break-all text-stone-400">{user.email}</p>
              <span className="mt-4 inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-200">
                {user.emailVerified ? "Verified account" : "BookNook member"}
              </span>
            </div>
          </div>

          <div className="grid gap-px border-t border-white/10 bg-white/10 sm:grid-cols-2">
            <div className="bg-stone-950/70 px-6 py-5 sm:px-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Email address
              </p>
              <p className="mt-2 break-all font-medium text-stone-200">
                {user.email}
              </p>
            </div>
            <div className="bg-stone-950/70 px-6 py-5 sm:px-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Member since
              </p>
              <p className="mt-2 font-medium text-stone-200">
                {memberSince || "BookNook member"}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-white">Your library</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {[
              {
                href: "/My-Books",
                title: "My Books",
                description: "Manage the books you shared.",
              },
              {
                href: "/My-Borrows",
                title: "My Borrows",
                description: "View and return borrowed books.",
              },
              {
                href: "/Add-Book",
                title: "Add a Book",
                description: "Share another book with the library.",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-amber-300/40 hover:bg-white/10"
              >
                <h3 className="font-semibold text-amber-300">{item.title}</h3>
                <p className="mt-2 text-sm text-stone-400">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default function MyProfilePage() {
  return (
    <Suspense
      fallback={
        <main className="bg-stone-950 px-6 py-20 text-center text-stone-400">
          Loading your profile...
        </main>
      }
    >
      <MyProfileContent />
    </Suspense>
  );
}
