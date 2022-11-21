import { PropaneSharp } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

type ChannelListProps = {
  currentServer: string | undefined,
  channels: string[],
}

function ChannelList({ currentServer, channels }: ChannelListProps) {
  return(
    <Box
      style={{
        height: '100vh',
        backgroundColor: '#282b30',
      }}
    >
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
        {currentServer}
      </Typography>
    </Box>
  );
}

export default ChannelList;
