import * as L from "leaflet";

declare module "leaflet" {
  namespace Routing {
    function control(options: any): any;
    function itinerary(options: any): any;
    function osrmv1(options?: any): any;
  }
}