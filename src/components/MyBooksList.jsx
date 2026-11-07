"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "@/components/ui/toast";
import { authFetch } from "@/lib/authFetch";
import { apiUrl } from "@/lib/api-url";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-white placeholder-stone-500 outline-none transition focus:border-amber-300/60 focus:bg-white/10 focus:ring-4 focus:ring-amber-300/10";

const labelClass = "mb-2 block text-sm font-medium text-stone-300";

const MyBooksList = ({ books }) => {
  const [list, setList] = useState(
    Array.isArray(books) ? books.filter(Boolean) : [],
  );
  const [editBook, setEditBook] = useState(null);
  const [deleteBook, setDeleteBook] = useState(null);
  const safeList = list.filter(Boolean);

  const handleSave = async (e) => {
    e.preventDefault();

    const id = editBook?._id;
    if (!id) {
      toast.add({
        title: "Unable to update book",
        description: "The book ID is missing.",
        type: "error",
      });
      return;
    }

    const updatedData = Object.fromEntries(new FormData(e.target).entries());

    try {
      const response = await authFetch(apiUrl(`/Books/${id}`), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        throw new Error(`The server returned ${response.status}.`);
      }

      setList((prev) =>
        prev.map((book) =>
          book?._id === id ? { ...book, ...updatedData } : book,
        ),
      );
      setEditBook(null);
      toast.add({
        title: "Book updated",
        description: "Your changes were saved.",
        type: "success",
      });
    } catch (error) {
      console.error("Failed to update book:", error);
      toast.add({
        title: "Unable to update book",
        description:
          error instanceof TypeError
            ? "Could not connect to the book server."
            : error.message,
        type: "error",
      });
    }
  };

  const handleDelete = async () => {
    const id = deleteBook?._id;
    if (!id) {
      toast.add({
        title: "Unable to delete book",
        description: "The book ID is missing.",
        type: "error",
      });
      return;
    }

    try {
      const response = await authFetch(apiUrl(`/Books/${id}`), {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`The server returned ${response.status}.`);
      }

      setList((prev) => prev.filter((book) => book?._id !== id));
      setDeleteBook(null);
      toast.add({
        title: "Book deleted",
        description: "The book was removed from your library.",
        type: "success",
      });
    } catch (error) {
      console.error("Failed to delete book:", error);
      toast.add({
        title: "Unable to delete book",
        description:
          error instanceof TypeError
            ? "Could not connect to the book server."
            : error.message,
        type: "error",
      });
    }
  };

  return (
    <>
      {/* Empty state or cards */}
      {safeList.length === 0 ? (
        <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-md">
          <p className="text-stone-300">You have not added any book yet.</p>
          <Link
            href="/Add-Book"
            className="mt-6 inline-block rounded-full bg-amber-400 px-8 py-3 text-sm font-bold uppercase tracking-wider text-stone-950 transition hover:bg-amber-300"
          >
            Add a Book
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {safeList.map((book) => (
            <div
              key={book._id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-300/40 hover:shadow-xl hover:shadow-amber-500/10"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-amber-300/30 bg-stone-950/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300 backdrop-blur-md">
                  {book.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h2
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  {book.title}
                </h2>
                <p className="mt-1 text-sm text-stone-400">by {book.author}</p>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setEditBook(book)}
                    className="flex-1 rounded-full bg-amber-400 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-stone-950 shadow-lg shadow-amber-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteBook(book)}
                    className="flex-1 rounded-full border border-red-400/30 bg-red-400/10 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-red-300 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-400/20"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ---------- Edit modal ---------- */}
      {editBook && (
        <div
          onClick={() => setEditBook(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-white/10 bg-stone-950 p-6 shadow-2xl shadow-black/60 sm:p-8"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                  Update
                </p>
                <h3
                  className="mt-1 text-2xl font-bold text-white"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  Edit Book
                </h3>
              </div>
              <button
                onClick={() => setEditBook(null)}
                aria-label="Close"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-stone-400 transition hover:border-amber-300/50 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* key makes the form refill when another book is opened */}
            <form
              key={editBook._id}
              onSubmit={handleSave}
              className="mt-6 space-y-5"
            >
              <div>
                <label htmlFor="edit-title" className={labelClass}>
                  Book Title
                </label>
                <input
                  id="edit-title"
                  name="title"
                  type="text"
                  required
                  defaultValue={editBook.title}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="edit-author" className={labelClass}>
                  Author Name
                </label>
                <input
                  id="edit-author"
                  name="author"
                  type="text"
                  required
                  defaultValue={editBook.author}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="edit-category" className={labelClass}>
                  Category
                </label>
                <select
                  id="edit-category"
                  name="category"
                  defaultValue={editBook.category}
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
                <label htmlFor="edit-description" className={labelClass}>
                  Short Description
                </label>
                <textarea
                  id="edit-description"
                  name="description"
                  required
                  rows={4}
                  defaultValue={editBook.description}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditBook(null)}
                  className="flex-1 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:border-amber-300/50 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold uppercase tracking-wider text-stone-950 shadow-lg shadow-amber-500/30 transition-all duration-300 hover:bg-amber-300"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------- Delete confirm modal ---------- */}
      {deleteBook && (
        <div
          onClick={() => setDeleteBook(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-3xl border border-white/10 bg-stone-950 p-8 text-center shadow-2xl shadow-black/60"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-400/10 text-red-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-7 w-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.35 9m-4.78 0L9.26 9m9.97-3.21c.34.05.68.11 1.02.17m-1.02-.17L18.16 19.67a2.25 2.25 0 01-2.24 2.08H8.08a2.25 2.25 0 01-2.24-2.08L4.77 5.79m14.46 0a48.1 48.1 0 00-3.48-.4m-12 .57c.34-.06.68-.12 1.02-.17m0 0a48.1 48.1 0 013.48-.4m7.5 0v-.92c0-1.18-.91-2.16-2.09-2.2a51.96 51.96 0 00-3.32 0c-1.18.04-2.09 1.02-2.09 2.2v.92m7.5 0a48.67 48.67 0 00-7.5 0"
                />
              </svg>
            </div>

            <h3
              className="mt-5 text-2xl font-bold text-white"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Delete this book?
            </h3>
            <p className="mt-2 text-sm text-stone-400">
              <span className="font-semibold text-stone-200">
                {deleteBook.title}
              </span>{" "}
              will be removed from the library. This cannot be undone.
            </p>

            <div className="mt-7 flex gap-3">
              <button
                onClick={() => setDeleteBook(null)}
                className="flex-1 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:border-amber-300/50 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 rounded-full bg-red-500 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-red-500/30 transition-all duration-300 hover:bg-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default MyBooksList;