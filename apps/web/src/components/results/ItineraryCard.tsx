import { calculateTrueCost, calculateTotalTime } from "../../domain/compute/totals";

export default function ItineraryCard({ itinerary }: any) {
  const cost = calculateTrueCost(itinerary);
  const time = calculateTotalTime(itinerary);

  return (
    <div style={{
      border: "1px solid #ddd",
      padding: "20px",
      borderRadius: "10px",
      marginTop: "20px"
    }}>
      <h3>{itinerary.operator}</h3>

      <p>Mode: {itinerary.mode}</p>

      <p>
        <strong>Total Cost:</strong> £{cost}
      </p>

      <p>
        <strong>Total Time:</strong> {time} minutes
      </p>
    </div>
  );
}