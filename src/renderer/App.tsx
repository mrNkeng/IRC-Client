import '../styles.css';
import { Box, CssBaseline, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import CenterWindow from './components/Center';
import UserList from './components/UserList';
import ServerList from './components/ServerList';
import Header from './components/Header';
import ChannelList from './components/ChannelList';
import * as Interfaces from './components/interfaces';

//var mock_data = require('./components/mockdata.json');
import mock_data from './components/mockdata.json'

let mock_servers: ReadonlyArray<Interfaces.Server> = mock_data.ServerList.map((list: Interfaces.ServerList) => { return { serverName: list.serverName }});

let global_data: Interfaces.Root = mock_data;

function getMessages(currServer: Interfaces.Server | undefined) {
  //uses built in array functions
  //see more: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
  //TODO once someone figures out how to write the actual chat window
  const str: Interfaces.Message[] | undefined =
    [];

  if (str != undefined) {
    return str;
  }
  return [];
}

function getChannels(currServer: Interfaces.Server | undefined) {
  //uses built in array functions
  //see more: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
  const str: Interfaces.Channel[] | undefined =
    global_data.ServerList.find((element) => {
      return element.serverName == currServer?.serverName
    })?.channelList?.map((element: Interfaces.ChannelList) => {
      return { channelName: element.channelName }
    });

  if (str != undefined) {
    return str;
  }
  return [];
}

function getUsers(currServer: Interfaces.Server | undefined) {
  //uses built in array functions
  //see more: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
  const str: Interfaces.User[] | undefined =
    global_data.ServerList.find((element) => {
      return element.serverName == currServer?.serverName
    })?.userList.map(item => {
      return { userName: item };
    });

  if (str != undefined) {
    return str;
  }
  return [];
}

export default function App() {
  const [currServer, setCurrServer] = useState<Interfaces.Server>();
  const [currChannel, setCurrChannel] = useState<Interfaces.Channel>();

  return (
    <Grid className="App" container>
      <CssBaseline/>

      {/* Header */}
      <Grid className="FlexChildrenRow" item xs={12}>
        <Header />
      </Grid>

      {/* Server List */}
      <Grid className="FlexChildrenColumn" item xs={0.5}>
        <ServerList servers={mock_servers} setServer={setCurrServer} />
      </Grid>

      {/* Channel List */}
      <Grid className="FlexChildrenColumn" item xs={1.25}>
          <ChannelList currentServer={currServer?.serverName} channels={getChannels(currServer)} setChannel={setCurrChannel}/>
      </Grid>

      {/* Main Window */}
      <Grid className="FlexChildrenColumn" item xs={9}>
        {/* TODO: add logic here to display login, signup, and settings pages */}
        <CenterWindow currentChannel={currChannel?.channelName} messages={getMessages(currServer)} />
      </Grid>

      {/* User List */}
      <Grid className="FlexChildrenColumn" item xs={1.25}>
          <UserList users={getUsers(currServer)} />
      </Grid>

    </Grid>
  );
}
