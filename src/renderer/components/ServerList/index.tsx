import '../../styles.css';
import Box from '@mui/material/Box';
import { Container, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import { Server } from '../../../data-models/interfaces';
import { getStore } from 'renderer/state';
import { observer } from 'mobx-react';

interface ServerListProps {
  setSelection: (server: string) => void;
}

const ServerList =  observer((props: ServerListProps) => {
  const { setSelection } = props;
  const state = getStore();
  return (
    <Box className="ServerList" >
      <Typography className="FlexColumnHeading">
        Server List
      </Typography>

      <Stack>
        {Array.from(state.serverList.values()).map((server) => (
          <Tooltip title={server.name} key={server.name} placement="right" arrow>
            <IconButton
              size="large"
              color="secondary"
              onClick={() => setSelection(server.name)}
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
