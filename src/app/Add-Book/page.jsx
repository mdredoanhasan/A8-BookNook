"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
import { authFetch } from "@/lib/authFetch";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

const initialState = {
  title: "",
  author: "",
  category: "Fiction",
  description: "",
  totalCopies: "1",
};

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-white placeholder-stone-500 outline-none backdrop-blur-md transition focus:border-amber-300/60 focus:bg-white/10 focus:ring-4 focus:ring-amber-300/10";

const readOnlyClass =
  "w-full cursor-not-allowed rounded-2xl border border-white/5 bg-white/[0.02] px-5 py-3.5 text-stone-400 outline-none";

const labelClass = "mb-2 block text-sm font-medium text-stone-300";

export default function AddBookPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formElement = e.target;
    setSubmitting(true);

    try {
      if (!file) {
        throw new Error("Please choose a book image.");
      }

      const imgData = new FormData();
      imgData.append("image", file);

      const imgRes = await fetch("/api/upload-image", {
        method: "POST",
        body: imgData,
      });
      const imgResult = await imgRes.json();
      const imageUrl = imgResult?.url;
      if (!imgRes.ok || !imageUrl) {
        throw new Error(imgResult?.error || "Image upload failed.");
      }

      const book = {
        ...form,
        totalCopies: Number(form.totalCopies),
        availableCopies: Number(form.totalCopies),
        image: imageUrl,
        addedByName: user?.name,
        addedBy: user?.email,
        email: user?.email,
      };

      const res = await authFetch("http://localhost:5000/Add-Books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });
      if (!res.ok) {
        throw new Error(`Saving the book failed (server returned ${res.status}).`);
      }

      formElement.reset();
      setForm(initialState);
      setFile(null);
      setPreview("");
      toast.add({
        title: "Book added",
        description: "The book is now in the library.",
        type: "success",
      });
    } catch (err) {
      console.error("Failed to add book:", err);
      toast.add({
        title: "Unable to add book",
        description:
          err instanceof TypeError
            ? "Could not connect to the image service or book server. Check your connection and make sure the book server is running."
            : err.message || "Could not add the book. Please try again.",
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative overflow-hidden bg-stone-950 px-6 py-16">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
          Share a story
        </p>
        <h1
          className="mt-3 text-4xl font-bold text-white md:text-5xl"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          Add a New Book
        </h1>
        <p className="mt-3 text-stone-400">
          Fill in the details and the book will appear on the shelf.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:p-10"
        >
          {/* Title + Author */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="title" className={labelClass}>
                Book Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. The Silent Library"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="author" className={labelClass}>
                Author Name
              </label>
              <input
                id="author"
                name="author"
                type="text"
                required
                value={form.author}
                onChange={handleChange}
                placeholder="Author name"
                className={inputClass}
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className={labelClass}>
              Category
            </label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className={`${inputClass} [&>option]:bg-stone-900 [&>option]:text-white`}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="totalCopies" className={labelClass}>
              Total Copies
            </label>
            <input
              id="totalCopies"
              name="totalCopies"
              type="number"
              min="1"
              step="1"
              required
              value={form.totalCopies}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Image */}
          <div>
            <label htmlFor="image" className={labelClass}>
              Book Image
            </label>
            <label
              htmlFor="image"
              className="flex cursor-pointer items-center gap-5 rounded-2xl border border-dashed border-white/20 bg-white/5 p-4 transition hover:border-amber-300/50 hover:bg-white/10"
            >
              <div className="relative flex h-24 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-stone-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-8 w-8 text-stone-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                {preview && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={preview}
                    alt="Preview"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {file?.name || "Click to choose an image"}
                </p>
                <p className="mt-1 text-xs text-stone-500">JPG, PNG or WEBP</p>
              </div>
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              required
              onChange={handleFile}
              className="sr-only"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className={labelClass}>
              Short Description
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              value={form.description}
              onChange={handleChange}
              placeholder="What is this book about?"
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* User (read-only) */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="userName" className={labelClass}>
                User Name
              </label>
              <input
                id="userName"
                type="text"
                value={user?.name || ""}
                readOnly
                className={readOnlyClass}
              />
            </div>
            <div>
              <label htmlFor="userEmail" className={labelClass}>
                User Email
              </label>
              <input
                id="userEmail"
                type="email"
                value={user?.email || ""}
                readOnly
                className={readOnlyClass}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-amber-400 px-8 py-4 text-sm font-bold uppercase tracking-wider text-stone-950 shadow-lg shadow-amber-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-amber-400/50"
          >
            {submitting ? "Adding Book..." : "Add Book"}
          </button>
        </form>
      </div>
    </main>
  );
}