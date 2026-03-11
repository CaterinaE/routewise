import express from "express";
import cors from "cors";
import { searchRouter } from "./routes/search";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/search", searchRouter);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
