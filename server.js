import express from "express";
import bodyParser from "body-parser";
import analyzeResumeRoute from "./api/analyze-resume.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(bodyParser.json());

app.use("/api/analyze-resume", analyzeResumeRoute);

app.listen(5001, () => {
  console.log("API server running on http://localhost:5001");
});
