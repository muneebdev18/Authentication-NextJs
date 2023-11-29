import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  authId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: [true, "Please Enter Title"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter Description"],
  },
});

const Posts = mongoose.models.posts || mongoose.model("posts", postSchema);
export default Posts;
