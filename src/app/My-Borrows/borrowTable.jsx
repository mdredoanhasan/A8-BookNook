"use client";
import { useState, Suspense } from "react";

function formatDate(value) {
  const date = new Date(value);
  if (!value || Number.isNaN(date.getTime())) return "Invalid date";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export default function BorrowTable({ borrows }) {
  const [borrowRows, setBorrowRows] = useState(borrows);
  const [returningId, setReturningId] = useState(null);
  const [error, setError] = useState("");

  const handleReturnBook = async (borrowId) => {
    if (!borrowId) {
      setError("Could not return this book because its record ID is missing.");
      return;
    }

    setReturningId(borrowId);
    setError("");

    try {
      const res = await fetch(`http://localhost:5000/Borrows/${borrowId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error(`Return request failed (${res.status})`);

      setBorrowRows((currentBorrows) =>
        currentBorrows.filter((borrow) => borrow._id !== borrowId)
      );
    } catch (error) {
      console.error("Failed to return book:", error);
      setError("Could not return this book. Please try again.");
    } finally {
      setReturningId(null);
    }
  };

  return (
    <Suspense>
      <div className="mt-10">
        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/5">
          <table className="w-full min-w-190 text-left">
            <thead className="border-b border-white/10 bg-white/5">
              <tr className="text-xs uppercase tracking-wider text-amber-300">
                <th scope="col" className="px-6 py-4 font-semibold">
                  Image
                </th>
                <th scope="col" className="px-6 py-4 font-semibold">
                  Title
                </th>
                <th scope="col" className="px-6 py-4 font-semibold">
                  Borrow Date
                </th>
                <th scope="col" className="px-6 py-4 font-semibold">
                  Return Date
                </th>
                <th scope="col" className="px-6 py-4 font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {borrowRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-stone-400"
                  >
                    You have no borrowed books.
                  </td>
                </tr>
              ) : (
                borrowRows.map((borrow) => (
                  <tr key={borrow._id} className="text-sm text-stone-300">
                    <td className="px-6 py-4">
                      {borrow.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={borrow.image}
                          alt=""
                          className="h-16 w-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex h-16 w-12 items-center justify-center rounded-lg bg-white/10 text-xs text-stone-500">
                          No image
                        </div>
                      )}
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-semibold text-white"
                    >
                      {borrow.title || "Untitled book"}
                    </th>
                    <td className="px-6 py-4">
                      {formatDate(borrow.borrowDate)}
                    </td>
                    <td className="px-6 py-4">
                      {formatDate(borrow.returnDate)}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleReturnBook(borrow._id)}
                        type="button"
                        disabled={returningId !== null}
                        className="rounded-full bg-amber-300 px-4 py-2 text-xs font-semibold text-stone-900 transition hover:bg-amber-200"
                      >
                        {returningId === borrow._id
                          ? "Returning..."
                          : "Return Book"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {error && (
          <p role="alert" className="mt-4 text-sm text-red-300">
            {error}
          </p>
        )}
      </div>
    </Suspense>
  );
}
