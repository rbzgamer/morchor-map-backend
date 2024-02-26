import { Box, IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export const ShowDirectionInfo = ({
  distance,
  duration
}) => {

    console.log(distance.text);
  return (
    <div style={{ display: "flex", backgroundColor: "white" }}>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, maxWidth: 510 },
          mt: "10px",
          mb: "10px",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="standard-basic"
          label="Distance"
          size="small"
          value={distance}
          inputProps={{ readOnly: true }}
        />
        <TextField
          id="standard-basic"
          label="Duration"
          size="small"
          read-only="true"
          value={duration}
          inputProps={{ readOnly: true }}
        />
      </Box>
    </div>
  );
};
