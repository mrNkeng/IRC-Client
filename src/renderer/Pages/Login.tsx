import React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import flexbox from "@mui/system";
import Button from "@mui/material/Button";

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <InputLabel>Sign In</InputLabel>
      <FormControl>
        <Spacer spaceMultiplier={2} direction="col" />
        <TextField label="Email Address" />
        <Spacer spaceMultiplier={2} direction="col" />
        <TextField label="Password" />
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
  );
};
