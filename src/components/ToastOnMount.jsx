"use client";

import { useEffect } from "react";
import { toast } from "@/components/ui/toast";

export default function ToastOnMount({ title, description, type = "error" }) {
  useEffect(() => {
    toast.add({ title, description, type });
  }, [description, title, type]);

  return null;
}
