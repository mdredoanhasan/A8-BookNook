const steps = [
  {
    no: "01",
    title: "Add a Book",
    text: "Share a book you own. Add its title, author and cover so others can find it.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
    ),
  },
  {
    no: "02",
    title: "Borrow for a Few Days",
    text: "Pick any available book and borrow it. Read it at your own pace, no fuss.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.5C10.5 5.3 8.4 4.7 6 4.7c-1 0-1.9.1-2.8.4v13.5c.9-.3 1.8-.4 2.8-.4 2.4 0 4.5.6 6 1.8m0-13.5c1.5-1.2 3.6-1.8 6-1.8 1 0 1.9.1 2.8.4v13.5c-.9-.3-1.8-.4-2.8-.4-2.4 0-4.5.6-6 1.8m0-13.5v13.5"
      />
    ),
  },
  {
    no: "03",
    title: "Return in One Click",
    text: "Finished reading? Open My Borrows and return it so the next reader can enjoy it.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
      />
    ),
  },
];

export default function HowBorrowingWorks() {
  return (
    <section className="relative overflow-hidden bg-stone-950 py-24">
      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
            Simple as 1 · 2 · 3
          </span>
          <h2
            className="mt-6 text-4xl font-bold text-white md:text-5xl"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            How Borrowing Works
          </h2>
          <p className="mt-4 text-stone-400">
            Add a book, borrow a book, return a book. That is the whole idea.
          </p>
        </div>

        <div className="relative mt-16 grid gap-6 md:grid-cols-3">
          {/* Connecting line (desktop) */}
          <div className="pointer-events-none absolute left-[16%] right-[16%] top-[4.2rem] hidden h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent md:block" />

          {steps.map((step) => (
            <div
              key={step.no}
              className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-300/40 hover:bg-white/10"
            >
              <span
                className="absolute right-6 top-4 text-6xl font-bold text-white/5 transition-colors duration-300 group-hover:text-amber-300/20"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {step.no}
              </span>

              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400 text-stone-950 shadow-lg shadow-amber-500/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-7 w-7"
                >
                  {step.icon}
                </svg>
              </div>

              <h3
                className="mt-6 text-xl font-bold text-white"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {step.title}
              </h3>
              <p className="mt-3 leading-relaxed text-stone-400">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}