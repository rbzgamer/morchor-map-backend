import "./Building.css";
import { useEffect, useState } from "react";

import { IconButton } from "@mui/material";

import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import AssistantDirectionIcon from "@mui/icons-material/AssistantDirection";
import NavigationIcon from "@mui/icons-material/Navigation";
import { LinearProgress } from "@mui/material";
import { useMap } from "@vis.gl/react-google-maps";

export const Building = ({
  setChoose,
  setSelectBuilding,
  selectFaculty,
  setLatitudeFromLocation,
  setLongitudeFromLocation,
  setSubmit,
  open,
  setOriginName,
  setOriginLat,
  setOriginLng,
  setDestinationName,
  setDestinationLat,
  setDestinationLng,
  setOpenDirectionBar,
  map
}) => {
  const [check, setChecked] = useState(true);
  const [building, setFaculty] = useState([]);
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [select, setSelect] = useState("");

  const loadBuilding = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "http://localhost:5000/api/locations/?category=" + selectFaculty,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setChecked(false);
        setFaculty(result);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    loadBuilding();
  }, []);

  const handleClickToRoom = async () => {
    if (select !== "") {
      setLatitudeFromLocation(lat);
      setLongitudeFromLocation(lon);
      setSelectBuilding(select);
      setChoose("Room");
    }
  };

  const handleSubmit = async () => {
    setSubmit(true);
    setLatitudeFromLocation(lat);
    setLongitudeFromLocation(lon);
    map.panTo({lat: parseFloat(lat), lng: parseFloat(lon)})
  };

  const handleMouseMove = (input, lat, lon) => {
    setLat(lat);
    setLon(lon);
    setSelect(input);
  };

  const handleAddToOriginLocation = (locationName) => {
    setOpenDirectionBar(true);
    setOriginName(locationName[0]);
    setOriginLat(lat);
    setOriginLng(lon);
  };

  const handleAddToDestinationLocation = (locationName) => {
    setOpenDirectionBar(true);
    setDestinationName(locationName[0]);
    setDestinationLat(lat);
    setDestinationLng(lon);
  };

  const showBuilding = () => {
    if (!check) {
      let height = window.innerHeight;
      const listOrders = building.map((object) => {
        return (
          <Card
            variant="outlined"
            orientation="horizontal"
            sx={{
              maxWidth: 510,
              "&:hover": {
                boxShadow: "md",
                borderColor: "neutral.outlinedHoverBorder",
              },
            }}
            onMouseMove={() =>
              handleMouseMove(object._id, object.latitude, object.longitude)
            }
          >
            <AspectRatio
              ratio="1"
              sx={{ width: 50 }}
              onClick={handleClickToRoom}
            >
              <img src="https://img.freepik.com/premium-vector/building-logo-icon-design-template-vector_67715-555.jpg" />
            </AspectRatio>
            <CardContent onClick={handleClickToRoom}>
              <Typography level="title-lg" id="card-description">
                {object.locationName.map((x) => {
                  return x + " / ";
                })}
              </Typography>
              <Typography
                level="body-sm"
                aria-describedby="card-description"
                mb={1}
              ></Typography>
            </CardContent>

            <IconButton
              color="primary"
              sx={{ p: "1px" }}
              aria-label="directions"
              style={{ right: "0px" }}
              onClick={handleSubmit}
            >
              <NavigationIcon />
            </IconButton>
            <IconButton
              color="secondary"
              sx={{ p: "1px" }}
              aria-label="directions"
              style={{ right: "0px" }}
              onClick={() => handleAddToOriginLocation(object.locationName)}
            >
              <AddLocationIcon />
            </IconButton>
            <IconButton
              color="success"
              sx={{ p: "1px" }}
              aria-label="directions"
              style={{ right: "0px" }}
              onClick={() => {
                handleAddToDestinationLocation(object.locationName);
              }}
            >
              <AssistantDirectionIcon />
            </IconButton>
          </Card>
        );
      });
      return <div>{listOrders}</div>;
    } else {
      return <LinearProgress/>;
    }
  };

  return <>{open && showBuilding()}</>;
};
