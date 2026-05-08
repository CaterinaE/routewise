import { useState } from "react";
import { searchFlights } from "../../services/api";

export default function SearchForm({ onResults }: any) {
  const [date, setDate] = useState("");

  const handleSearch = async () => {
    const data = await searchFlights("london-paris", date);
    onResults(data);
  };

  return (
    <div>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={handleSearch}>Search Flights</button>
    </div>
  );
}