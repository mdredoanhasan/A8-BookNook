"use client";
import React from "react";
import { authClient } from "@/lib/auth-client";

const BorrowButton = ({book}) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleBorrow = () => {
    const data = {
      user: user.name,
      email: user.email,
      ...book,
    };
    console.log(data);
  };
  return (
    <div>
      <button
        onClick={handleBorrow}
        className="mt-10 w-full rounded-full bg-amber-400 px-8 py-4 text-sm font-bold uppercase tracking-wider text-stone-950 shadow-lg shadow-amber-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-amber-400/50 sm:w-auto"
      >
        Borrow
      </button>
    </div>
  );
};

export default BorrowButton;
