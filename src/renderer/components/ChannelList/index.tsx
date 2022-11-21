import '../../../styles.css';
import { Box, Typography } from "@mui/material";

interface ChannelListProps {
  currentServer: string | undefined,
  channels: string[],
}

function ChannelList(props: ChannelListProps) {
  return(
    <Box className="ChannelList">
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
        {props.currentServer}
      </Typography>
    </Box>
  );
}

export default ChannelList;
