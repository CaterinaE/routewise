import { sampleItineraries } from "../data/sampleItineraries";
import ItineraryCard from "../components/results/ItineraryCard";
import { calculateTrueCost } from "../domain/compute/totals";

export default function App() {
  const sorted = [...sampleItineraries].sort(
    (a, b) => calculateTrueCost(a) - calculateTrueCost(b)
  );

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #f8fafc 0%, #eef4ff 100%)",
        padding: "48px 20px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <p
          style={{
            margin: 0,
            color: "#2563eb",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            fontSize: "13px",
          }}
        >
          RouteWise
        </p>

        <h1
          style={{
            margin: "10px 0 12px",
            fontSize: "64px",
            lineHeight: 1,
            color: "#0f172a",
          }}
        >
          Compare the true cost of travel
        </h1>

        <p
          style={{
            margin: 0,
            maxWidth: "760px",
            color: "#475569",
            fontSize: "18px",
          }}
        >
          Door-to-door comparisons that include ticket price, transfer costs,
          add-ons, and realistic time buffers.
        </p>

        <div
          style={{
            marginTop: "28px",
            padding: "18px 20px",
            borderRadius: "18px",
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
          }}
        >
          <strong>Route:</strong> London → Paris
        </div>

        <div style={{ marginTop: "24px" }}>
          {sorted.map((itinerary, index) => (
            <ItineraryCard
              key={itinerary.id}
              itinerary={itinerary}
              isBest={index === 0}
            />
          ))}
        </div>
      </div>
    </main>
  );
}