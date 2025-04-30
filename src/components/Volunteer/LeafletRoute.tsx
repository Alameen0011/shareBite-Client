// components/LeafletRoute.tsx
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { useEffect } from "react";

interface RouteProps {
  from: [number, number]; // [lat, lng]
  to: [number, number];   // [lat, lng]
}

export default function LeafletRoute({ from, to }: RouteProps) {
    const map = useMap();
    console.log(map,"ma")
    console.log(to,"tooo pickup location lat lng")
  
    useEffect(() => {
      if (!map) return;
  
      const routingControl = L.Routing.control({
        waypoints: [L.latLng(...from), L.latLng(...to)],
        routeWhileDragging: false,
        show:false,
        addWaypoints: false,
      }).addTo(map);
  
      return () => {
        map.removeControl(routingControl);
      };
    }, [from, to, map]);
  
    return null;
  }
  
