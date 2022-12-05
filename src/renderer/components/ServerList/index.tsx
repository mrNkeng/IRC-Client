import '../../styles.css';
import Box from '@mui/material/Box';
import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import { getStore } from 'renderer/state';
import { observer } from 'mobx-react';

const ServerList = observer(() => {
  const store = getStore();
  return (
    <Box className="ServerList">
      <Typography className="FlexColumnHeading">Server List</Typography>

      <Stack>
        {store.servers.map((server) => (
          <Tooltip
            title={server.name}
            key={server.name}
            placement="right"
            arrow
          >
            <IconButton
              size="large"
              color="secondary"
              onClick={() => (store.setSelectedServer(server.name))}
            >
              <CatchingPokemonIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        ))}
      </Stack>
    </Box>
  );
});

export default ServerList;
