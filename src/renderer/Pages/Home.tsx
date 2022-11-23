import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import { Grid, Button, Box, Typography, Tooltip, IconButton, styled, Paper, MenuList, MenuItem, ListItemIcon, ListItemText, Divider, makeStyles, Theme } from "@mui/material";
import { visitEachChild } from "typescript";
import { ChatWindow } from "renderer/components/Chat/ChatWindow";
import { color } from "@mui/system";
import MessageIcon from '@mui/icons-material/Message';
import BlockIcon from '@mui/icons-material/Block';

import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import { Cloud, ContentCopy, ContentCut, ContentPaste } from "@mui/icons-material";

interface HomeProps { }

interface Server {
  serverName: string;
}

interface User {
  userName: string;

}


const servers: ReadonlyArray<Server> = [
  { serverName: "Coolest Server Ever" },
  { serverName: "Cool Programming Server" },
  { serverName: "Another One" },
  { serverName: "Yet another SERVER" },
  { serverName: "Jay D Server" }


];

const users: ReadonlyArray<User> = [
  { userName: "Michael"},
  { userName: "Christopher" },
  { userName: "Jessica" },
  { userName: "Matthew" },
  { userName: "Ashley" },
  { userName: "Jennifer" },
  { userName: "Joshua" },
  { userName: "Amanda" },
  { userName: "Daniel" },
  { userName: "David" },
  { userName: "James" },
  { userName: "Robert" },
  { userName: "John" },
  { userName: "Joseph" },
  { userName: "Andrew" },
  { userName: "Ryan" },
];


interface ServerListProps {
  servers: ReadonlyArray<Server>;
  setServer: (server: Server) => void;
}

interface UserListProps {
  users: ReadonlyArray<User>;
}

const ServerList = (props: ServerListProps) => {
  return (
    <Box style={{ margin: "0px", padding: "0px" }}>
      <Typography sx={{fontSize: 'large',
            textAlign: 'center',
            paddingTop:' 10px',
            paddingBottom: '10px',
            fontWeight: 'bold',
            color: 'lightgrey' }}>Server List</Typography>
      <Stack>
        {props.servers.map((server, index) => (
          <Tooltip title= {server.serverName} placement="right" arrow key={index}>
         <IconButton  size="large" color= "secondary" onClick={() => props.setServer(server)}>
         <CatchingPokemonIcon fontSize="inherit" />
         </IconButton>
          </Tooltip>
        ))}
      </Stack>
    </Box>
  );
};

const UserList = (props: UserListProps) => {
  const [show, setShow] = useState(false);
  const [points, setPoints] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleClick = () => setShow(false);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const boxWidth = 180;
  // TODO: remove any and get react event type
  const onContextMenu = (event: any) => {
      event.preventDefault();
      setShow(true);
      let x = event.pageX;
      let y = event.pageY;
      //
      if (window.screen.width <= boxWidth + x) {
        x = window.screen.width - boxWidth;
      }
      setPoints({ x: x, y: y });
  }

  const onMessage = () => {
    console.log("sending message")
  }

  const onBlock = () => {

  }

  const style = { width: boxWidth, maxWidth: '50%', borderRadius: '5px', top: points.y, left: points.x, position: "absolute"}

  return (
    <Box style={{ margin: "0px", padding: "0px" }}>
      <Typography sx={{fontSize: 'large',
            textAlign: 'center',
            paddingTop:' 10px',
            fontWeight: 'bold',
            color: '#2E8B57' }} >Online</Typography>
      <Stack sx={{fontSize: 'large',
            textAlign: 'center',
            paddingTop:' 10px',
            fontWeight: 'bold',
            color: 'lightgrey' }} >
        {props.users.map((user, index) => (
          <Typography key={index} onContextMenu={onContextMenu}>{user.userName}</Typography>
        ))}
        {show && (
        <Paper sx={style}>
        <MenuList sx= {{ backgroundColor: '#383838', borderRadius: '5px', position:'absolute'}}>
          <MenuItem sx= {{ backgroundColor: '#7289da'}} onClick={onMessage}>
            <ListItemText>Message</ListItemText>
            <ListItemIcon >
              <MessageIcon fontSize="small" />
            </ListItemIcon>
          </MenuItem>

          <Divider />

          <MenuItem sx= {{ backgroundColor: '#7289da'}} onClick={onBlock}>
            <ListItemText>Block</ListItemText>
            <ListItemIcon>
              <BlockIcon fontSize="small"/>
            </ListItemIcon>
          </MenuItem>


        </MenuList>
      </Paper>
      )}
      </Stack>
    </Box>
  );
};

export const Home = (props: HomeProps) => {
  const [currServer, setCurrServer] = useState<Server>();

  useEffect(() => {});
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box
          className="App"
          style={{
            backgroundColor: "#36393e",
            height: "75px",
            justifyContent: "center",
            alignItems: "center",
            borderBottom: '2px solid #2C2F33'
        }}>
          <span className="heading">
            <Box sx =
            {{fontSize: 'large',
            textAlign: 'center',
            paddingTop:' 10px',
            fontWeight: 'bold',
            color: 'lightgrey' }}>AOL Messenger</Box>
          </span>
        </Box>
      </Grid>


      <Grid item xs={1}>
        <Box
          style={{
            alignItems: "center",
            justifyContent: "right",
            height: "100vh",
            backgroundColor: "#1e2124"
        }}>
          <ServerList servers={servers} setServer={setCurrServer} />
        </Box>
      </Grid>


      <Grid item xs={1.5}>
      <Box
          style={{
            height: "100vh",
            backgroundColor: "#282b30",
        }}>
      <Typography sx={{fontSize: 'large',
            textAlign: 'center',
            paddingTop:' 10px',
            paddingBottom: '10px',
            fontWeight: 'bold',
            color: 'lightgrey'}}>
            {currServer?.serverName}
            </Typography>
      </Box>
      </Grid>
      <Grid item xs={8}>
        <Box
          sx={{
            alignItems: "center",
            justifyContent: "right",
            height: '100vh',
            backgroundColor: "#36393e",
            padding: 0
          }}
        >

          <ChatWindow/>
        </Box>
      </Grid>


      <Grid item xs={1.5}>
        <Box
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            backgroundColor: "#2C2F33",
            padding: 0,
            borderColor: "darkgray"
        }}>
          <UserList users={users}/>
        </Box>
      </Grid>
    </Grid>
  );
};
