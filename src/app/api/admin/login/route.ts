import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    // Server-side password check (environment variable CPC_TEAM_PASSWORD or fallback)
    const expectedPassword = process.env.CPC_TEAM_PASSWORD || "cpc2026admin";

    if (password === expectedPassword) {
      const response = NextResponse.json(
        { success: true, message: "CPC Team authenticated." },
        { status: 200 }
      );

      // Set HttpOnly session cookie
      response.cookies.set("cpc_team_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 8, // 8 hours
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: "Invalid password." },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Server authentication error." },
      { status: 500 }
    );
  }
}
