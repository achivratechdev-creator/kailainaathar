"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";

export default function AuthBootstrap() {
  const setUser = useAuthStore((s) => s.setUser);
  const clearUser = useAuthStore((s) => s.clearUser);

  useEffect(() => {
    const controller = new AbortController();

    fetch("http://localhost:8000/", {
      credentials: "include",
      signal: controller.signal,
    })
      .then(async (res) => {
        if (res.status === 401) {
          clearUser();
          return null;
        }

        if (!res.ok) return null;
        return res.json();
      })
      .then((user) => {
        if (user) setUser(user);
      })
      .catch(() => {});

    return () => controller.abort();
  }, [setUser, clearUser]);

  return null;
}
