import "./styles.css";
import "leaflet/dist/leaflet.css";
import "./App.css";

import Swal from "sweetalert2";

import { MapCon } from "./Components/map/Map";
import { useEffect, useState } from "react";
import { Navbar } from "./Components/map/Navbar/Navbar";
import { Faculty } from "./Components/map/Navbar/faculty/Faculty";
import { Search } from "./Components/map/Navbar/searching/Search";
import { Building } from "./Components/map/Navbar/building/Building";
import { Room } from "./Components/map/Navbar/room/Room";
import { Directions } from "./Components/map/Directions";
import { DirectionBar } from "./Components/map/Navbar/DirectionBar";
import { ShowDirectionInfo } from "./Components/map/Navbar/ShowDirectionInfo";

import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
} from "@vis.gl/react-google-maps";

export default function App() {
  const [results, setResults] = useState([]);
  const [approve, setApprove] = useState(false);
  const [choose, setChoose] = useState("Faculty");
  const [selectFaculty, setSelectFaculty] = useState("");
  const [selectBuilding, setSelectBuilding] = useState("");
  const [latitudeFromUser, setLatitudeFromUser] = useState();
  const [longitudeFromUser, setLongitudeFromUser] = useState();
  const [fetched, setFetched] = useState(false);
  const [latitudeFromLocation, setLatitudeFromLocation] = useState();
  const [longitudeFromLocation, setLongitudeFromLocation] = useState();
  const [submit, setSubmit] = useState(false);
  const [open, setOpen] = useState(true);
  const [openDirectionBar, setOpenDirectionBar] = useState(false);

  const [originName, setOriginName] = useState("User Location");
  const [originLat, setOriginLat] = useState();
  const [originLng, setOriginLng] = useState();
  const [destinationName, setDestinationName] = useState("Destination");
  const [destinationLat, setDestinationLat] = useState();
  const [destinationLng, setDestinationLng] = useState();
  const [useRoute, setUseRoute] = useState(false);
  const [stateClickRoute, setStateClickRoute] = useState(false);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));

  const [distance, setDistance] = useState("0 km");
  const [duration, setDuration] = useState("0 min");

  async function showPosition(po) {
    setLatitudeFromUser(po.coords.latitude);
    setLongitudeFromUser(po.coords.longitude);
    setOriginLat(po.coords.latitude);
    setOriginLng(po.coords.longitude);
    setFetched(true);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(showPosition);
  }, []);

  if (fetched) {
    let latitude = 0.0;
    let longitude = 0.0;
    let userOrLocation = "user";
    if (
      latitudeFromLocation !== undefined &&
      latitudeFromLocation !== "" &&
      latitudeFromLocation !== NaN &&
      latitudeFromLocation !== latitudeFromUser
    ) {
      latitude = parseFloat(latitudeFromLocation);
      longitude = parseFloat(longitudeFromLocation);
      userOrLocation = "location";
    } else {
      latitude = parseFloat(latitudeFromUser);
      longitude = parseFloat(longitudeFromUser);
    }

    // const position = { lat: latitude, lng: longitude };

    // console.log(position);

    return (
      <>
        <div className="application">
          {/* Base Map */}
          <div style={{ height: "100vh", width: "100%" }}>
            <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}>
              <Map
                center={{ lat: latitudeFromUser, lng: longitudeFromUser }}
                zoom={18}
                mapId="d024e2b838dd693a"
              >
                <AdvancedMarker
                  position={{ lat: latitudeFromUser, lng: longitudeFromUser }}
                  onClick={() => {
                    Swal.mixin({ toast: true }).fire({
                      title: "User Location",
                      icon: "info",
                    });
                  }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/800/800724.png"
                    width={50}
                    height={50}
                  />
                </AdvancedMarker>

                {!useRoute && (
                  <MapCon
                    latitude={latitude}
                    longitude={longitude}
                    userOrLocation={userOrLocation}
                    submit={submit}
                    selectFaculty={selectFaculty}
                    setUseRoute={setUseRoute}
                    setDestinationLat={setDestinationLat}
                    setDestinationLng={setDestinationLng}
                  />
                )}

                <Directions
                  firstLocation={{ lat: originLat, lng: originLng }}
                  secondLocation={{
                    lat: destinationLat,
                    lng: destinationLng,
                  }}
                  useRoute={useRoute}
                  setUseRoute={setUseRoute}
                  stateClickRoute={stateClickRoute}
                  setMap={setMap}
                  setDistance={setDistance}
                  setDuration={setDuration}
                />

                {useRoute && (
                  <AdvancedMarker
                    position={{
                      lat: parseFloat(originLat),
                      lng: parseFloat(originLng),
                    }}
                    onClick={() => {
                      Swal.fire({ title: "Origin Location", icon: "info" });
                    }}
                  />
                )}

                {useRoute && (
                  <AdvancedMarker
                    position={{
                      lat: parseFloat(destinationLat),
                      lng: parseFloat(destinationLng),
                    }}
                    onClick={() => {
                      Swal.fire({
                        title: "Destination Location",
                        icon: "info",
                      });
                    }}
                  />
                )}
              </Map>
            </APIProvider>
          </div>
          <div className="formBlock">
            {/* Navbar */}
            <Navbar
              setResults={setResults}
              setApprove={setApprove}
              setSubmit={setSubmit}
              setUseRoute={setUseRoute}
              open={open}
              setOpen={setOpen}
              openDirectionBar={openDirectionBar}
              setOpenDirectionBar={setOpenDirectionBar}
              setChoose={setChoose}
              setSelectFaculty={setSelectFaculty}
              choose={choose}
              setOriginName={setOriginName}
              setDestinationName={setDestinationName}
              latitudeFromUser={latitudeFromUser}
              longitudeFromUser={longitudeFromUser}
              setOriginLat={setOriginLat}
              setOriginLng={setOriginLng}
              setLatitudeFromLocation={setLatitudeFromLocation}
              map={map}
              setDistance={setDistance}
              setDuration={setDuration}
            />

            {/* Route Bar */}
            {openDirectionBar && (
              <DirectionBar
                originName={originName}
                destinationName={destinationName}
                setUseRoute={setUseRoute}
                latitudeFromUser={latitudeFromUser}
                longitudeFromUser={longitudeFromUser}
                setOriginLat={setOriginLat}
                setOriginLng={setOriginLng}
                stateClickRoute={stateClickRoute}
                setStateClickRoute={setStateClickRoute}
              />
            )}

            {openDirectionBar && (
              <ShowDirectionInfo distance={distance} duration={duration} />
            )}
            <div className="result-list">
              {/* Search Result*/}
              {approve && results && results.length > 0 && (
                <Search
                  searchData={results}
                  setLatitudeFromLocation={setLatitudeFromLocation}
                  setLongitudeFromLocation={setLongitudeFromLocation}
                  setSubmit={setSubmit}
                  setOriginName={setOriginName}
                  setOriginLat={setOriginLat}
                  setOriginLng={setOriginLng}
                  setDestinationName={setDestinationName}
                  setDestinationLat={setDestinationLat}
                  setDestinationLng={setDestinationLng}
                  setOpenDirectionBar={setOpenDirectionBar}
                  open={open}
                />
              )}
              {/* Category Result */}
              {(choose === "Faculty" || choose === "") && !approve && (
                <Faculty
                  setChoose={setChoose}
                  setSelectFaculty={setSelectFaculty}
                  open={open}
                />
              )}
              {/* Building Result */}
              {!approve && choose === "Building" && (
                <Building
                  setChoose={setChoose}
                  setSelectBuilding={setSelectBuilding}
                  selectFaculty={selectFaculty}
                  setLatitudeFromLocation={setLatitudeFromLocation}
                  setLongitudeFromLocation={setLongitudeFromLocation}
                  setSubmit={setSubmit}
                  open={open}
                  setOriginName={setOriginName}
                  setOriginLat={setOriginLat}
                  setOriginLng={setOriginLng}
                  setDestinationName={setDestinationName}
                  setDestinationLat={setDestinationLat}
                  setDestinationLng={setDestinationLng}
                  setOpenDirectionBar={setOpenDirectionBar}
                  map={map}
                />
              )}
              {/* Room Result */}
              {!approve && choose === "Room" && (
                <Room
                  selectBuilding={selectBuilding}
                  latitudeFromLocation={latitudeFromLocation}
                  longitudeFromLocation={longitudeFromLocation}
                  setSubmit={setSubmit}
                  open={open}
                  setOriginName={setOriginName}
                  setOriginLat={setOriginLat}
                  setOriginLng={setOriginLng}
                  setDestinationName={setDestinationName}
                  setDestinationLat={setDestinationLat}
                  setDestinationLng={setDestinationLng}
                  setOpenDirectionBar={setOpenDirectionBar}
                />
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
