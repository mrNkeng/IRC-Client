import '../../styles.css';
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { ChannelPlus } from './ChannelPlus';
import { getStore } from 'renderer/state';
import { observer } from 'mobx-react';


const ChannelList = observer(() => {

  const store = getStore();
  const selectedServer = store.selectedServer;

  const setChannel = (channel: string) => {
    store.changeChannel(channel);
  }

  return(
    <Box className="ChannelList">
      <Typography className="FlexColumnHeading">
        {selectedServer}
      </Typography>
      <Stack alignItems="center" spacing={2}>
        {store.channels.map((channel) => (
          <IconButton
            size="medium"
            color={channel.connected ? "secondary" : "error"}
            onClick={() => setChannel(channel.name)}
            key={channel.name}
          >
            {channel.name}
          </IconButton>
        ))}
        <ChannelPlus/>
      </Stack>
    </Box>
  );
});

export default ChannelList;
