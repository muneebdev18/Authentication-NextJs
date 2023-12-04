import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({
        error: "Invalid Token",
        status: 500,
      });
    }
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    const savedUser = await user.save();

    return NextResponse.json({
      message: "Successfully Email Verified",
      status: 200,
    });
  } catch (error: any) {
    console.log("error in email verify", error.message);
  }
}
connect();
