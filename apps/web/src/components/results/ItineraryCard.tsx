import { useState } from "react";
import { generateInsight } from "../../domain/compute/insights";
import {
  calculateTrueCost,
  calculateTotalTime,
  calculateHiddenCostScore,
  getHiddenCostLabel,
  getAddOnsTotal,
} from "../../domain/compute/totals";

export default function ItineraryCard({
  itinerary,
  isBest,
  badgeLabel,
  extras,
}: any) {
  const [open, setOpen] = useState(false);

  const totalCost = calculateTrueCost(itinerary, extras);
  const totalTime = calculateTotalTime(itinerary);
  const insight = generateInsight(itinerary, totalTime);

  const addOnsTotal = getAddOnsTotal(itinerary, extras);

  const transfersAndAddOns =
    itinerary.originAccessCost + itinerary.destinationAccessCost + addOnsTotal;

  const hiddenCostScore = calculateHiddenCostScore(itinerary, extras);
  const hiddenCostLabel = getHiddenCostLabel(hiddenCostScore);

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const scoreColor =
    hiddenCostScore >= 60
      ? "#b91c1c"
      : hiddenCostScore >= 30
      ? "#b45309"
      : "#15803d";

  const scoreBackground =
    hiddenCostScore >= 60
      ? "#fee2e2"
      : hiddenCostScore >= 30
      ? "#fef3c7"
      : "#dcfce7";

  const showRemoteAirportWarning =
    itinerary.mode === "FLIGHT" && itinerary.destinationAccessTime >= 60;

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
        <>
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
              marginBottom: "8px",
            }}
          >
            ⭐ {badgeLabel}
          </div>

          <div
            style={{
              marginBottom: "14px",
              fontSize: "13px",
              color: "#475569",
              fontWeight: 500,
            }}
          >
            Lowest total cost including transfers
          </div>
        </>
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
              marginBottom: "4px",
            }}
          >
            {itinerary.operator}
          </div>

          <div
            style={{
              marginTop: "6px",
              fontSize: "14px",
              color: "#475569",
              fontWeight: 600,
            }}
          >
            {itinerary.origin} → {itinerary.destination}
          </div>

          <div
            style={{
              marginTop: "8px",
              display: "inline-block",
              padding: "6px 10px",
              borderRadius: "999px",
              background: itinerary.mode === "TRAIN" ? "#ecfeff" : "#eff6ff",
              color: itinerary.mode === "TRAIN" ? "#0f766e" : "#1d4ed8",
              fontWeight: 700,
              fontSize: "12px",
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
          <div style={{ color: "#475569", fontWeight: 600 }}>
            true total cost
          </div>
        </div>
      </div>

      {showRemoteAirportWarning && (
        <div
          style={{
            marginTop: "16px",
            padding: "12px 14px",
            borderRadius: "12px",
            background: "#fff7ed",
            border: "1px solid #fdba74",
            color: "#9a3412",
            fontWeight: 700,
          }}
        >
          ⚠ Remote airport — {itinerary.destinationAccessTime} min transfer to city
          centre
        </div>
      )}

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
          <div style={{ fontSize: "20px", fontWeight: 700 }}>
            £{itinerary.ticketPrice}
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
            Transfers + add-ons
          </div>
          <div style={{ fontSize: "20px", fontWeight: 700 }}>
            £{transfersAndAddOns}
          </div>
        </div>

        <div
          style={{
            padding: "14px",
            borderRadius: "14px",
            background: scoreBackground,
            border: "1px solid #e2e8f0",
          }}
        >
          <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "6px" }}>
            Hidden cost score
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: 800,
              color: scoreColor,
            }}
          >
            {hiddenCostScore}/100
          </div>
          <div style={{ marginTop: "4px", color: scoreColor, fontWeight: 700 }}>
            {hiddenCostLabel}
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: "16px",
          padding: "14px 16px",
          borderRadius: "14px",
          background: "#eef2ff",
          border: "1px solid #c7d2fe",
          color: "#3730a3",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        💡 <span>{insight}</span>
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
          }}
        >
          <h4 style={{ marginTop: 0, marginBottom: "16px" }}>Cost breakdown</h4>

          <div
            style={{
              display: "grid",
              gap: "10px",
              maxWidth: "420px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Ticket</span>
              <span>£{itinerary.ticketPrice}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Origin transfer</span>
              <span>£{itinerary.originAccessCost}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Destination transfer</span>
              <span>£{itinerary.destinationAccessCost}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Add-ons</span>
              <span>£{addOnsTotal}</span>
            </div>

            <div
              style={{
                borderTop: "1px solid #e2e8f0",
                paddingTop: "10px",
                display: "flex",
                justifyContent: "space-between",
                fontWeight: 800,
              }}
            >
              <span>Total</span>
              <span>£{totalCost}</span>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}