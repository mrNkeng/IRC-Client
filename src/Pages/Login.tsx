import React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import flexbox from "@mui/system";
import Button from "@mui/material/Button";

interface LoginProps {}

export const Login = (props: LoginProps) => {
  return (
    //we can style this correctly later :P
    <Box
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <InputLabel>Sign In</InputLabel>
      <FormControl>
        <body />
        <TextField label="Email Address" />
        <body /> {/*idk how else to add space here */}
        <TextField label="Password" />
        <body />
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
