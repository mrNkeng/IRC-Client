import '../../styles.css';
import { Box, Divider, IconButton, ListItemIcon, ListItemText, MenuItem, MenuList, Paper, Stack, Typography } from "@mui/material";
import { ChannelPlus } from './ChannelPlus';
import { getStore } from 'renderer/state';
import { observer } from 'mobx-react';
import { RefreshChannelList } from '../RefreshChannelList';
import { useEffect, useState } from 'react';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import LogoutIcon from '@mui/icons-material/Logout';

const ChannelList = observer(() => {

  const store = getStore();
  const selectedServer = store.selectedServer;

  const [show, setShow] = useState(false);
  const [targetChannel, setTargetChannel] = useState("")
  const [points, setPoints] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleClick = () => setShow(false);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);
  const boxWidth = 180;

  const onContextMenu = (event: any, name: string) => {
    event.preventDefault();
    setShow(true);
    let x = event.pageX;
    let y = event.pageY;
    //
    if (window.screen.width <= boxWidth + x) {
      x = window.screen.width - boxWidth;
    }
    setPoints({ x: x, y: y });
    setTargetChannel(name)
  }

  const onDisconnect = () => {
    window.electron.ipcRenderer.sendMessage('disconnectFromChannel', [selectedServer, targetChannel]);
  }

const onConnect = () => {
    window.electron.ipcRenderer.sendMessage('connectToChannel', [selectedServer, targetChannel]);
  }


  const contextMenuStyle = { width: boxWidth, maxWidth: '50%', borderRadius: '5px', top: points.y, left: points.x, position: "absolute"}


  const setChannel = (channel: string) => {
    store.changeChannel(channel);
  }

  return(
    <Box className="ChannelList">
      {show && (
        <Paper sx={contextMenuStyle}>
        <MenuList sx= {{ backgroundColor: '#383838', borderRadius: '5px', position:'absolute', zIndex:20}}>
          <MenuItem sx= {{ backgroundColor: '#7289da'}} onClick={onConnect}>
            <ListItemText>Join Channel{"    "}</ListItemText>
            <ListItemIcon >
              <ConnectWithoutContactIcon fontSize='small'/>
            </ListItemIcon>
          </MenuItem>

          <Divider />

          <MenuItem sx= {{ backgroundColor: '#7289da'}} onClick={onDisconnect}>
            <ListItemText>Leave Channel</ListItemText>
            <ListItemIcon>
              <LogoutIcon fontSize="small"/>
            </ListItemIcon>
          </MenuItem>


        </MenuList>
      </Paper>
      )}
      <Typography className="FlexColumnHeading">
        {selectedServer}
      </Typography>
      <Stack alignItems="center" spacing={2}>
        {store.channels.map((channel) => (
          <IconButton
            onContextMenu={(event) => onContextMenu(event, channel.name)}
            size="medium"
            color={channel.connected ? "secondary" : "error"}
            onClick={() => setChannel(channel.name)}
            key={channel.name}
          >
            {channel.name}
          </IconButton>
        ))}
        <ChannelPlus/>
        <RefreshChannelList />
      </Stack>
    </Box>
  );
});

export default ChannelList;
