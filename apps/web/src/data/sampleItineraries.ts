export const sampleItineraries = [
    {
      id: "train-eurostar",
      mode: "TRAIN",
      operator: "Eurostar",
  
      departStation: "London St Pancras",
      arriveStation: "Gare du Nord",
  
      ticketPrice: 89,
      originAccessCost: 5,
      destinationAccessCost: 3,
      addOnFees: 0,
  
      originAccessTime: 15,
      bufferTime: 25,
      travelTime: 140,
      destinationAccessTime: 10,
    },
  
    {
      id: "flight-ryanair",
      mode: "FLIGHT",
      operator: "Ryanair",
  
      departAirport: "London Stansted",
      arriveAirport: "Paris Beauvais",
  
      ticketPrice: 25,
      originAccessCost: 20,
      destinationAccessCost: 17,
      addOnFees: 35,
  
      originAccessTime: 50,
      bufferTime: 120,
      travelTime: 75,
      destinationAccessTime: 70,
    },
  
    {
      id: "flight-ba",
      mode: "FLIGHT",
      operator: "British Airways",
  
      departAirport: "London Heathrow",
      arriveAirport: "Paris CDG",
  
      ticketPrice: 110,
      originAccessCost: 10,
      destinationAccessCost: 12,
      addOnFees: 0,
  
      originAccessTime: 35,
      bufferTime: 120,
      travelTime: 75,
      destinationAccessTime: 35,
    }
  ];