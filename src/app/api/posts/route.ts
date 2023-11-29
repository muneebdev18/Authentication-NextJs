import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Posts from "@/models/postModel";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { authId, title, description } = reqBody;

    const newPost = new Posts({
      authId,
      title,
      description,
    });
    const savedPost = await newPost.save();

    const response = NextResponse.json({
      message: "Post Successfully Created,",
      data: savedPost,
      success: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json({
      message: "Error in creating Posts",
      status: 500,
    });
  }
}

export async function GET(request: NextRequest) {
  try {
    const findAllPosts = await Posts.find();
    console.log(findAllPosts);
    return NextResponse.json({
      data: findAllPosts,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Not Found Posts",
      status: 404,
    });
  }
}
connect();
