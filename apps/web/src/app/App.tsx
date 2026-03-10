import { sampleItineraries } from "../data/sampleItineraries";
import ItineraryCard from "../components/results/ItineraryCard";

export default function App() {
  return (
    <div style={{ padding: 40 }}>
      <h1>RouteWise</h1>
      <p>Compare the true door-to-door cost of travel</p>

      {sampleItineraries.map((itinerary) => (
        <ItineraryCard key={itinerary.id} itinerary={itinerary} />
      ))}
    </div>
  );
}