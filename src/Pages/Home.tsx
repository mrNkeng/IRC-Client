import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import { Grid, Button, Box, Typography } from "@mui/material";
import { visitEachChild } from "typescript";

interface HomeProps {
}

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
  { serverName: "Yet another SERVER" }
];

const users: ReadonlyArray<User> = [
  { userName: "Michael" },
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
      <Typography>Server List</Typography>
      <Stack>
        {props.servers.map((server) => (
          <Button variant="contained" onClick={() => props.setServer(server)}>
            <Typography>{server.serverName}</Typography>
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

const UserList = (props: UserListProps) => {
  return (
    <Box style={{ margin: "0px", padding: "0px" }}>
      <Typography>User List</Typography>
      <Stack>
        {props.users.map((user) => (
          <Typography>{user.userName}</Typography>
        ))}
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
            backgroundColor: "lightgray"
        }}>
          <span className="heading">
            {<Box fontSize="large" />} AOL Messenger{" "}
          </span>
          <Button variant="contained">Login</Button>
        </Box>
      </Grid>
      <Grid item xs={1}>
        <Box
          style={{
            alignItems: "center",
            justifyContent: "right",
            height: 800,
            backgroundColor: "lightgray",
            padding: 0,
            borderWidth: 10,
            borderColor: "darkgray"
        }}>
          <ServerList servers={servers} setServer={setCurrServer} />
        </Box>
      </Grid>
      <Grid item xs={10}>
        <Box
          style={{
            alignItems: "center",
            justifyContent: "right",
            height: '100%',
            backgroundColor: "lightblue",
            padding: 0
          }}
        >
          <Typography>{currServer?.serverName}</Typography>
        </Box>
      </Grid>
      <Grid item xs={1}>
        <Box
          style={{
            alignItems: "center",
            justifyContent: "right",
            height: 800,
            backgroundColor: "lightgray",
            padding: 0,
            border: 10,
            borderColor: "darkgray"
        }}>
          <UserList users={users}/>
        </Box>
      </Grid>
    </Grid>
  );
};

