import { env } from "../utils/env";

type TransferInput = {
  originAddress: string;
  destinationAddress: string;
};

function parseSeconds(duration: string | undefined) {
  if (!duration) return 0;
  return Number(duration.replace("s", ""));
}

export async function getTransitTransfer(input: TransferInput) {
  const response = await fetch(
    "https://routes.googleapis.com/directions/v2:computeRoutes",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": env.googleMapsKey,
        "X-Goog-FieldMask":
          "routes.duration,routes.travelAdvisory.transitFare,routes.legs.steps.transitDetails",
      },
      body: JSON.stringify({
        origin: { address: input.originAddress },
        destination: { address: input.destinationAddress },
        travelMode: "TRANSIT",
      }),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Google Routes failed: ${response.status} ${text}`);
  }

  const data = await response.json();
  const route = data.routes?.[0];

  const durationMinutes = Math.round(parseSeconds(route?.duration) / 60);

  const units = Number(route?.travelAdvisory?.transitFare?.units || 0);
  const nanos =
    Number(route?.travelAdvisory?.transitFare?.nanos || 0) / 1_000_000_000;

  return {
    minutes: durationMinutes,
    cost: units + nanos,
    raw: route,
  };
}