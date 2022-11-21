import '../../../styles.css';
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import * as Interfaces from '../interfaces';

function ChannelList(props: Interfaces.ChannelListProps) {
  return(
    <Box className="ChannelList">
      <Typography className="FlexColumnHeading">
        {props.currentServer}
      </Typography>

      <Stack>
        {props.channels.map((channel) => (
          <IconButton
            size="medium"
            color="secondary"
            onClick={() => props.setChannel(channel)}
            key={channel.channelName}
          >
            {channel.channelName}
          </IconButton>
        ))}
      </Stack>
    </Box>
  );
}

export default ChannelList;
