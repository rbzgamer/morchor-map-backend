import { useEffect, useState } from "react";
import Building from "../building/Building";
import Room from "../room/Room";
import "./Faculty.css";

import SendIcon from "@mui/icons-material/Send";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { LinearProgress } from "@mui/material";

export const Faculty = ({ setChoose, setSelectFaculty, open }) => {
  const [select, setSelect] = useState("");
  const [check, setChecked] = useState(true);
  const [faculty, setFaculty] = useState([]);

  const loadFaculty = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/locations/categories", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setChecked(false);
        setFaculty(result.categories);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    loadFaculty();
  }, []);

  const handleClickToBuilding = async () => {
    setChoose("Building");
    setSelectFaculty(select);
  };

  const handleMouseMove = (input) => {
    setSelect(input);
  };

  const showFaculty = () => {
    if (!check) {
      const listOrders = faculty.map((object) => {
        let img = "";
        if (object === "Engineering") {
          img = (
            <img
              src="https://me.eng.cmu.ac.th/img/logo-me.jpg"
              width={50}
              height={50}
            />
          );
        } else if (object === "Architecture") {
          img = (
            <img
              src="https://www.arc.cmu.ac.th/dept/img/archcmu_logo_color.png"
              width={50}
              height={50}
            />
          );
        } else if (object === "Agriculture") {
          img = (
            <img
              src="https://www.agri.cmu.ac.th/2017/img/logo/logo_agri_cmu_thai_2012.gif"
              width={50}
              height={50}
            />
          );
        }

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
            onMouseMove={() => handleMouseMove(object)}
            onClick={handleClickToBuilding}
          >
            <AspectRatio ratio="1" sx={{ width: 50 }}>
              {img}
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
          </Card>
        );
      });
      return <div>{listOrders}</div>;
    } else {
      return <LinearProgress/>;
    }
  };

  return <div className="">{open && showFaculty()}</div>;
};
