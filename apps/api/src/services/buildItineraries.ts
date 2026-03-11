import { searchFlightsLive } from "./flights";
import { getTransitTransfer } from "./transfers";

type BuildInput = {
  route: "london-paris" | "nice-paris";
  date: string;
  checkedBag: boolean;
  seatSelection: boolean;
};

const ROUTE_CONFIG = {
  "london-paris": {
    originCityCenter: "King's Cross / St Pancras, London",
    destinationCityCenter: "Châtelet–Les Halles, Paris",
    flightOriginAirportIata: "LON",
    flightDestinationAirportIata: "PAR",
  },
  "nice-paris": {
    originCityCenter: "Nice-Ville, Nice",
    destinationCityCenter: "Châtelet–Les Halles, Paris",
    flightOriginAirportIata: "NCE",
    flightDestinationAirportIata: "PAR",
  },
} as const;

// You will adapt this parser once you inspect the real payload.
function extractFlightItineraries(
  raw: any,
  routeKey: BuildInput["route"],
  transfers: {
    originTransfer: { minutes: number; cost: number };
    destinationTransfer: { minutes: number; cost: number };
  },
  extras: { checkedBag: boolean; seatSelection: boolean }
) {
  const addOnFees = (extras.checkedBag ? 35 : 0) + (extras.seatSelection ? 12 : 0);

  // MVP placeholder parser: map real provider payload once you inspect it.
  // For now, fail loudly if you haven't implemented payload parsing yet.
  const itineraries = raw?.content?.results?.itineraries;

  if (!itineraries) {
    return [];
  }

  return Object.values(itineraries).slice(0, 5).map((it: any, index: number) => ({
    id: `live-flight-${index}`,
    operator: "Live flight",
    mode: "FLIGHT",
    origin: "Departure airport",
    destination: "Arrival airport",
    originTransferLabel: "City centre → departure airport",
    originTransferMethod: "Transit",
    destinationTransferLabel: "Arrival airport → city centre",
    destinationTransferMethod: "Transit",
    ticketPrice: 0, // fill from parsed pricing
    originAccessCost: transfers.originTransfer.cost,
    destinationAccessCost: transfers.destinationTransfer.cost,
    addOnFees,
    originAccessTime: transfers.originTransfer.minutes,
    bufferTime: 120,
    travelTime: 0, // fill from parsed flight duration
    destinationAccessTime: transfers.destinationTransfer.minutes,
  }));
}

export async function buildItineraries(input: BuildInput) {
  const cfg = ROUTE_CONFIG[input.route];

  const [rawFlights, originTransfer, destinationTransfer] = await Promise.all([
    searchFlightsLive({
      originIata: cfg.flightOriginAirportIata,
      destinationIata: cfg.flightDestinationAirportIata,
      date: input.date,
    }),
    getTransitTransfer({
      originAddress: cfg.originCityCenter,
      destinationAddress:
        input.route === "london-paris"
          ? "London Stansted Airport"
          : "Nice Airport",
    }),
    getTransitTransfer({
      originAddress:
        input.route === "london-paris"
          ? "Paris Beauvais Airport"
          : "Paris Orly Airport",
      destinationAddress: cfg.destinationCityCenter,
    }),
  ]);

  const itineraries = extractFlightItineraries(
    rawFlights,
    input.route,
    { originTransfer, destinationTransfer },
    { checkedBag: input.checkedBag, seatSelection: input.seatSelection }
  );

  return {
    route: input.route,
    date: input.date,
    itineraries,
    providerMeta: {
      flightsSource: "Skyscanner Live Prices",
      transfersSource: "Google Routes Transit",
    },
  };
}