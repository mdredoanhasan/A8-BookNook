"use client";
import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
import { authFetch } from "@/lib/authFetch";
import { apiUrl } from "@/lib/api-url";

function formatDate(value) {
  if (!value) return "Invalid date";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Invalid date";

  const parts = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).formatToParts(date);
  const datePart = (type) => parts.find((part) => part.type === type)?.value;

  return `${datePart("day")}-${datePart("month")}-${datePart("year")}`;
}

export default function BorrowTable({ borrows }) {
  const router = useRouter();
  const [borrowRows, setBorrowRows] = useState(borrows);
  const [returningId, setReturningId] = useState(null);

  const handleReturnBook = async (borrowId) => {
    if (!borrowId) {
      toast.add({
        title: "Unable to return book",
        description: "The borrow record ID is missing.",
        type: "error",
      });
      return;
    }

    setReturningId(borrowId);

    try {
      const res = await authFetch(apiUrl(`/Borrows/${borrowId}`), {
        method: "DELETE",
      });

      if (!res.ok) throw new Error(`Return request failed (${res.status})`);

      setBorrowRows((currentBorrows) =>
        currentBorrows.filter((borrow) => borrow._id !== borrowId)
      );
      router.refresh();
      toast.add({
        title: "Book returned",
        description: "The book was removed from your borrows.",
        type: "success",
      });
    } catch (error) {
      console.error("Failed to return book:", error);
      toast.add({
        title: "Unable to return book",
        description:
          error instanceof TypeError
            ? "Could not connect to the book server."
            : "Please try again.",
        type: "error",
      });
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
      </div>
    </Suspense>
  );
}
