import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import LeafletRoute from "@/components/Volunteer/LeafletRoute";
import { useEffect, useRef, useState } from "react";
import L from "leaflet"

type LatLngTuple = [number, number];




export default function VolunteerRouteMap({pickupLocation}) {
    console.log(pickupLocation,"pickup location in volunteer route map +++++++++++++")
    const Pickup = [pickupLocation[1],pickupLocation[0]]
//   const volunteerLocation: [number, number] = [10.8505, 76.2711]; // Example
   const [volunteerLocation, setVolunteerLocation] = useState<LatLngTuple | null>();
//   const pickupLocation: [number, number] = [ 10.66508,76.25098,];    // From DB

  const markerRef = useRef<L.Marker | null>(null);

  console.log(markerRef,"this is marker ref ")

  useEffect(() => {
    console.log("fetcing of lat and long when compoenent mounts")
    const watchId = navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            setVolunteerLocation([latitude, longitude])
        },
        (error) => {
            console.error("Geolocation error", error)
        },
        {
            enableHighAccuracy: true,
            maximumAge: 10000,
            timeout: 5000,
        }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  },[])


  {/*Testing navigation - 10k away from navigation Point */}

//   useEffect(() => {
//   const simulatedPath: [number, number][] = [
//     [10.58000, 76.17000], 
//     [10.59500, 76.18500],
//     [10.61000, 76.20000],
//     [10.62500, 76.21500],
//     [10.64000, 76.23000],
//     [10.65000, 76.24000],
//     [10.65700, 76.24150],
//     [10.65850, 76.24350],
//     [10.66000, 76.24550],
//     [10.66150, 76.24750],
//     [10.66300, 76.24900],
//     [10.66400, 76.25000],
//     [10.66508, 76.25098],
//   ];
  
//     let index = 0;
  
//     const interval = setInterval(() => {
//       if (index >= simulatedPath.length) {
//         clearInterval(interval);
//         return;
//       }
  
//       const [lat, lng] = simulatedPath[index]; // LatLngTuple is [lat, lng]
//       setVolunteerLocation([lat, lng]);
//       index++;
//     }, 1000); // 1 second delay between each point (simulate real-time)
  
//     return () => clearInterval(interval);
//   }, []);
  

  useEffect(() => {
    if (markerRef.current && volunteerLocation) {
      const marker = markerRef.current;
      const current = marker.getLatLng();
      const next = L.latLng(volunteerLocation);
  
      let start: number | null = null;
      const duration = 500; // ms
  
      function animateMarker(ts: number) {
        if (!start) start = ts;
        const progress = (ts - start) / duration;
        if (progress < 1) {
          const lat = current.lat + (next.lat - current.lat) * progress;
          const lng = current.lng + (next.lng - current.lng) * progress;
          marker.setLatLng([lat, lng]);
          requestAnimationFrame(animateMarker);
        } else {
          marker.setLatLng(next);
        }
      }
  
      requestAnimationFrame(animateMarker);
    }
  }, [volunteerLocation]);


  if(!volunteerLocation) return <p>Fethcing you location...</p>



  return (
    <MapContainer center={volunteerLocation} zoom={15} style={{ height: "600px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"  
      />
      {/* Volunteer Marker */}
      
      <Marker 
       ref={(ref) => {
        console.log(ref,"what is inside ref lets explore")
       if (ref) markerRef.current = ref;
        }}
        position={volunteerLocation}>
        <Popup>You are here</Popup>
      </Marker>

       {/* Donor Pickup Marker */}
      <Marker  position={pickupLocation}>
        <Popup>Pickup location</Popup>
      </Marker>

        {/* Draw Route */}
      <LeafletRoute from={volunteerLocation} to={Pickup} />

        {/* Smooth map movement */}
        {/* <UpdateMapCenter position={volunteerLocation} /> */}
    </MapContainer>
  );
}