import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    // Mongo DB connection
    connection.on("connected", () => {
      console.log("Connected Successfully");
    });
    // Connection Error
    connection.on("error", (error) => {
      console.log("Mongo DB Connection Error", error);
      process.exit();
    });
  } catch (error) {
    console.log(error, "Something Went Wrong!");
  }
}
