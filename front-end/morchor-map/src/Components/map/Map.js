import "./Map.css";
import "leaflet/dist/leaflet.css";

import Swal from "sweetalert2";

import { useEffect, useState } from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";

export const MapCon = ({
  latitude,
  longitude,
  userOrLocation,
  submit,
  selectFaculty,
  setUseRoute,
  setDestinationLat,
  setDestinationLng,
}) => {
  const [location, setLocation] = useState([]);
  const [check, setChecked] = useState([]);

  const loadBuilding = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/locations/one-name", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setChecked(false);
        setLocation(result);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    loadBuilding();
  }, []);

  const showAllLocation = () => {
    if (!check) {
      if (
        submit &&
        userOrLocation !== "user" &&
        latitude !== "" &&
        longitude !== ""
      ) {
        return (
          <>
            {location.map((marker) => {
              if (
                parseFloat(marker.latitude) === latitude &&
                parseFloat(marker.longitude) === longitude
              ) {
                const position = {
                  lat: parseFloat(marker.latitude),
                  lng: parseFloat(marker.longitude),
                };
                return (
                  <>
                    <AdvancedMarker
                      position={position}
                      onClick={() => {
                        Swal.mixin({ toast: true }).fire({
                          title: marker.locationName,
                          text: "Do you want to go to location?",
                          icon: "info",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, go to location",
                        }).then((result) => {
                          /* Read more about isConfirmed, isDenied below */
                          if (result.isConfirmed) {
                            setUseRoute(true);
                            setDestinationLat(marker.latitude);
                            setDestinationLng(marker.longitude);
                          }
                        });
                      }}
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/8/8214.png"
                        width={50}
                        height={50}
                      />
                    </AdvancedMarker>
                  </>
                );
              }
            })}
          </>
        );
      } else if (selectFaculty === "") {
        return (
          <>
            {location.map((marker) => {
              const position = {
                lat: parseFloat(marker.latitude),
                lng: parseFloat(marker.longitude),
              };
              return (
                <>
                  <AdvancedMarker
                    position={position}
                    onClick={() => {
                      Swal.mixin({ toast: true }).fire({ title: marker.locationName, icon: "info" });
                    }}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/8/8214.png"
                      width={50}
                      height={50}
                    />
                  </AdvancedMarker>
                </>
              );
            })}
          </>
        );
      } else {
        return (
          <>
            {location
              .filter((cate) => cate.category == selectFaculty)
              .map((marker) => {
                const position = {
                  lat: parseFloat(marker.latitude),
                  lng: parseFloat(marker.longitude),
                };
                return (
                  <>
                    <AdvancedMarker
                      position={position}
                      onClick={() => {
                        Swal.mixin({ toast: true }).fire({ title: marker.locationName, icon: "info" });
                      }}
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/8/8214.png"
                        width={50}
                        height={50}
                      />
                    </AdvancedMarker>
                  </>
                );
              })}
          </>
        );
      }
    }
  };

  useEffect(() => {
    showAllLocation();
  }, [latitude, longitude, userOrLocation, submit, selectFaculty]);

  return <>{showAllLocation()}</>;
};
