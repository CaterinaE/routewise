export async function searchFlights(route: string, date: string) {
    const res = await fetch("http://localhost:8080/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ route, date }),
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch flights");
    }
  
    return res.json();
  }