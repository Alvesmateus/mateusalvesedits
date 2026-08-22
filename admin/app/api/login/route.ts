import { NextResponse } from "next/server";
import { createSessionValue, SESSION_COOKIE_NAME, SESSION_MAX_AGE, timingSafeEqualStr } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const username = typeof body?.username === "string" ? body.username : "";
  const password = typeof body?.password === "string" ? body.password : "";

  const validUser = process.env.ADMIN_USERNAME || "";
  const validPass = process.env.ADMIN_PASSWORD || "";

  const ok =
    username.length > 0 &&
    password.length > 0 &&
    timingSafeEqualStr(username, validUser) &&
    timingSafeEqualStr(password, validPass);

  if (!ok) {
    return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE_NAME, createSessionValue(username), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
