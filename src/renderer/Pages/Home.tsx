import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import { Button, Box, Typography } from "@mui/material";


interface HomeProps { }

interface Server {
  serverName: string;
}

const servers: ReadonlyArray<Server> = [
  { serverName: "Coolest Server Ever" },
  { serverName: "Cool Programming Server" },
  { serverName: "Another One" },
  { serverName: "Yet another SERVER" }
];

interface ServerListProps {
  servers: ReadonlyArray<Server>;
  setServer: (server: Server) => void;
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

export const Home = (props: HomeProps) => {
  const [currServer, setCurrServer] = useState<Server>();

  useEffect(() => {});

  return (
    <Box style={{
      margin: "0px",
      padding: "0px",
      width: 100
    }}>
      <Box
        className="App"
        style={{
          backgroundColor: "gray",
          margin: "0px",
          padding: "0px"
        }}
      >
        <span className="heading">
          {<Box fontSize="large" />} AOL Messenger{" "}
        </span>

        <Button variant="contained">Login</Button>
      </Box>
      {/* server lists */}
      <ServerList servers={servers} setServer={setCurrServer} />
      <Box
        style={{
          float: "left",
          alignItems: "center",
          justifyContent: "right",
          height: 500,
          width: 500,
          backgroundColor: "lightblue",
          padding: 0
        }}
      >
        <Typography>{currServer?.serverName}</Typography>
      </Box>
      <Box
        style={{
          float: "right",
          alignItems: "center",
          justifyContent: "right",
          height: 500,
          width: 400,
          backgroundColor: "lightblue",
          padding: 0
        }}
      >
        <Typography>{currServer?.serverName}</Typography>
      </Box>
    </Box>
  );
};
