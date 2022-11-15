import React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import flexbox from "@mui/system";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import { url } from "inspector";
import DiamondIcon from '@mui/icons-material/Diamond';
interface LoginProps {}

type Direction = "col" | "row";

interface SpacerProps {
  spaceMultiplier: number;
  direction: Direction;
}

const Spacer = (props: SpacerProps) => {
  const { spaceMultiplier, direction } = props;
  const spaceing = 4 * (spaceMultiplier ?? 1);
  const style = {
    [direction === "row" ? "width" : "height"]: Math.max(0, spaceing),
  };
  return <div style={style}></div>;
};

export const Login = (props: LoginProps) => {
  return (
    //we can style this correctly later :P
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent:"center",
        padding: "20px 30px"
        
      }}
    >
      
      <FormControl sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent:"center",
        borderRadius: "30px",
        height: "35vh",
        width:"25vw",
        padding: "20px 30px",
        backgroundColor: "#7289da"
      }}>
        <span className="heading">
            <Box sx = 
            {{fontSize: 'large', 
           
            paddingTop:' 10px',
            fontWeight: 'bold',
            color: 'lightgrey' }}>AOL Messenger</Box>
          </span> 
          <DiamondIcon sx={{ fontSize: 100 }} />{" "}
      <Spacer spaceMultiplier={2} direction="col" />
        <TextField label="Email Address" variant="outlined"/>
        <Spacer spaceMultiplier={2} direction="col" />
        <TextField label="Password" variant="outlined"/>
        <Spacer spaceMultiplier={2} direction="col" />
        <Button
          onClick={() => {
            alert("you're signed in");
          }}
          size="small"
          variant="outlined"
        >
          Sign In
        </Button>
      </FormControl>
    </Box>
    </Box>
  );
};
