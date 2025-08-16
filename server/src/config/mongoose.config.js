import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongo Db Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDb;
