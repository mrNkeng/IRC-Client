import { Box, Grid } from '@mui/material';
import React from 'react';

interface ServerlistProps {
}

export const Serverlist = (props: ServerlistProps) => {
  return (
    <Grid container>
    <Grid item xs={10.5}>
    <Box sx={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent:"center",
      backgroundColor: "	#1e2124",
      position: "absolute",
      top: "20px",
      right: "0px",
      bottom: "0px",
      left: "0px"
    }}>
    </Box>
    </Grid>

    <Grid item xs={1.5}>
    <Box sx={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent:"center",
      backgroundColor: "#2C2F33",
      position: "absolute",
      top: "20px",
      right: "0px",
      bottom: "0px",
      left: "0px"
    }}>
      </Box>

    </Grid>
    </Grid>


  );
};

