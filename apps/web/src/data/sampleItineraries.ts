export const itinerariesByRoute = {
    "london-paris": [
      {
        id: "train-eurostar",
        operator: "Eurostar",
        mode: "TRAIN",
        origin: "London St Pancras",
        destination: "Paris Gare du Nord",
  
        originTransferLabel: "King's Cross / St Pancras → London St Pancras",
        originTransferMethod: "Walk / Tube",
        destinationTransferLabel: "Paris Gare du Nord → Châtelet–Les Halles",
        destinationTransferMethod: "RER / Metro",
  
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
        operator: "Ryanair",
        mode: "FLIGHT",
        origin: "London Stansted",
        destination: "Paris Beauvais",
  
        originTransferLabel: "King's Cross → London Stansted",
        originTransferMethod: "Train",
        destinationTransferLabel: "Paris Beauvais → Châtelet–Les Halles",
        destinationTransferMethod: "Shuttle + Metro",
  
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
        operator: "British Airways",
        mode: "FLIGHT",
        origin: "London Heathrow",
        destination: "Paris CDG",
  
        originTransferLabel: "King's Cross → London Heathrow",
        originTransferMethod: "Tube / Elizabeth line",
        destinationTransferLabel: "Paris CDG → Châtelet–Les Halles",
        destinationTransferMethod: "RER B",
  
        ticketPrice: 110,
        originAccessCost: 10,
        destinationAccessCost: 12,
        addOnFees: 0,
  
        originAccessTime: 35,
        bufferTime: 120,
        travelTime: 75,
        destinationAccessTime: 35,
      },
    ],
  
    "nice-paris": [
      {
        id: "train-tgv",
        operator: "TGV",
        mode: "TRAIN",
        origin: "Nice-Ville",
        destination: "Paris Gare de Lyon",
  
        originTransferLabel: "Nice city centre → Nice-Ville",
        originTransferMethod: "Walk / Tram",
        destinationTransferLabel: "Paris Gare de Lyon → Châtelet–Les Halles",
        destinationTransferMethod: "RER / Metro",
  
        ticketPrice: 65,
        originAccessCost: 4,
        destinationAccessCost: 3,
        addOnFees: 0,
  
        originAccessTime: 10,
        bufferTime: 25,
        travelTime: 360,
        destinationAccessTime: 10,
      },
  
      {
        id: "flight-easyjet",
        operator: "easyJet",
        mode: "FLIGHT",
        origin: "Nice Airport",
        destination: "Paris Orly",
  
        originTransferLabel: "Nice-Ville → Nice Airport",
        originTransferMethod: "Tram",
        destinationTransferLabel: "Paris Orly → Châtelet–Les Halles",
        destinationTransferMethod: "Orlyval / Metro",
  
        ticketPrice: 45,
        originAccessCost: 12,
        destinationAccessCost: 12,
        addOnFees: 30,
  
        originAccessTime: 25,
        bufferTime: 120,
        travelTime: 90,
        destinationAccessTime: 40,
      },
    ],
  };