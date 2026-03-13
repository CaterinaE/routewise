import { Router } from "express";
import { buildItineraries } from "../services/buildItineraries";

export const searchRouter = Router();

searchRouter.post("/", async (req, res) => {
  try {
    const { route, date, checkedBag = false, seatSelection = false } = req.body;

    if (!route || !date) {
      return res.status(400).json({ error: "route and date are required" });
    }

    const result = await buildItineraries({
      route,
      date,
      checkedBag,
      seatSelection,
    });

    res.json(result);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch flights",
      detail: error?.message || "Unknown error",
    });
  }
});