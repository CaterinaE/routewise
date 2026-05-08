export default function FlightResults({ flights }: any) {
    return (
      <div>
        {flights.map((f: any) => (
          <div key={f.id}>
            <h3>{f.origin} → {f.destination}</h3>
            <p>£{f.ticketPrice}</p>
            <p>{f.travelTime} mins</p>
          </div>
        ))}
      </div>
    );
  }