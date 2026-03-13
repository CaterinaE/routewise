import "dotenv/config";
import express from "express";
import { searchRouter } from "./routes/search";
const app = express();
app.use(express.json());

app.use("/api/search", searchRouter);

app.listen(8080, () => {
  console.log("API running on http://localhost:8080");
});