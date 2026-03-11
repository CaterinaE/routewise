export function getAddOnsTotal(itinerary: any, extras: any = {}) {
  if (itinerary.mode !== "FLIGHT") {
    return 0;
  }

  return (extras.checkedBag ? 35 : 0) + (extras.seatSelection ? 12 : 0);
}

export function calculateTrueCost(itinerary: any, extras: any = {}) {
  return (
    itinerary.ticketPrice +
    itinerary.originAccessCost +
    itinerary.destinationAccessCost +
    getAddOnsTotal(itinerary, extras)
  );
}

export function calculateTotalTime(itinerary: any) {
  return (
    itinerary.originAccessTime +
    itinerary.bufferTime +
    itinerary.travelTime +
    itinerary.destinationAccessTime
  );
}

export function calculateHiddenCostScore(itinerary: any, extras: any = {}) {
  let score = 0;

  if (itinerary.destinationAccessTime > 60) score += 30;
  if (itinerary.originAccessTime > 40) score += 15;
  if (itinerary.bufferTime > 90) score += 15;

  if (extras.checkedBag && itinerary.mode === "FLIGHT") score += 20;
  if (extras.seatSelection && itinerary.mode === "FLIGHT") score += 10;

  return Math.min(score, 100);
}

export function getHiddenCostLabel(score: number) {
  if (score >= 75) return "High hidden cost";
  if (score >= 40) return "Moderate hidden cost";
  return "Low hidden cost";
}