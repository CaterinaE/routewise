import { env } from "../utils/env";

type SearchFlightsInput = {
  originIata: string;
  destinationIata: string;
  date: string;
};

export async function searchFlightsLive(input: SearchFlightsInput) {
  const url = new URL("https://www.searchapi.io/api/v1/search");

  url.searchParams.set("engine", "google_flights");
  url.searchParams.set("departure_id", input.originIata);
  url.searchParams.set("arrival_id", input.destinationIata);
  url.searchParams.set("outbound_date", input.date);
  url.searchParams.set("return_date", input.date); // 👈 REQUIRED
  url.searchParams.set("currency", "GBP");
  url.searchParams.set("hl", "en");
  url.searchParams.set("api_key", env.searchApiKey);

  const response = await fetch(url.toString());

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`SearchAPI failed: ${response.status} ${text}`);
  }

  const data: any = await response.json();

  // 🔍 Debug (keep this for now)
  console.log("SearchAPI keys:", Object.keys(data));

  const flights =
    data.best_flights ||
    data.other_flights ||
    data.flights_results ||
    [];

  if (!Array.isArray(flights)) {
    console.error("Flights not array:", flights);
    return [];
  }

  // 🎯 NORMALIZE HERE (critical)
  return flights.map((f: any, i: number) => ({
    id: `flight-${i}`,

    price:
      f.price ||
      f.price_total ||
      f?.price?.value ||
      100,

    departureAirport:
      f.flights?.[0]?.departure_airport?.name ||
      "Unknown",

    arrivalAirport:
      f.flights?.[0]?.arrival_airport?.name ||
      "Unknown",

    duration:
      f.total_duration ||
      f.flights?.[0]?.duration ||
      90,
  }));
}