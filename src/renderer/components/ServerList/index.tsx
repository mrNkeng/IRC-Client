import '../../styles.css';
import Box from '@mui/material/Box';
import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import { getStore } from 'renderer/state';
import { observer } from 'mobx-react';
import { ServerPlus } from './ServerPlus';

const ServerList = observer(() => {
  const store = getStore();

  const onClick = (serverName: string) => {
    store.setSelectedServer(serverName);
    store.setSelectedChannel("");
  }

  return (
    <Box className="ServerList">
      <Typography className="FlexColumnHeading">Server List</Typography>

      <Stack alignItems="center" spacing={2}>
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
              onClick={() => onClick(server.name)}
            >
              <CatchingPokemonIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>

        ))}
        <ServerPlus/>

      </Stack>

    </Box>
  );
});

export default ServerList;
