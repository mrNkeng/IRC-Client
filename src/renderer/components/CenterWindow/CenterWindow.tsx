import '../../styles.css';
import { Box, Typography } from '@mui/material';
import { getStore } from 'renderer/state';
import { ChatWindow } from './Chat/ChatWindow';
import { observer } from 'mobx-react';

const CenterWindow = observer(() => {
  let { selectedChannel, messages } = getStore();


  //TODO add back metadata thing somewhere here
  return (
    <Box className="TextWindow">
      <Box className = "WindowHeadingContainer">
        <Typography className="WindowHeading">
          {selectedChannel}
        </Typography>
      </Box>
      <ChatWindow messages={messages}/>
    </Box>
  );
});

export default CenterWindow;
