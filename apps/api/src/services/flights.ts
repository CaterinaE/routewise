import { env } from "../utils/env";

type FlightSearchInput = {
  origin: string;
  destination: string;
  date: string;
};

async function runSearch(input: FlightSearchInput) {
  const url = new URL("https://www.searchapi.io/api/v1/search");

  url.searchParams.set("engine", "google_flights");
  url.searchParams.set("flight_type", "one_way");
  url.searchParams.set("departure_id", input.origin);
  url.searchParams.set("arrival_id", input.destination);
  url.searchParams.set("outbound_date", input.date);
  url.searchParams.set("currency", "GBP");
  url.searchParams.set("hl", "en");
  url.searchParams.set("api_key", env.searchApiKey);

  const response = await fetch(url.toString());

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Flight search failed: ${response.status} ${text}`);
  }

  const data: any = await response.json();

  if (data.error) {
    console.log(`No results for ${input.origin} -> ${input.destination}:`, data.error);
    return [];
  }

  return [...(data.best_flights || []), ...(data.other_flights || [])];
}

export async function searchFlights(date: string) {
  const searches = await Promise.all([
    runSearch({ origin: "LHR", destination: "CDG", date }),
    runSearch({ origin: "LGW", destination: "ORY", date }),
    runSearch({ origin: "STN", destination: "BVA", date }),
  ]);

  return searches.flat();
}