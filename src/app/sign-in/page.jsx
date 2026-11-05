"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "../../lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { redirect } from "next/navigation";

export default function SignInPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      ...user,
    });
    if (data) {
      redirect("/");
    }
    if (error) {
      console.log(error);
    }
    setLoading(true);

    console.log("Sign in:", form);
    setTimeout(() => setLoading(false), 800);
  };
  const handleGoogle = async () => {
    setLoading(true);
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
    // The browser leaves for Google here, so there is no code after this.
    setLoading(false);
  };

  return (
    <main className="grid min-h-[calc(100vh-73px)] bg-stone-950 lg:grid-cols-2">
      {/* Left: image */}
      <div className="relative hidden lg:block">
        <Image
          src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1920&q=80"
          alt="Library"
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
            Your next favorite book is already on the shelf.
          </h2>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex items-center justify-center px-6 py-14">
        <div className="w-full max-w-md">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
            Welcome back
          </p>
          <h1
            className="mt-3 text-4xl font-bold text-white"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Sign in to BookNook
          </h1>
          <p className="mt-3 text-stone-400">
            Borrow, return and manage your books in one place.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-stone-300"
              >
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
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-white placeholder-stone-500 outline-none backdrop-blur-md transition focus:border-amber-300/60 focus:bg-white/10 focus:ring-4 focus:ring-amber-300/10"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-stone-300"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={show ? "text" : "password"}
                  required
                  minLength={6}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 pr-20 text-white placeholder-stone-500 outline-none backdrop-blur-md transition focus:border-amber-300/60 focus:bg-white/10 focus:ring-4 focus:ring-amber-300/10"
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold uppercase tracking-wider text-stone-400 transition hover:text-amber-300"
                >
                  {show ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex cursor-pointer items-center gap-2 text-stone-400">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded accent-amber-400"
                />
                Remember me
              </label>
              <Link
                href="#"
                className="text-amber-300 transition hover:text-amber-200"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-amber-400 px-8 py-4 text-sm font-bold uppercase tracking-wider text-stone-950 shadow-lg shadow-amber-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-amber-400/50 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <button
            onClick={handleGoogle}
            type="button"
            className="mt-4 flex w-full items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-md transition hover:border-amber-300/50 hover:bg-white/10"
          >
            <FcGoogle size={22} />
            Continue with Google
          </button>
          <p className="mt-8 text-center text-sm text-stone-400">
            New to BookNook?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-amber-300 transition hover:text-amber-200"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
