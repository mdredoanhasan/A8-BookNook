"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-white placeholder-stone-500 outline-none backdrop-blur-md transition focus:border-amber-300/60 focus:bg-white/10 focus:ring-4 focus:ring-amber-300/10";

export default function SignUpPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [show, setShow] = useState(false);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }
    if (form.password !== form.confirm) {
      return setError("Passwords do not match.");
    }
    if (!agree) {
      return setError("Please accept the terms to continue.");
    }

    setLoading(true);
    // TODO: connect your real registration here (NextAuth, Firebase, custom API...)
    console.log("Sign up:", { name: form.name, email: form.email });
    setTimeout(() => setLoading(false), 800);
  };

  return (
    <main className="grid min-h-[calc(100vh-73px)] bg-stone-950 lg:grid-cols-2">
      {/* Left: form */}
      <div className="flex items-center justify-center px-6 py-14">
        <div className="w-full max-w-md">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
            Join the library
          </p>
          <h1
            className="mt-3 text-4xl font-bold text-white"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Create your account
          </h1>
          <p className="mt-3 text-stone-400">
            Add books, borrow them for a few days and return them with one click.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-stone-300">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-stone-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-stone-300">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={show ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="confirm" className="mb-2 block text-sm font-medium text-stone-300">
                  Confirm password
                </label>
                <input
                  id="confirm"
                  name="confirm"
                  type={show ? "text" : "password"}
                  required
                  value={form.confirm}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={inputClass}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              className="text-xs font-semibold uppercase tracking-wider text-stone-400 transition hover:text-amber-300"
            >
              {show ? "Hide passwords" : "Show passwords"}
            </button>

            <label className="flex cursor-pointer items-start gap-3 text-sm text-stone-400">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => {
                  setAgree(e.target.checked);
                  setError("");
                }}
                className="mt-0.5 h-4 w-4 rounded accent-amber-400"
              />
              <span>
                I agree to the{" "}
                <Link href="#" className="text-amber-300 hover:text-amber-200">
                  Terms &amp; Conditions
                </Link>
              </span>
            </label>

            {error && (
              <p
                role="alert"
                className="rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-amber-400 px-8 py-4 text-sm font-bold uppercase tracking-wider text-stone-950 shadow-lg shadow-amber-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-amber-400/50 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <button
            type="button"
            className="mt-4 flex w-full items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-md transition hover:border-amber-300/50 hover:bg-white/10"
          >
            <svg aria-hidden="true" viewBox="0 0 48 48" className="h-5 w-5">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" />
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.72 7.18l7.61 5.9c4.44-4.1 7.15-10.14 7.15-17.55Z" />
              <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.75-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.53 2.56 10.78l7.97-6.19Z" />
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.8l-7.61-5.9c-2.12 1.43-4.84 2.28-8.29 2.28-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" />
            </svg>
            Continue with Google
          </button>

          <p className="mt-8 text-center text-sm text-stone-400">
            Already have an account?{" "}
            <Link href="/sign-in" className="font-semibold text-amber-300 transition hover:text-amber-200">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right: image */}
      <div className="relative hidden lg:block">
        <Image
          src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1920&q=80"
          alt="Library shelves"
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-stone-950/20" />
        <div className="absolute bottom-12 left-12 right-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
            Add · Borrow · Return
          </span>
          <h2
            className="mt-5 text-4xl font-bold leading-tight text-white"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            One small account. A whole library to explore.
          </h2>
        </div>
      </div>
    </main>
  );
}