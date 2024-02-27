import { useEffect, useState } from "react";
import { useMapsLibrary, useMap } from "@vis.gl/react-google-maps";

export const Directions = ({
  firstLocation,
  secondLocation,
  useRoute,
  setUseRoute,
  stateClickRoute,
  setMap,
  setDistance,
  setDuration,
}) => {
  const map = useMap();
  const routeLibrary = useMapsLibrary("routes");
  const [directionService, setDirectionService] = useState();
  const [directionRenderer, setDirectionRenderer] = useState();
  const [route, setRoute] = useState([]);

  useEffect(() => {
    if (
      firstLocation.lat === "" ||
      firstLocation.lng === "" ||
      firstLocation.lat === undefined ||
      firstLocation.lng === undefined
    ) {
      setUseRoute(false);
    }

    if (
      secondLocation.lat === "" ||
      secondLocation.lng === "" ||
      secondLocation.lat === undefined ||
      secondLocation.lng === undefined
    ) {
      setUseRoute(false);
    }
    setMap(map);
  }, []);

  useEffect(() => {
    if (!routeLibrary || !map) return;
    if (!directionService) {
      setDirectionService(new routeLibrary.DirectionsService());
    }
    if (!directionRenderer) {
      setDirectionRenderer(new routeLibrary.DirectionsRenderer({ map }));
    }
  }, [routeLibrary, map, useRoute]);

  useEffect(() => {
    if (!directionService || !directionRenderer) return;

    if (useRoute) {
      console.log(2);
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
          map.panTo({
            lat: parseFloat(secondLocation.lat),
            lng: parseFloat(secondLocation.lng),
          });

          if (
            route.length !== 0 &&
            route[0] !== undefined &&
            route[0].legs !== undefined
          ) {
            setDistance(route[0].legs[0].distance.text);
            setDuration(route[0].legs[0].duration.text);
            console.log(route[0].legs[0].distance);
            console.log(route[0].legs[0].duration);
          }
        });
    } else {
      directionRenderer.setMap(null);
      setDirectionService(null);
      setDirectionRenderer(null);
      map.panTo({
        lat: parseFloat(firstLocation.lat),
        lng: parseFloat(firstLocation.lng),
      });
    }
  }, [directionService, directionRenderer, useRoute, stateClickRoute]);

  return null;
};
