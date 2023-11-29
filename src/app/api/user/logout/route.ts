import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "User Successfully Logged Out",
      success: true,
    });
    response.cookies.set("token", "", { httpOnly: true });
    return response;
  } catch (error) {
    return NextResponse.json({
      message: "Not Logged Out",
      status: 500,
    });
  }
}
