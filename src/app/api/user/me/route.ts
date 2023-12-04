import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { getTokenData } from "@/helpers/getTokenData";

export async function GET(request: NextRequest) {
  try {
    const userId = await getTokenData(request);
    const user = await User.findOne({ _id: userId }).select(
      "-isAdmin -isVerified -password"
    );
    console.log("user", user);
    return NextResponse.json({
      message: "ME Data",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      status: 500,
    });
  }
}
connect();
