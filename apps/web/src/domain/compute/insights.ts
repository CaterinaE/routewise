import { calculateTotalTime } from "./totals";

export function generateInsight(
  itinerary: any,
  fastestTime: number
): string | null {

  const totalTime = calculateTotalTime(itinerary);
  const diff = totalTime - fastestTime;

  if (diff > 0) {
    const hours = Math.floor(diff / 60);
    const mins = diff % 60;

    if (hours > 0) {
      return `⚡ ${hours}h ${mins}m slower than the fastest option`;
    }

    return `⚡ ${mins} min slower than the fastest option`;
  }

  if (itinerary.mode === "TRAIN") {
    return "🚆 Direct city-centre arrival";
  }

  return null;
}