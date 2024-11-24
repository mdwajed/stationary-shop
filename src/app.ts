// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import router from "./routes/routes";

// import bodyParser from "body-parser";
// import connectDB from "./utils/connectDB";

// // Load environment variables from .env file
// dotenv.config();

// const app = express();
// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// app.use(express.json());
// // Connect to MongoDB
// connectDB();

// // Routes
// app.use("/api", router);
// export default app;
import express, { Application, Request, Response } from "express";
import cors from "cors";
const app: Application = express();

const port = 5000;

// middleware
app.use(express.json());
app.use(cors());
app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

console.log(process.cwd());
export default app;
