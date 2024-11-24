import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("MongoDB connected successfully");
    app.listen(config.port, () => {
      console.log(`App is running on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
main();
