import React, { useEffect, useState } from 'react';
import { Grid, Button, Box, Typography, Tooltip, IconButton, } from '@mui/material';
import { ChatWindow } from 'renderer/components/Center/Chat/ChatWindow';

interface HomeProps {}

function Home(props: HomeProps) {
  return (
    <Box
      sx={{
        alignItems: 'center',
        justifyContent: 'right',
        height: '100vh',
        backgroundColor: '#36393e',
        padding: 0,
      }}
    >
      <ChatWindow />
    </Box>
  );
};

export default Home;
