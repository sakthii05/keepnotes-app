"use client";

import { RootState } from "@/utils/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push("/your-notes");
    } else {
      router.push("/login");
    }
  }, [currentUser]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-4xl font-bold text-foreground  animate-pulse">
        Keep Notes
      </div>
    </div>
  );
}
