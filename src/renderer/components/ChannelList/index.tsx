import '../../styles.css';
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { ChannelPlus } from './ChannelPlus';
import { getStore } from 'renderer/state';
import { observer } from 'mobx-react';


const ChannelList = observer(() => {

  const store = getStore();
  const selectedServer = store.selectedServer;
  const channels: string[] = store.channels;

  const setChannel = (channel: string) => {
    window.electron.ipcRenderer.sendMessage('requestServerData', [selectedServer, channel]);
  }

  return(
    <Box className="ChannelList">
      <Typography className="FlexColumnHeading">
        {selectedServer}
      </Typography>
      <>
        {console.log(channels)}
      </>
      <Stack alignItems="center" spacing={2}>
        {channels.map((channel) => (
          <IconButton
            size="medium"
            color="secondary"
            onClick={() => setChannel(channel)}
            key={channel}
          >
            {channel}
          </IconButton>
        ))}
        <ChannelPlus/>
      </Stack>
    </Box>
  );
});

export default ChannelList;
