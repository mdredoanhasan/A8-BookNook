import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const contact = {
  email: "redoanhasan02@gmail.com",
  location: "Dhaka, Bangladesh",
};

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/mdredoanhasan",
    icon: <FaGithub size={18} />,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/md-redoan-hasan",
    icon: <FaLinkedinIn size={18} />,
  },
];

const links = [
  { href: "/", label: "Home" },
  { href: "/All-Books", label: "All Books" },
  { href: "/My-Books", label: "My Books" },
  { href: "/Add-Book", label: "Add Book" },
  { href: "/My-Borrows", label: "My Borrows" },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-stone-950">
      {/* Soft glow */}
      <div className="pointer-events-none absolute -bottom-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-amber-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo + about */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3">
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

            <p className="mt-5 max-w-sm leading-relaxed text-stone-400">
              A small online library where readers add books, borrow them for a
              few days and return them for the next reader.
            </p>

            {/* Social links */}
            <div className="mt-6 flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-stone-300 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300/50 hover:bg-amber-400 hover:text-stone-950"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone-400 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              Contact
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-stone-400">
              <li className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="mt-0.5 h-5 w-5 shrink-0 text-amber-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                <a
                  href={`mailto:${contact.email}`}
                  className="break-all transition hover:text-white"
                >
                  {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="mt-0.5 h-5 w-5 shrink-0 text-amber-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                <span>{contact.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-stone-500 sm:flex-row">
          <p>© 2026 BookNook. All rights reserved.</p>
          <p>Add · Borrow · Return</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
