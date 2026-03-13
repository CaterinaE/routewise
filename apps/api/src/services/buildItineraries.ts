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

  return flights.map((flight: any, index: number) => {
    const firstLeg = flight.flights?.[0];
    const lastLeg = flight.flights?.[flight.flights.length - 1];

    const departureAirport = firstLeg?.departure_airport?.name || "Departure airport";
    const arrivalAirport = lastLeg?.arrival_airport?.name || "Arrival airport";

    let originAccessCost = 20;
    let originAccessTime = 50;
    let destinationAccessCost = 15;
    let destinationAccessTime = 45;

    if (departureAirport.includes("Heathrow")) {
      originAccessCost = 12;
      originAccessTime = 35;
    }

    if (departureAirport.includes("Gatwick")) {
      originAccessCost = 18;
      originAccessTime = 45;
    }

    if (departureAirport.includes("Stansted")) {
      originAccessCost = 20;
      originAccessTime = 50;
    }

    if (arrivalAirport.includes("Beauvais")) {
      destinationAccessCost = 17;
      destinationAccessTime = 70;
    }

    if (arrivalAirport.includes("Orly")) {
      destinationAccessCost = 12;
      destinationAccessTime = 40;
    }

    if (arrivalAirport.includes("Charles de Gaulle")) {
      destinationAccessCost = 11;
      destinationAccessTime = 45;
    }

    console.log("flight.total_duration:", flight.total_duration);

    return {
      id: `flight-${index}`,
      operator: flight.airline || "Flight",
      mode: "FLIGHT",
      origin: departureAirport,
      destination: arrivalAirport,
      originTransferLabel: `King's Cross → ${departureAirport}`,
      originTransferMethod: "Rail / Tube",
      destinationTransferLabel: `${arrivalAirport} → Châtelet–Les Halles`,
      destinationTransferMethod: "Transit",
      ticketPrice: Number(flight.price || 0),
      originAccessCost,
      destinationAccessCost,
      addOnFees,
      originAccessTime,
      bufferTime: 120,
      travelTime: parseDurationToMinutes(flight.total_duration),
      destinationAccessTime,
    };
  });
}