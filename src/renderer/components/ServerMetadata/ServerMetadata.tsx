import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react";
import { getStore } from "renderer/state";


export const ServerMetadata = observer(() => {
  const {metadata} = getStore();
  return (
    <Box sx={{
      color: "white",
      marginTop: "1em",
      marginLeft: "1em",
      textAlign: "left",
    }}>
      {metadata?.motd.map((motdLine, index) =>
        <Typography  sx={{
          textAlign: "left",
          lineHeight: 1.2,
          fontSize: 15
        }} key={index}>
          {motdLine}
        </Typography>
      )}
    </Box>
  );
});
