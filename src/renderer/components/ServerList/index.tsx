import '../../../styles.css';
import Box from '@mui/material/Box';
import { Container, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import * as Interfaces from '../interfaces';

function ServerList(props: Interfaces.ServerListProps) {
  return (
    <Box className="ServerList" >
      <Typography className="FlexColumnHeading">
        Server List
      </Typography>

      <Stack>
        {props.servers.map((server) => (
          <Tooltip title={server.serverName} key={server.serverName} placement="right" arrow>
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
