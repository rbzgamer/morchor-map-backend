import "./Room.css";
import { useEffect, useState } from "react";

import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { IconButton } from "@mui/material";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import AssistantDirectionIcon from "@mui/icons-material/AssistantDirection";
import NavigationIcon from "@mui/icons-material/Navigation";
import { LinearProgress } from "@mui/material";

export const Room = ({
  selectBuilding,
  latitudeFromLocation,
  longitudeFromLocation,
  setSubmit,
  open,
  setOriginName,
  setOriginLat,
  setOriginLng,
  setDestinationName,
  setDestinationLat,
  setDestinationLng,
  setOpenDirectionBar,
}) => {
  const [check, setChecked] = useState(true);
  const [room, setRoom] = useState([]);

  const loadRoom = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    // console.log(selectBuilding);

    fetch(
      "http://localhost:5000/api/locations/rooms/" + selectBuilding,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setChecked(false);
        setRoom(result.rooms);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    loadRoom();
  }, []);

  const handleSubmit = async () => {
    setSubmit(true);
  };

  const handleAddToOriginLocation = (locationName) => {
    setOpenDirectionBar(true)
    setOriginName(locationName)
    setOriginLat(latitudeFromLocation);
    setOriginLng(longitudeFromLocation);
  };

  const handleAddToDestinationLocation = (locationName) => {
    setOpenDirectionBar(true)
    setDestinationName(locationName)
    setDestinationLat(latitudeFromLocation);
    setDestinationLng(longitudeFromLocation);
  };

  const showRoom = () => {
    if (!check) {
      const listOrders = room.map((object) => {
        return (
          <>
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
            >
              <AspectRatio ratio="1" sx={{ width: 50 }}>
                <img src="https://static.vecteezy.com/system/resources/thumbnails/005/502/058/small/hexagon-room-box-line-logo-symbol-icon-graphic-design-illustration-idea-creative-vector.jpg" />
              </AspectRatio>
              <CardContent>
                <Typography level="title-lg" id="card-description">
                  {object}
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
                onClick={() => handleAddToOriginLocation(object)}
              >
                <AddLocationIcon />
              </IconButton>
              <IconButton
                color="success"
                sx={{ p: "1px" }}
                aria-label="directions"
                style={{ right: "0px" }}
                onClick={() => {
                  handleAddToDestinationLocation(object);
                }}
              >
                <AssistantDirectionIcon />
              </IconButton>
            </Card>
          </>
        );
      });
      return <div>{listOrders}</div>;
    } else {
      return <LinearProgress/>;
    }
  };

  return <>{open && showRoom()}</>;
};
