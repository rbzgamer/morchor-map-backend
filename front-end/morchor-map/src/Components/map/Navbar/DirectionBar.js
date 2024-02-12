import { Box, IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export const DirectionBar = ({originName, destinationName, setUseRoute, latitudeFromUser, longitudeFromUser, setOriginLat, setOriginLng}) => {

  const handleSubmit = () => {
    if (originName === "User Location") {
      setOriginLat(latitudeFromUser)
      setOriginLng(longitudeFromUser)
    }
    setUseRoute(true)
  }

  return (
    <div style={{ display: "flex", backgroundColor: "white"}}>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          mt: "10px", mb: "10px"
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="standard-basic"
          label="Origin"
          size="small"
          value={originName}
          inputProps={{ readOnly: true }}
        />
        <TextField
          id="standard-basic"
          label="Destination"
          size="small"
          read-only="true"
          value={destinationName}
          inputProps={{ readOnly: true }}
        />
      </Box>
      <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions" onClick={handleSubmit}>
        <SendIcon />
      </IconButton>
    </div>
  );
};
