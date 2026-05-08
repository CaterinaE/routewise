import { useEffect, useMemo, useState } from "react";
import ItineraryCard from "../components/results/ItineraryCard";
import {
  calculateTotalTime,
  calculateTrueCost,
} from "../domain/compute/totals";

type RouteKey = "london-paris" | "nice-paris";
type SortMode = "cheapest" | "fastest";

export default function App() {
  const [route, setRoute] = useState<RouteKey>("london-paris");
  const [sortMode, setSortMode] = useState<SortMode>("cheapest");
  const [checkedBag, setCheckedBag] = useState(false);
  const [seatSelection, setSeatSelection] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(today);
  const [itineraries, setItineraries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);

        const response = await fetch("http://localhost:8080/api/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            route,
            date,
            checkedBag,
            seatSelection,
          }),
        });

        const data = await response.json();
        console.log("API RESPONSE:", data);  setItineraries(data);
          } catch (error) {
        console.error("Failed to fetch itineraries:", error);
        setItineraries([]);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [route, date, checkedBag, seatSelection]);

  const sorted = useMemo(() => {
    return [...itineraries].sort((a, b) => {
      if (sortMode === "fastest") {
        return calculateTotalTime(a) - calculateTotalTime(b);
      }

      const costDiff =
        calculateTrueCost(a, { checkedBag, seatSelection }) -
        calculateTrueCost(b, { checkedBag, seatSelection });

      if (costDiff !== 0) return costDiff;

      return calculateTotalTime(a) - calculateTotalTime(b);
    });
  }, [itineraries, sortMode, checkedBag, seatSelection]);

  const fastestTime = useMemo(() => {
    if (!itineraries.length) return 0;

    return Math.min(
      ...itineraries.map((itinerary) => calculateTotalTime(itinerary))
    );
  }, [itineraries]);

  const routeLabel =
    route === "london-paris" ? "London → Paris" : "Nice → Paris";

  const heroCardStyle: React.CSSProperties = {
    marginTop: "28px",
    padding: "20px",
    borderRadius: "24px",
    background: "rgba(255,255,255,0.92)",
    border: "1px solid #e2e8f0",
    boxShadow: "0 20px 50px rgba(15, 23, 42, 0.08)",
    backdropFilter: "blur(8px)",
  };

  const pillButton = (active: boolean): React.CSSProperties => ({
    padding: "10px 16px",
    borderRadius: "999px",
    border: active ? "1px solid #2563eb" : "1px solid #cbd5e1",
    background: active ? "#eff6ff" : "#fff",
    color: active ? "#1d4ed8" : "#0f172a",
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.2s ease",
  });

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, #dbeafe 0%, #f8fafc 32%, #eef4ff 100%)",
        padding: "48px 20px 72px",
      }}
    >
      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
        <p
          style={{
            margin: 0,
            color: "#2563eb",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            fontSize: "13px",
          }}
        >
          RouteWise
        </p>

        <h1
          style={{
            margin: "14px 0 14px",
            fontSize: "clamp(42px, 7vw, 76px)",
            lineHeight: 0.95,
            color: "#0f172a",
            maxWidth: "980px",
          }}
        >
          See the real price of getting there
        </h1>

        <p
          style={{
            margin: 0,
            maxWidth: "760px",
            color: "#475569",
            fontSize: "20px",
            lineHeight: 1.5,
          }}
        >
          Compare flights and trains with transfer costs, baggage fees,
          access time, and realistic buffers included.
        </p>

        <div style={heroCardStyle}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "minmax(220px, 1.2fr) minmax(220px, 1fr) minmax(180px, 0.9fr)",
              gap: "16px",
              alignItems: "end",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "10px",
                  fontWeight: 700,
                  color: "#0f172a",
                }}
              >
                Route
              </label>
              <select
                value={route}
                onChange={(e) => setRoute(e.target.value as RouteKey)}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "14px",
                  border: "1px solid #cbd5e1",
                  background: "#fff",
                  fontSize: "16px",
                  color: "#0f172a",
                }}
              >
                <option value="london-paris">London → Paris</option>
                <option value="nice-paris">Nice → Paris</option>
              </select>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "10px",
                  fontWeight: 700,
                  color: "#0f172a",
                }}
              >
                Date
              </label>
              <input
  type="date"
  value={date}
  min={today}
  onChange={(e) => setDate(e.target.value)}
  style={{
    width: "100%",
    padding: "14px 16px",
    borderRadius: "14px",
    border: "1px solid #cbd5e1",
    background: "#fff",
    fontSize: "16px",
    color: "#0f172a",
  }}
/>
            </div>

            <div>
              <div
                style={{
                  marginBottom: "10px",
                  fontWeight: 700,
                  color: "#0f172a",
                }}
              >
                Sort by
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={() => setSortMode("cheapest")}
                  style={pillButton(sortMode === "cheapest")}
                >
                  Cheapest
                </button>
                <button
                  onClick={() => setSortMode("fastest")}
                  style={pillButton(sortMode === "fastest")}
                >
                  Fastest
                </button>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "18px",
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <label
              style={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
                color: "#334155",
                fontWeight: 600,
              }}
            >
              <input
                type="checkbox"
                checked={checkedBag}
                onChange={() => setCheckedBag(!checkedBag)}
              />
              Checked bag (+£35)
            </label>

            <label
              style={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
                color: "#334155",
                fontWeight: 600,
              }}
            >
              <input
                type="checkbox"
                checked={seatSelection}
                onChange={() => setSeatSelection(!seatSelection)}
              />
              Seat selection (+£12)
            </label>
          </div>

          <div
            style={{
              marginTop: "18px",
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                padding: "10px 14px",
                borderRadius: "999px",
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                color: "#334155",
                fontWeight: 600,
                fontSize: "14px",
              }}
            >
              City-centre to city-centre
            </div>

            <div
              style={{
                padding: "10px 14px",
                borderRadius: "999px",
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                color: "#334155",
                fontWeight: 600,
                fontSize: "14px",
              }}
            >
              Includes transfer costs
            </div>

            <div
              style={{
                padding: "10px 14px",
                borderRadius: "999px",
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                color: "#334155",
                fontWeight: 600,
                fontSize: "14px",
              }}
            >
              Includes realistic buffers
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "22px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ color: "#475569", fontSize: "15px" }}>
            Showing <strong>{routeLabel}</strong> for <strong>{date}</strong>,
            sorted by <strong>{sortMode}</strong>.
          </div>

          <div
            style={{
              padding: "8px 12px",
              borderRadius: "999px",
              background: "#eef2ff",
              color: "#4338ca",
              fontWeight: 700,
              fontSize: "14px",
            }}
          >
            {sorted.length} options
          </div>
        </div>

        {loading && (
          <div style={{ marginTop: "18px", color: "#475569", fontWeight: 600 }}>
            Loading travel options...
          </div>
        )}

        {!loading && (
          <div style={{ marginTop: "18px" }}>
            {sorted.map((itinerary, index) => (
              <ItineraryCard
                key={itinerary.id}
                itinerary={itinerary}
                isBest={index === 0}
                badgeLabel={
                  sortMode === "cheapest" ? "Best Value" : "Fastest Option"
                }
                extras={{ checkedBag, seatSelection }}
                fastestTime={fastestTime}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}