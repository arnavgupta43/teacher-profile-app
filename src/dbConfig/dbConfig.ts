import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.mongo_url!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("mongoDB connected");
    });
    connection.on("error", (err) => {
      console.log("error during connection");
      console.log(err);
    });
  } catch (error) {
    console.log("Something went wrong");
    console.log(error);
  }
}
