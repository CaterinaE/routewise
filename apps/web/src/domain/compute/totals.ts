export function calculateTrueCost(itinerary: any) {
    return (
      itinerary.ticketPrice +
      itinerary.originAccessCost +
      itinerary.destinationAccessCost +
      itinerary.addOnFees
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