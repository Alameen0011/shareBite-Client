import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

const center = [10.5775104, 76.1987072];

interface LeafletMapProps {
  onLocationSelect: (location: {
    type: string;
    coordinates: number[];
    address: string;
  }) => void;
}

const LeafletMap: React.FC<LeafletMapProps> = ({ onLocationSelect }) => {
  const [selectedPosition, setSelectedPosition] = useState<
    [number, number] | null
  >(null);

  const MapClickHandler = () => {
    useMapEvents({
      //get the geo code of the place user clicks
      click: async (event) => {
        console.log(event, "events");
        const { lat, lng } = event.latlng;
        setSelectedPosition([lat, lng]);

        //Reverse Geocode to get the address
        const address = await getAddressFromCoords(lat, lng);
        console.log(address, "=====Address");
        onLocationSelect({
          type: "Point" as const,
          coordinates: [lng, lat],
          address,
        });
      },
    });
    return null;
  };

  return (
    <div className="h-[400px] w-[700px]">
      <MapContainer
        center={center}
        zoom={17}
        className="h-full w-full"
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
        <MapClickHandler />
        {selectedPosition && <Marker position={selectedPosition} />}
      </MapContainer>
    </div>
  );
};

export default LeafletMap;

//Reverse Geocoding function
async function getAddressFromCoords(lat: number, lng: number): Promise<string> {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
  );
  const data = await res.json();
  console.log(data, "reverse geocode api response");
  return data.display_name || "Unknown Address";
}
