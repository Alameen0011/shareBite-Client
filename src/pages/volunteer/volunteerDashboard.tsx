import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns"
import { useNavigate } from "react-router-dom";



const VolunteerDashboard = () => {

  const donations = [
    {
      "_id": "67f0b4e616e1d3b0a3ac26e3",
      "title": "Chicken Biryani - 3 Boxes",
      "type": "non-perishable",
      "quantity": 3,
      "image": "https://res.cloudinary.com/dsd7v2q51/image/upload/v1743828191/sharebite/donations/l04wb8vcb24ktyfp8stz.jpg",
      "pickupLocation": {
        "type": "Point",
        "coordinates": [76.27305269234058, 10.853223780269522],
        "address": "Ottappalam, Palakkad, Kerala, 679335, India"
      },
      "status": "pending",
      "volunteer": null,
      "kiosk": null,
      "createdAt": "2025-04-05T04:43:18.356Z",
      "updatedAt": "2025-04-05T04:43:18.356Z"
    },
    {
      "_id": "67f0b4e616e1d3b0a3ac29a1",
      "title": "Veg Fried Rice & Manchurian (2 Packs)",
      "type": "perishable",
      "quantity": 2,
      "image": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
      "pickupLocation": {
        "type": "Point",
        "coordinates": [76.2715, 10.8502],
        "address": "Cherpulassery, Palakkad, Kerala"
      },
      "status": "pending",
      "volunteer": null,
      "kiosk": null,
      "createdAt": "2025-04-09T09:23:10.000Z",
      "updatedAt": "2025-04-09T09:23:10.000Z"
    },
    {
      "_id": "67f0b4e616e1d3b0a3ac29a1",
      "title": "Veg Fried Rice & Manchurian (2 Packs)",
      "type": "perishable",
      "quantity": 2,
      "image": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
      "pickupLocation": {
        "type": "Point",
        "coordinates": [76.2715, 10.8502],
        "address": "Cherpulassery, Palakkad, Kerala"
      },
      "status": "pending",
      "volunteer": null,
      "kiosk": null,
      "createdAt": "2025-04-09T09:23:10.000Z",
      "updatedAt": "2025-04-09T09:23:10.000Z"
    },
    {
      "_id": "67f0b4e616e1d3b0a3ac29a1",
      "title": "Veg Fried Rice & Manchurian (2 Packs)",
      "type": "perishable",
      "quantity": 2,
      "image": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
      "pickupLocation": {
        "type": "Point",
        "coordinates": [76.2715, 10.8502],
        "address": "Cherpulassery, Palakkad, Kerala"
      },
      "status": "pending",
      "volunteer": null,
      "kiosk": null,
      "createdAt": "2025-04-09T09:23:10.000Z",
      "updatedAt": "2025-04-09T09:23:10.000Z"
    },
    {
      "_id": "67f0b4e616e1d3b0a3ac29a1",
      "title": "Veg Fried Rice & Manchurian (2 Packs)",
      "type": "perishable",
      "quantity": 2,
      "image": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
      "pickupLocation": {
        "type": "Point",
        "coordinates": [76.2715, 10.8502],
        "address": "Cherpulassery, Palakkad, Kerala"
      },
      "status": "pending",
      "volunteer": null,
      "kiosk": null,
      "createdAt": "2025-04-09T09:23:10.000Z",
      "updatedAt": "2025-04-09T09:23:10.000Z"
    },
    {
      "_id": "67f0b4e616e1d3b0a3ac29a1",
      "title": "Veg Fried Rice & Manchurian (2 Packs)",
      "type": "perishable",
      "quantity": 2,
      "image": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
      "pickupLocation": {
        "type": "Point",
        "coordinates": [76.2715, 10.8502],
        "address": "Cherpulassery, Palakkad, Kerala"
      },
      "status": "pending",
      "volunteer": null,
      "kiosk": null,
      "createdAt": "2025-04-09T09:23:10.000Z",
      "updatedAt": "2025-04-09T09:23:10.000Z"
    },
   
  ]

  const [donation,setDonation] = useState(donations)
  const navigate  = useNavigate()

  const handleClaim = (donation) => {
    console.log(donation,"claimed")
    navigate(`/volunteer/navigation`, {
      state: {
        coordinates: donation.pickupLocation.coordinates, // e.g. [lat, lng]
        id: donation._id, // if needed for marking as claimed
      },
    })
    
  }
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2  gap-6">
    {donation.length === 0 ? (
      <p className="text-muted-foreground text-center">
        No donations available nearby.
      </p>
    ) : (
      donation.map((donation) => (
        <Card key={donation._id} className="shadow-lg">
          <CardContent className="p-4 space-y-2">
            <div className="flex gap-4">
              <img
                src={donation.image}
                alt={donation.type}
                className="w-20 h-20 object-cover rounded-xl"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold capitalize">
                  {donation.title}
                </h3>
                <p>📍 {donation.pickupLocation.address}</p>
                <p>🕒 {formatDistanceToNow(new Date(donation.createdAt), { addSuffix: true })}</p>
                <p>📦 Quantity: {donation.quantity}</p>
              </div>
            </div>

            <Button
              className=" w-full mt-2 bg-green-500"
              onClick={() => handleClaim(donation)}
            >
              Claim
            </Button>
          </CardContent>
        </Card>
      ))
    )}
  </div>
  );
};

export default VolunteerDashboard;
