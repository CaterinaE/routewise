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
  fastestTime,
}: any) {
  const [open, setOpen] = useState(false);

  const totalCost = calculateTrueCost(itinerary, extras);
  const totalTime = calculateTotalTime(itinerary);
  const insight = generateInsight(itinerary, fastestTime);

  const addOnsTotal = getAddOnsTotal(itinerary, extras);

  const transfersAndAddOns =
    itinerary.originAccessCost +
    itinerary.destinationAccessCost +
    addOnsTotal;

  const hiddenCostScore = calculateHiddenCostScore(itinerary, extras);
  const hiddenCostLabel = getHiddenCostLabel(hiddenCostScore);

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const scoreColor =
    hiddenCostScore >= 75
      ? "#b91c1c"
      : hiddenCostScore >= 40
      ? "#b45309"
      : "#15803d";

  const scoreBackground =
    hiddenCostScore >= 75
      ? "#fee2e2"
      : hiddenCostScore >= 40
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
          ? "0 12px 30px rgba(79,70,229,0.10)"
          : "0 8px 24px rgba(15,23,42,0.06)",
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
          <div style={{ fontSize: "30px", fontWeight: 800 }}>
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
          ⚠ {itinerary.destination} is {itinerary.destinationAccessTime} min
          from the city centre
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
        <Stat label="Total travel time" value={formatDuration(totalTime)} />
        <Stat label="Ticket price" value={`£${itinerary.ticketPrice}`} />
        <Stat label="Transfers + add-ons" value={`£${transfersAndAddOns}`} />

        <div
          style={{
            padding: "14px",
            borderRadius: "14px",
            background: scoreBackground,
            border: "1px solid #e2e8f0",
          }}
        >
          <div style={{ fontSize: "12px", color: "#64748b" }}>
            Hidden cost score
          </div>

          <div style={{ fontSize: "20px", fontWeight: 800, color: scoreColor }}>
            {hiddenCostScore}/100
          </div>

          <div style={{ color: scoreColor, fontWeight: 700 }}>
            {hiddenCostLabel}
          </div>
        </div>
      </div>

      {insight && (
        <div
          style={{
            marginTop: "16px",
            padding: "14px",
            borderRadius: "14px",
            background: "#eef2ff",
            border: "1px solid #c7d2fe",
            color: "#3730a3",
            fontWeight: 600,
          }}
        >
          💡 {insight}
        </div>
      )}

      <div
        style={{
          marginTop: "18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          <CostBreakdown
            itinerary={itinerary}
            addOnsTotal={addOnsTotal}
            totalCost={totalCost}
          />

          <JourneyTimeline
            itinerary={itinerary}
            totalTime={totalTime}
            formatDuration={formatDuration}
          />
        </div>
      )}
    </article>
  );
}

function Stat({ label, value }: any) {
  return (
    <div
      style={{
        padding: "14px",
        borderRadius: "14px",
        background: "#f8fafc",
        border: "1px solid #e2e8f0",
      }}
    >
      <div style={{ fontSize: "12px", color: "#64748b" }}>{label}</div>
      <div style={{ fontSize: "20px", fontWeight: 700 }}>{value}</div>
    </div>
  );
}

function CostBreakdown({ itinerary, addOnsTotal, totalCost }: any) {
  return (
    <div>
      <h4>Cost breakdown</h4>

      <Row label="Ticket" value={`£${itinerary.ticketPrice}`} />
      <Row label="Origin transfer" value={`£${itinerary.originAccessCost}`} />
      <Row
        label="Destination transfer"
        value={`£${itinerary.destinationAccessCost}`}
      />
      <Row label="Add-ons" value={`£${addOnsTotal}`} />

      <div
        style={{
          borderTop: "1px solid #e2e8f0",
          marginTop: "8px",
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
  );
}

function JourneyTimeline({ itinerary, totalTime, formatDuration }: any) {
  return (
    <div>
      <h4>Journey timeline</h4>

      <TimelineItem
        icon="🚆"
        label={itinerary.originTransferLabel}
        time={itinerary.originAccessTime}
      />

      <TimelineItem
        icon={itinerary.mode === "FLIGHT" ? "🛫" : "🚉"}
        label={`${itinerary.origin} → ${itinerary.destination}`}
        time={itinerary.travelTime}
      />

      <TimelineItem
        icon="🚌"
        label={itinerary.destinationTransferLabel}
        time={itinerary.destinationAccessTime}
      />

      <div style={{ marginTop: "12px", color: "#475569", fontWeight: 600 }}>
        Door-to-door total: {formatDuration(totalTime)}
      </div>
    </div>
  );
}

function TimelineItem({ icon, label, time }: any) {
  return (
    <div
      style={{
        padding: "12px 14px",
        borderRadius: "12px",
        background: "#f8fafc",
        border: "1px solid #e2e8f0",
        marginBottom: "10px",
      }}
    >
      {icon} {label} — {time} min
    </div>
  );
}

function Row({ label, value }: any) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}