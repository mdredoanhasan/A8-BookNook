"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

const links = [
  { href: "/", label: "Home" },
  { href: "/All-Books", label: "All Books" },
  { href: "/My-Books", label: "My Books" },
  { href: "/Add-Book", label: "Add Book" },
  { href: "/My-Borrows", label: "My Borrows" },
];

const NavBar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    setOpen(false);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/"),
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-stone-950 backdrop-blur-xl">
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
          {user ? (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger
                render={
                  <button
                    type="button"
                    aria-label="Open user menu"
                    className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 py-1 pl-1 pr-4 transition hover:border-amber-300/50 hover:bg-white/10"
                  />
                }
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    referrerPolicy="no-referrer"
                    src={user.image || undefined}
                    alt={user.name}
                  />
                  <AvatarFallback className="bg-amber-400 font-bold text-stone-950">
                    {user.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="max-w-[120px] truncate text-sm font-medium text-white">
                  {user.name}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className={`h-4 w-4 text-stone-400 transition-transform duration-300 ${
                    open ? "rotate-180" : ""
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 9l6 6 6-6"
                  />
                </svg>
              </PopoverTrigger>

              <PopoverContent
                align="end"
                sideOffset={12}
                className="w-72 overflow-hidden rounded-2xl border border-white/10 bg-stone-950/95 p-0 text-white shadow-2xl shadow-black/50 backdrop-blur-xl"
              >
                {/* Amber top line */}
                <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500" />

                {/* User info */}
                <div className="flex items-center gap-3 px-5 py-5">
                  <Avatar className="h-12 w-12 ring-2 ring-amber-300/40">
                    <AvatarImage
                      referrerPolicy="no-referrer"
                      src={user.image || undefined}
                      alt={user.name}
                    />
                    <AvatarFallback className="bg-amber-400 text-lg font-bold text-stone-950">
                      {user.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p
                      className="truncate text-base font-bold text-white"
                      style={{
                        fontFamily: "Georgia, 'Times New Roman', serif",
                      }}
                    >
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-stone-400">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/10 p-2">
                  {/* My Profile */}
                  <Link
                    href="/My-Profile"
                    onClick={() => setOpen(false)}
                    className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-stone-300 transition hover:bg-white/5 hover:text-amber-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.1a7.5 7.5 0 0115 0"
                      />
                    </svg>
                    My Profile
                  </Link>
                </div>

                {/* Logout */}
                <div className="border-t border-white/10 p-2">
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-300 transition hover:bg-red-500/10 hover:text-red-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 12H9m9 0l-3-3m3 3l-3 3"
                      />
                    </svg>
                    Logout
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <>
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
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu */}
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

              <div className="mt-2 border-t border-white/10 pt-3">
                {user ? (
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3 px-3 py-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          referrerPolicy="no-referrer"
                          src={user.image || undefined}
                          alt={user.name}
                        />
                        <AvatarFallback className="bg-amber-400 font-bold text-stone-950">
                          {user.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">
                          {user.name}
                        </p>
                        <p className="truncate text-xs text-stone-400">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <Link
                      href="/My-Profile"
                      className="rounded-xl px-3 py-3 text-sm font-medium text-stone-300 transition hover:bg-white/5 hover:text-white"
                    >
                      My Profile
                    </Link>

                    <Button
                      onClick={handleSignOut}
                      variant="destructive"
                      className="mt-1"
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
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
                )}
              </div>
            </div>
          </nav>
        </details>
      </div>
    </header>
  );
};

export default NavBar;
