import { env } from "../utils/env";

type SearchFlightsInput = {
  originIata: string;
  destinationIata: string;
  date: string; // YYYY-MM-DD
};

function toDateParts(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return { year, month, day };
}

export async function createSkyscannerSearch(input: SearchFlightsInput) {
  const { year, month, day } = toDateParts(input.date);

  const response = await fetch(
    "https://partners.api.skyscanner.net/apiservices/v3/flights/live/search/create",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": env.skyscannerApiKey,
      },
      body: JSON.stringify({
        query: {
          market: "UK",
          locale: "en-GB",
          currency: "GBP",
          queryLegs: [
            {
              originPlaceId: { iata: input.originIata },
              destinationPlaceId: { iata: input.destinationIata },
              date: { year, month, day },
            },
          ],
          adults: 1,
          cabinClass: "CABIN_CLASS_ECONOMY",
        },
      }),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Skyscanner create failed: ${response.status} ${text}`);
  }

  return response.json();
}

export async function pollSkyscannerSearch(sessionToken: string) {
  const response = await fetch(
    `https://partners.api.skyscanner.net/apiservices/v3/flights/live/search/poll/${sessionToken}`,
    {
      method: "POST",
      headers: {
        "x-api-key": env.skyscannerApiKey,
      },
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Skyscanner poll failed: ${response.status} ${text}`);
  }

  return response.json();
}

export async function searchFlightsLive(input: SearchFlightsInput) {
  const created = await createSkyscannerSearch(input);
  const sessionToken = created?.sessionToken;

  if (!sessionToken) {
    throw new Error("No Skyscanner sessionToken returned");
  }

  // Simple MVP: poll once or twice
  const poll1 = await pollSkyscannerSearch(sessionToken);

  return poll1;
}