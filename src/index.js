//#region import package
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import http, { get } from "http";

//#region initialize server
const app = express();
const server = http.createServer(app);
dotenv.config();
const PORT = process.env.PORT || 5000;
//#end region

// app.use(bodyParser.json());

//#region setup middleware
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
//#end region
mongoose.set('strictQuery', true);

//#region import router
import authRouter from "./routers/auth.router.js";
//#end region


//#region setup router
app.use("/auth", authRouter);
//#end region

//#region connect to database
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB!!!");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB: ", error.message);
  });
//#end region

//#region start server
server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
  });
//#end region