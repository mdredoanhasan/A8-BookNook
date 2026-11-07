"use client";
import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const BorrowButton = ({ book }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleBorrow = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const now = new Date();
      const next7 = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

      // Avoid clashing with the DB's own `id` field
      const { id, _id, ...bookData } = book;

      const data = {
        user: user?.name,
        email: user?.email,
        bookId: id ?? _id,
        ...bookData,
        borrowDate: now.toISOString(),
        returnDate: next7.toISOString(),
      };

      const res = await fetch("http://localhost:5000/Books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to borrow book");

      setOpen(false);
      toast.add({
        title: "Book borrowed",
        description: "The book was added to your borrows.",
        type: "success",
      });
    } catch (err) {
      console.error(err);
      toast.add({
        title: "Unable to borrow book",
        description:
          err instanceof TypeError
            ? "Could not connect to the book server."
            : err.message || "Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="mt-10 w-full rounded-full bg-amber-400 px-8 py-4 text-sm font-bold uppercase tracking-wider text-stone-950 shadow-lg shadow-amber-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-amber-400/50 sm:w-auto">
          Borrow
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Borrow {book?.title}</DialogTitle>
          <DialogDescription>
            Confirm your details. The book is due back in 7 days.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleBorrow} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={user?.name || ""} readOnly />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={user?.email || ""} readOnly />
          </div>

          <DialogFooter>
            <button
              type="submit"
              disabled={loading || !user}
              className="w-full rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-stone-950 transition hover:bg-amber-300 disabled:opacity-50"
            >
              {loading ? "Borrowing..." : "Confirm Borrow"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowButton;