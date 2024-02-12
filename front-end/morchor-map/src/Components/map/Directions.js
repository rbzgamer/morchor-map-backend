import { useEffect, useState } from "react";
import { useMapsLibrary, useMap } from "@vis.gl/react-google-maps";

export const Directions = ({firstLocation, secondLocation, useRoute, setUseRoute}) => {
  const map = useMap();
  const routeLibrary = useMapsLibrary("routes");
  const [directionService, setDirectionService] = useState();
  const [directionRenderer, setDirectionRenderer] = useState();
  const [route, setRoute] = useState();

  // console.log(firstLocation.lat + " " + firstLocation.lng);


  useEffect(() => {
    if (firstLocation.lat === "" || firstLocation.lng === "" || firstLocation.lat === undefined || firstLocation.lng === undefined) {
      setUseRoute(false)
    }
  
    if (secondLocation.lat === "" || secondLocation.lng === "" || secondLocation.lat === undefined || secondLocation.lng === undefined) {
      setUseRoute(false)
    }
  }, [])



  useEffect(() => {

    if (!routeLibrary || !map) return;
    if (!directionService) {
      setDirectionService(new routeLibrary.DirectionsService());
    }
    if (!directionRenderer) {
      setDirectionRenderer(new routeLibrary.DirectionsRenderer({ map }));
    }
  }, [routeLibrary, map]);

  useEffect(() => {
    if (!directionService || !directionRenderer) return;

    if (useRoute) {
      directionService
        .route({
          origin: {
            lat: parseFloat(firstLocation.lat),
            lng: parseFloat(firstLocation.lng),
          },
          destination: {
            lat: parseFloat(secondLocation.lat),
            lng: parseFloat(secondLocation.lng),
          },
          travelMode: "DRIVING",
        })
        .then((response) => {
          directionRenderer.setDirections(response);
          setRoute(response.routes);
          // console.log(response);
        });
    }
  }, [directionService, directionRenderer]);

  return null;
};
