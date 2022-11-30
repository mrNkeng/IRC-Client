import React, { useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import flexbox from '@mui/system';
import Button from '@mui/material/Button';
import { Container, Grid } from '@mui/material';
import { url } from 'inspector';
import DiamondIcon from '@mui/icons-material/Diamond';
interface LoginProps {}

export const Login = (props: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    window.electron.ipcRenderer.sendMessage('login', [username, password]);
  }

  return (
    //we can style this correctly later :P
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '	#1e2124',
        position: 'absolute',
        top: '20px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px 30px',
        }}
      >
        <FormControl
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '30px',
            minHeight: '40vh',
            width: '25vw',
            padding: '20px 30px',
            backgroundColor: '#7289da',
          }}
        >
          <span className="heading">
            <Box
              sx={{
                fontSize: 'large',

                paddingTop: ' 10px',
                fontWeight: 'bold',
                color: 'lightgrey',
              }}
            >
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
              <Button
                onClick={() => {
                  login();
                }}
                size="small"
                variant="outlined"
              >
                Sign in
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </Box>
    </Box>
  );
};
