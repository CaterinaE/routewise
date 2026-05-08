import { searchFlights } from "./flights";

type BuildInput = {
  route: "london-paris" | "nice-paris";
  date: string;
  checkedBag: boolean;
  seatSelection: boolean;
};

function parseDurationToMinutes(value: any) {
    if (typeof value === "number") {
      return value;
    }
  
    if (typeof value !== "string") {
      return 0;
    }
  
    const hrMatch = value.match(/(\d+)\s*hr/);
    const minMatch = value.match(/(\d+)\s*min/);
  
    const hours = hrMatch ? Number(hrMatch[1]) : 0;
    const minutes = minMatch ? Number(minMatch[1]) : 0;
  
    return hours * 60 + minutes;
  }

export async function buildItineraries(input: BuildInput) {
  if (input.route !== "london-paris") {
    return [];
  }

  const addOnFees =
    (input.checkedBag ? 35 : 0) + (input.seatSelection ? 12 : 0);

  const flights = await searchFlights(input.date);

  const mappedFlights = flights.map((flight: any, index: number) => {
    return {
      id: `flight-${index}`,
      operator: "Flight",
      mode: "FLIGHT", 
      origin: flight.flights?.[0]?.departure_airport?.name || "Unknown",
      destination: flight.flights?.[0]?.arrival_airport?.name || "Unknown",
      travelTime: flight.total_duration || 0, 
      ticketPrice: flight.price || 0,
      originAccessCost: 12,
      destinationAccessCost: 11,
      originAccessTime: 35,
      bufferTime: 120,
      destinationAccessTime: 45,
    };
  });
  const cleanedFlights = mappedFlights
    .filter((f) => f.ticketPrice > 0)
    .filter((f) => f.travelTime > 0 && f.travelTime <= 180)
    .sort((a, b) => a.ticketPrice - b.ticketPrice)
    .slice(0, 8);
    console.log("Mapped flights:", mappedFlights.slice(0, 3));
  return cleanedFlights;
}