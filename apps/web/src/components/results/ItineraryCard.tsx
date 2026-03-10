import { useState } from "react";
import { calculateTrueCost, calculateTotalTime } from "../../domain/compute/totals";

export default function ItineraryCard({ itinerary, isBest }: any) {
  const [open, setOpen] = useState(false);

  const totalCost = calculateTrueCost(itinerary);
  const totalTime = calculateTotalTime(itinerary);

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <article
      style={{
        border: isBest ? "2px solid #4f46e5" : "1px solid #dbe2ea",
        borderRadius: "18px",
        background: "#ffffff",
        padding: "20px",
        marginTop: "18px",
        boxShadow: isBest
          ? "0 12px 30px rgba(79, 70, 229, 0.10)"
          : "0 8px 24px rgba(15, 23, 42, 0.06)",
      }}
    >
      {isBest && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 10px",
            borderRadius: "999px",
            background: "#eef2ff",
            color: "#4338ca",
            fontWeight: 700,
            fontSize: "14px",
            marginBottom: "16px",
          }}
        >
          ⭐ Best Value
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "24px",
              fontWeight: 800,
              color: "#0f172a",
              marginBottom: "8px",
            }}
          >
            {itinerary.operator}
          </div>

          <div
            style={{
              display: "inline-block",
              padding: "6px 10px",
              borderRadius: "999px",
              background: itinerary.mode === "TRAIN" ? "#ecfeff" : "#eff6ff",
              color: itinerary.mode === "TRAIN" ? "#0f766e" : "#1d4ed8",
              fontWeight: 700,
              fontSize: "12px",
              letterSpacing: "0.04em",
            }}
          >
            {itinerary.mode}
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: "30px",
              fontWeight: 800,
              color: "#111827",
            }}
          >
            £{totalCost}
          </div>
          <div style={{ color: "#475569", fontWeight: 600 }}>true total cost</div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "14px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            padding: "14px",
            borderRadius: "14px",
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
          }}
        >
          <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "6px" }}>
            Total travel time
          </div>
          <div style={{ fontSize: "20px", fontWeight: 700 }}>
            {formatDuration(totalTime)}
          </div>
        </div>

        <div
          style={{
            padding: "14px",
            borderRadius: "14px",
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
          }}
        >
          <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "6px" }}>
            Ticket price
          </div>
          <div style={{ fontSize: "20px", fontWeight: 700 }}>£{itinerary.ticketPrice}</div>
        </div>

        <div
          style={{
            padding: "14px",
            borderRadius: "14px",
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
          }}
        >
          <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "6px" }}>
            Transfers + add-ons
          </div>
          <div style={{ fontSize: "20px", fontWeight: 700 }}>
            £
            {itinerary.originAccessCost +
              itinerary.destinationAccessCost +
              itinerary.addOnFees}
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: "18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ color: "#475569" }}>
          Includes access costs, buffers, and optional extras
        </div>

        <button
          onClick={() => setOpen(!open)}
          style={{
            border: "1px solid #cbd5e1",
            background: "#fff",
            color: "#0f172a",
            borderRadius: "12px",
            padding: "10px 14px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {open ? "Hide breakdown" : "View breakdown"}
        </button>
      </div>

      {open && (
        <div
          style={{
            marginTop: "18px",
            paddingTop: "18px",
            borderTop: "1px solid #e2e8f0",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          <div>
            <h4 style={{ marginTop: 0, marginBottom: "12px" }}>Cost breakdown</h4>
            <p>Ticket: £{itinerary.ticketPrice}</p>
            <p>Origin transfer: £{itinerary.originAccessCost}</p>
            <p>Destination transfer: £{itinerary.destinationAccessCost}</p>
            <p>Add-ons: £{itinerary.addOnFees}</p>
            <p style={{ fontWeight: 800 }}>Total: £{totalCost}</p>
          </div>

          <div>
            <h4 style={{ marginTop: 0, marginBottom: "12px" }}>Time breakdown</h4>
            <p>Origin access: {itinerary.originAccessTime} min</p>
            <p>Buffer time: {itinerary.bufferTime} min</p>
            <p>Travel time: {itinerary.travelTime} min</p>
            <p>Destination access: {itinerary.destinationAccessTime} min</p>
            <p style={{ fontWeight: 800 }}>Total: {formatDuration(totalTime)}</p>
          </div>
        </div>
      )}
    </article>
  );
}