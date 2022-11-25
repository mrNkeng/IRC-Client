import '../../../styles.css';
import { Box, Typography } from '@mui/material';
import { ChatWindow } from 'renderer/components/Center/Chat/ChatWindow';
import { Message } from '../../../data-models/interfaces';

export interface WindowProps {
  currentChannel: string | undefined;
  messages: ReadonlyArray<Message>;
}

function CenterWindow(props: WindowProps) {
  return (
    <Box className="TextWindow">
      <Box className = "WindowHeadingContainer">
        <Typography className="WindowHeading">
          {props.currentChannel}
        </Typography>
      </Box>

      <ChatWindow />
    </Box>
  );
};

export default CenterWindow;
