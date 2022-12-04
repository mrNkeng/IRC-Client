import React, { useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';
import { history } from '../../history';

interface SignupProps {}

type Direction = 'col' | 'row';

interface SpacerProps {
  spaceMultiplier: number;
  direction: Direction;
}

const Spacer = (props: SpacerProps) => {
  const { spaceMultiplier, direction } = props;
  const spaceing = 4 * (spaceMultiplier ?? 1);
  const style = {
    [direction === 'row' ? 'width' : 'height']: Math.max(0, spaceing),
  };
  return <div style={style}></div>;
};

export const Signup = (props: SignupProps) => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signUp = () => {
    window.electron.ipcRenderer.sendMessage('signUp', [fullName, username, password]);
  }

  const SwitchToLogIn = () => {
    history.push("/Login");
  }

  return (
    //TODO come back here and fix styling, Reagan gave up after a while
    //TODO remove these spacers and just use CSS
    <Box className="AppContainer">
      <Stack spacing={2}>

        <Box className="SignUpBox">
          <FormControl className="formControl" sx={{padding: '20px 30px'}}>

            <span className="heading">
              <Box className="textContainer">
                AOL Messenger
              </Box>
            </span>

            <DiamondIcon sx={{ fontSize: 100 }} />{' '}
            <Spacer spaceMultiplier={2} direction="col" />
            <Spacer spaceMultiplier={2} direction="col" />
            <TextField label="Full Name" variant="outlined" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <Spacer spaceMultiplier={2} direction="col" />
            <TextField label="Username" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <Spacer spaceMultiplier={2} direction="col" />
            <TextField label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <Spacer spaceMultiplier={2} direction="col" />
            <Button onClick={() => {signUp();}} size="small" variant="outlined">
              Sign Up
            </Button>

          </FormControl>
        </Box>

        <Box className="SignUpBox">
          <Box className="formControl" sx={{padding: '20px 30px'}}>
            <span className="heading">
              <Box className="textContainer">
                Already have an account?
              </Box>
            </span>
            <Button onClick={() => {SwitchToLogIn();}} size="small" variant="outlined">
              Log In
            </Button>
          </Box>
        </Box>

      </Stack>
    </Box>
  );
};
