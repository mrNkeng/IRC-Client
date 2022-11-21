import '../../../styles.css';
import { Grid, Button, Box, Typography, Tooltip, IconButton, } from '@mui/material';
import { ChatWindow } from 'renderer/components/Center/Chat/ChatWindow';
import * as Interfaces from '../interfaces';

function CenterWindow(props: Interfaces.WindowProps) {
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
