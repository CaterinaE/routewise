import { calculateTotalTime } from "./totals";

export function generateInsight(itinerary: any, fastestTime: number): string {
  const totalTime = calculateTotalTime(itinerary);
  const timeDifference = totalTime - fastestTime;

  if (itinerary.mode === "FLIGHT" && itinerary.destinationAccessTime > 60) {
    return "Remote airport adds significant travel time.";
  }

  if (timeDifference > 90) {
    return "This option is significantly slower than alternatives.";
  }

  if (itinerary.mode === "TRAIN") {
    return "Arrives directly in the city centre.";
  }

  return "Balanced travel option.";
}