import { apiFetch } from "./api";

export type Role = "user" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

/* ---------- LOGIN ---------- */
export async function login(payload: {
  email: string;
  password: string;
}): Promise<{ user: User }> {
  return apiFetch("/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/* ---------- SIGNUP ---------- */
export async function signup(payload: {
  name: string;
  email: string;
  password: string;
  phone: string;
}): Promise<{ user: User }> {
  return apiFetch("/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
