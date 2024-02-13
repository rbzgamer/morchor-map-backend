import "./Search.css";
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

export const Search = ({
  searchData,
  setLatitudeFromLocation,
  setLongitudeFromLocation,
  setSubmit,
  setOriginName,
  setOriginLat,
  setOriginLng,
  setDestinationName,
  setDestinationLat,
  setDestinationLng,
  setOpenDirectionBar,
  open
}) => {
  const [check, setChecked] = useState(true);
  const [search, setSearch] = useState([]);
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  const loadSearch = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "http://localhost:5000/api/locations/?locationName=" + searchData,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setSearch(result);
        setChecked(false);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    setChecked(true);
    loadSearch();
  }, [searchData]);

  const handleSubmit = async () => {
    setLatitudeFromLocation(lat);
    setLongitudeFromLocation(lon);
    setSubmit(true);
  };

  const handleMouseMove = async (lat, lon) => {
    setLat(lat);
    setLon(lon);
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

  const showSearch = () => {
    if (!check) {
      const listOrders = search.map((object) => {
        const room = object.room.filter((x) => x.includes(searchData));

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
              onMouseMove={() =>
                handleMouseMove(object.latitude, object.longitude)
              }
            >
              <AspectRatio ratio="1" sx={{ width: 50 }}>
                <img src="https://static.vecteezy.com/system/resources/thumbnails/005/502/058/small/hexagon-room-box-line-logo-symbol-icon-graphic-design-illustration-idea-creative-vector.jpg" />
              </AspectRatio>
              <CardContent>
                <Typography level="title-lg" id="card-description">
                  Category: {object.category}
                </Typography>
                <Typography level="title-lg" id="card-description">
                  Name: {object.locationName}
                </Typography>
                <Typography level="title-lg" id="card-description">
                  {room.length !== 0 && <>Room: {room.map((x) => x + " / ")}</>}
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
          </>
        );
      });
      return <div>{listOrders}</div>;
    } else {
      return <LinearProgress/>;
    }
  };
  return <>{open && showSearch()}</>;
};
