import mongoose, { ConnectOptions } from "mongoose";

// Extend mongoose module with deprecated options
interface DeprecatedConnectOptions extends ConnectOptions {
  useNewUrlParser?: boolean;
  useUnifiedTopology?: boolean;
}

export const connectDb = () => {
  try {
    const mongoURI: string = process.env.MONGODB_URI || ""; // Ensure to replace with your actual environment variable

    const options: DeprecatedConnectOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    mongoose
      .connect(mongoURI, options)
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((error) => {
        console.error("Error connecting to MongoDB:", error.message);
      });
  } catch (error) {
    console.error("Error in connectDb:", (error as Error).message);
  }
};
