import { Router } from "express";

export const searchRouter = Router();

searchRouter.post("/", async (req, res) => {
  const { route, date, checkedBag = false, seatSelection = false } = req.body;

  const addOnFees = (checkedBag ? 35 : 0) + (seatSelection ? 12 : 0);

  const itineraries =
    route === "nice-paris"
      ? [
          {
            id: "flight-easyjet-liveish",
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
            addOnFees,
            originAccessTime: 25,
            bufferTime: 120,
            travelTime: 90,
            destinationAccessTime: 40
          }
        ]
      : [
          {
            id: "flight-ryanair-liveish",
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
            addOnFees,
            originAccessTime: 50,
            bufferTime: 120,
            travelTime: 75,
            destinationAccessTime: 70
          },
          {
            id: "train-eurostar-liveish",
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
            destinationAccessTime: 10
          }
        ];

  res.json({
    route,
    date,
    itineraries
  });
});
