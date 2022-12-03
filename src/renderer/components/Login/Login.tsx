import { useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';
import { history } from '../../history';

interface LoginProps {}

export const Login = (props: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    window.electron.ipcRenderer.sendMessage('login', [username, password]);
  }

  const SwitchToSignUp = () => {
    history.push("/SignUp");
  }

  const Skip = () => {
    history.push("/Chat");
  }

  return (
    //TODO change styles maybe?
    //TODO remove skip eventually
    <Box className="AppContainer">
      <FormControl className="formControl" sx={{padding: '20px 30px'}}>

        <span className="heading">
          <Box className="textContainer">
            AOL Messenger
          </Box>
        </span>

        <DiamondIcon sx={{ fontSize: 100 }} />{' '}
        <Grid
          container
          rowSpacing={1}
          direction="column"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid item>
            <TextField label="Username" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)}/>
          </Grid>
          <Grid item>
            <TextField label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </Grid>
          <Grid item>
            <Button onClick={() => {login();}} size="small" variant="outlined">
              Sign In
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => {SwitchToSignUp();}} size="small" variant="outlined">
              Sign Up
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => {Skip();}} size="small" variant="outlined">
              Skip
            </Button>
          </Grid>
        </Grid>

      </FormControl>
    </Box>
  );
};
