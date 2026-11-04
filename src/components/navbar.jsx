import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/All-Books", label: "All Books" },
  { href: "/My-Books", label: "My Books" },
  { href: "/Add-Book", label: "Add Book" },
  { href: "/My-Borrows", label: "My Borrows" },
];

const NavBar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-stone-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-400 text-xl font-bold text-stone-950 shadow-lg shadow-amber-500/30"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            B
          </div>
          <p
            className="text-xl font-bold tracking-tight text-white"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Book<span className="text-amber-300">Nook</span>
          </p>
        </Link>

        {/* Desktop links */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative rounded-full px-4 py-2 text-sm font-medium text-stone-300 transition-colors duration-300 hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/sign-in"
            className="rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm font-semibold text-white backdrop-blur-md transition hover:border-amber-300/50 hover:bg-white/10"
          >
            Login
          </Link>
          <Link
            href="/sign-up"
            className="rounded-full bg-amber-400 px-5 py-2 text-sm font-bold text-stone-950 shadow-lg shadow-amber-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-amber-400/50"
          >
            Register
          </Link>
        </div>

        <details className="group md:hidden">
          <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:border-amber-300/50">
            <span className="sr-only">Toggle navigation menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 7h16M4 12h16M4 17h16"
              />
            </svg>
          </summary>

          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="absolute left-0 right-0 top-full border-t border-white/10 bg-stone-950/95 px-4 py-4 backdrop-blur-xl md:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-3 py-3 text-sm font-medium text-stone-300 transition hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-2 flex gap-2 border-t border-white/10 pt-3">
                <Link
                  href="/sign-in"
                  className="flex-1 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-center text-sm font-semibold text-white"
                >
                  Login
                </Link>

                <Link
                  href="/sign-up"
                  className="flex-1 rounded-full bg-amber-400 px-4 py-2.5 text-center text-sm font-bold text-stone-950"
                >
                  Register
                </Link>
              </div>
            </div>
          </nav>
        </details>
      </div>
    </header>
  );
};

export default NavBar;
