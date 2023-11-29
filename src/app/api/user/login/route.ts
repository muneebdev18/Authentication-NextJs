import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // Check If User is Exist in Database
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        message: "No Account with this email has been registerd",
        status: 404,
      });
    }

    // Compare the Password of the user in Db with the input password
    const comparePassword = await bcryptjs.compare(password, user.password);
    if (!comparePassword) {
      return NextResponse.json({
        message: "Invalid Credentials",
        status: 404,
      });
    }
    // Create Token Data

    const tokenData = {
      username: user.username,
      id: user._id,
      email: user.email,
      password: user.password,
    };

    // JWT Token Create
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRETE!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        token: token,
      },
      message: "Successfully Logged In",
      success: true,
      status: 200,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json({
      error: error,
    });
  }
}

connect();
