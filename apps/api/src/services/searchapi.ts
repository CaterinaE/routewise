import { env } from "../utils/env";

type SearchFlightsInput = {
  originIata: string;
  destinationIata: string;
  date: string; // YYYY-MM-DD
};

export async function searchFlightsLive(input: SearchFlightsInput) {
  const url = new URL("https://www.searchapi.io/api/v1/search");

  url.searchParams.set("engine", "google_flights");
  url.searchParams.set("departure_id", input.originIata);
  url.searchParams.set("arrival_id", input.destinationIata);
  url.searchParams.set("outbound_date", input.date);
  url.searchParams.set("currency", "GBP");
  url.searchParams.set("hl", "en");
  url.searchParams.set("api_key", env.searchApiKey);

  const response = await fetch(url.toString());

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`SearchAPI failed: ${response.status} ${text}`);
  }

  return response.json();
}