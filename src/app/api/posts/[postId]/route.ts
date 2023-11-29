import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Posts from "@/models/postModel";
export async function DELETE(request: NextRequest, { params }: any) {
  const { postId } = params;
  try {
    console.log("id", postId);
    const deletePost = await Posts.findByIdAndDelete(postId);
    console.log(deletePost);
    if (!deletePost) {
      return NextResponse.json({
        message: "Not Found",
        status: 404,
      });
    }
    return NextResponse.json({
      message: "Deleted Successfully",
      deletePost,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error in Delete Post",
      status: 500,
    });
  }
}

export async function PATCH(request: NextRequest, { params }: any) {
  const { postId } = params;
  console.log(postId);

  try {
    const reqBody = await request.json();
    const { title, description } = reqBody;

    const findPost = await Posts.findById(postId);
    console.log(findPost);

    if (!findPost) {
      return NextResponse.json({
        message: "Not Found Posts",
        status: 404,
      });
    }
    if (title) {
      findPost.title = title;
    }
    if (description) {
      findPost.description = description;
    }
    const savedPost = await findPost.save();
    return NextResponse.json({
      message: savedPost,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Not Found ",
      status: 404,
    });
  }
}

connect();
