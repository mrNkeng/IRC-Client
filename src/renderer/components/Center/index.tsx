import '../../../styles.css';
import { Grid, Button, Box, Typography, Tooltip, IconButton, } from '@mui/material';
import { ChatWindow } from 'renderer/components/Center/Chat/ChatWindow';

interface HomeProps {}

function Home(props: HomeProps) {
  return (
    <Box className="TextWindow">
      <ChatWindow />
    </Box>
  );
};

export default Home;
