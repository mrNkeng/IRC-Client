import '../../styles.css';
import Box from '@mui/material/Box';
import { Container, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import { Server } from '../../../data-models/IRCData';

interface ServerListProps {
  servers: ReadonlyArray<Server> | undefined;
  setServerAndClearState: (server: Server) => void;
}

function ServerList(props: ServerListProps) {
  return (
    <Box className="ServerList" >
      <Typography className="FlexColumnHeading">
        Server List
      </Typography>

      <Stack>
        {props.servers?.map((server) => (
          <Tooltip title={server.name} key={server.name} placement="right" arrow>
            <IconButton
              size="large"
              color="secondary"
              onClick={() => props.setServerAndClearState(server)}
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
