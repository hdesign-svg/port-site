import { NextResponse } from "next/server";

const ACCESS_COOKIE = "hcp-prototype-access";
const ACCESS_GRANTED = "granted";

export async function POST(request: Request) {
  const password = process.env.PROTOTYPE_ACCESS_PASSWORD;

  if (!password) {
    return NextResponse.json({ ok: true });
  }

  const body = (await request.json()) as { password?: string };

  if (body.password !== password) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ACCESS_COOKIE, ACCESS_GRANTED, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  return response;
}
