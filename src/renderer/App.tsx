import '../styles.css';
import { Box, Grid, Typography } from '@mui/material';
import Home from './components/Center';
import UserList from './components/UserList';
import ServerList from './components/ServerList';
import Header from './components/Header';
import ChannelList from './components/ChannelList';
import { useState } from 'react';

interface Server {
  serverName: string;
}

const mock_servers: ReadonlyArray<{serverName: string}> = [
  { serverName: 'Coolest Server Ever' },
  { serverName: 'Cool Programming Server' },
  { serverName: 'Another One' },
  { serverName: 'Yet another SERVER' },
  { serverName: 'Jay D Server' },
];

const mock_users: ReadonlyArray<{userName: string}> = [
  { userName: 'Michael' },
  { userName: 'Christopher' },
  { userName: 'Jessica' },
  { userName: 'Matthew' },
  { userName: 'Ashley' },
  { userName: 'Jennifer' },
  { userName: 'Joshua' },
  { userName: 'Amanda' },
  { userName: 'Daniel' },
  { userName: 'David' },
  { userName: 'James' },
  { userName: 'Robert' },
  { userName: 'John' },
  { userName: 'Joseph' },
  { userName: 'Andrew' },
  { userName: 'Ryan' },
];

export default function App() {
  const [currServer, setCurrServer] = useState<Server>();

  return (
    <Box className="App">
      <Grid container>
        {/* Header */}
        <Grid item xs={12}>
          <Header />
        </Grid>

        {/* Server List */}
        <Grid item xs={1}>
          <ServerList servers={mock_servers} setServer={setCurrServer} />
        </Grid>

        {/* Channel List */}
        <Grid item xs={1.5}>
            <ChannelList currentServer={currServer?.serverName} channels={["test1", "test2"]} />
        </Grid>

        {/* Center */}
        <Grid item xs={8}>
          <Home />
        </Grid>

        {/* User List */}
        <Grid item xs={1.5}>
            <UserList users={mock_users} />
        </Grid>

      </Grid>
    </Box>
  );
}
