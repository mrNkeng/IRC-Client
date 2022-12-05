import '../../styles.css';
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { Channel } from 'data-models/IRCData';
import { ChannelPlus } from './ChannelPlus';

interface ChannelListProps {
  currentServer: string | undefined;
  channels: ReadonlyArray<Channel>;
  setChannel: (channel: Channel) => void;
}

function ChannelList(props: ChannelListProps) {
  return(
    <Box className="ChannelList">
      <Typography className="FlexColumnHeading">
        {props.currentServer}
      </Typography>

      <Stack alignItems="center" spacing={2}>
        {props.channels.map((channel) => (
          <IconButton
            size="medium"
            color="secondary"
            onClick={() => props.setChannel(channel)}
            key={channel.name}
          >
            {channel.name}
          </IconButton>
        ))}
        <ChannelPlus/>
      </Stack>
    </Box>
  );
}

export default ChannelList;
