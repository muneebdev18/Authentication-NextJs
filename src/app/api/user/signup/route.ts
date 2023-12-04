import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { emailSend } from "@/helpers/mailer";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    // if user already exist
    const userExist = await User.findOne({ email });
    if (userExist) {
      return NextResponse.json({
        message: "User Already Exist",
        status: 201,
      });
    }
    // bcrypt the password

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    //  Create a new object in User Model
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    // Save the user/ojbect in Database(Model)
    const savedUser = await newUser.save();
    emailSend({
      email: email,
      emialType: "VERIFY",
      userId: savedUser._id,
    });
    return NextResponse.json({
      message: "User Created Successfully",
      success: true,
      data: savedUser,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      error: error,
      status: 500,
    });
  }
}

connect();
