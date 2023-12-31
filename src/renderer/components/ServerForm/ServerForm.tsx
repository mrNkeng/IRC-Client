import { useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { CssBaseline, Grid } from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';
import { Link, useNavigate } from 'react-router-dom';
import { getStore } from 'renderer/state';
import CloseIcon from '@mui/icons-material/Close';
import { history } from '../../history';

interface ServerFormProps {}

export const ServerForm = (props: ServerFormProps) => {
  const [server, setServer] = useState("irc.valanidas.dev");
  const [port, setPort] = useState(6667);
  const navigate = useNavigate();

  const onConnect = () => {
    const state = getStore();
    window.electron.ipcRenderer.sendMessage('createIRCConnection', [server, port]);
    // state.serverList.set(server, new Server(server))
    navigate("/Chat")
  }
  const Skip = () => {
    history.push("/Chat");
  }
  return (
    <Box className="AppContainer">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10px 20px',
          top: '20px',
          right: '0px',
          bottom: '0px',
          left: '0px',
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
              Connect to Server
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
              <TextField label="Server" variant="outlined" value={server} onChange={(e) => setServer(e.target.value)} />
            </Grid>
            <Grid item>
              <TextField type="number" label="Port" variant="outlined" value={port} onChange={(e) => setPort(Number(e.target.value))}/>
            </Grid>
            {/* <Grid item>
              <TextField label="Username" variant="outlined" />
            </Grid>
            <Grid item>
              <TextField label="Password" variant="outlined" type="password" />
            </Grid> */}
            <Grid item>
              <Button
                onClick={onConnect}
                size="small"
                variant="outlined"
              >
                Connect to Server
              </Button>
            </Grid>

            <Grid item>
              <Button onClick={() => {Skip();}} size="small"
                variant="outlined">
                 Cancel  <CloseIcon/>
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </Box>
    </Box>
  );
};
