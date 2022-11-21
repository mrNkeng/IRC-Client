import '../../../styles.css';
import Box from '@mui/material/Box';
import { Container, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';

interface Server {
  serverName: string;
}

interface ServerListProps {
  servers: ReadonlyArray<Server>;
  setServer: (server: Server) => void;
}

function ServerList(props: ServerListProps) {
  return (
    <Box className="ServerList" >
      <Typography
        sx={{
          fontSize: 'large',
          textAlign: 'center',
          paddingTop: ' 10px',
          paddingBottom: '10px',
          fontWeight: 'bold',
          color: 'lightgrey',
        }}
      >
        Server List
      </Typography>
      <Stack>
        {props.servers.map((server) => (
          <Tooltip title={server.serverName} placement="right" arrow>
            <IconButton
              size="large"
              color="secondary"
              onClick={() => props.setServer(server)}
            >
              <CatchingPokemonIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        ))}
      </Stack>
    </Box>
  );
};

export default ServerList;
