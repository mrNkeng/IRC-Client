import '../styles.css';
import { Box, CssBaseline, Grid } from '@mui/material';
import { useState } from 'react';
import UserList from './components/UserList';
import ServerList from './components/ServerList';
import Header from './components/Header';
import ChannelList from './components/ChannelList';
import { Root, ServerData, ChannelData, Server, Channel, User, Message } from '../data-models/interfaces';

//var mock_data = require('./components/mockdata.json');
import mock_data from '../main/const/mockdata.json';
import NavBar from './components/NavBar';
import { ChatWindow } from './components/Chat/ChatWindow';
import CenterWindow from './components/CenterWindow/CenterWindow';


//these two lines will be changed, not sure what I'm doing with the types yet
let mock_servers: ReadonlyArray<Server> = mock_data.ServerList.map((list: ServerData) => { return { name: list.serverName }});
let global_data: Root = mock_data;

function getMessages(currServer: Server | undefined, currChannel: Channel | undefined) {
  //uses built in array functions
  //see more: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
  const str: Message[] | undefined =
    global_data.ServerList.find((element) => {
      return element.serverName == currServer?.name
    })?.channelList?.find((element) => {
      return element.channelName == currChannel?.name
    })?.messages.map((element) => {
      return { content: element };
    });

  if (str != undefined) {
    //it works!
    //console.log(str);
    return str;
  }
  return [];
}

function getChannels(currServer: Server | undefined) {
  //uses built in array functions
  //see more: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
  const str: Channel[] | undefined =
    global_data.ServerList.find((element) => {
      return element.serverName == currServer?.name
    })?.channelList?.map((element: ChannelData) => {
      return { name: element.channelName }
    });

  if (str != undefined) {
    return str;
  }
  return [];
}

function getUsers(currServer: Server | undefined) {
  //uses built in array functions
  //see more: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
  const str: User[] | undefined =
    global_data.ServerList.find((element) => {
      return element.serverName == currServer?.name
    })?.userList.map(item => {
      return { name: item };
    });

  if (str != undefined) {
    return str;
  }
  return [];
}

export default function App() {
  const [currServer, setCurrServer] = useState<Server>();
  const [currChannel, setCurrChannel] = useState<Channel>();

  return (
    <Grid className="App" container>
      <CssBaseline/>
      <NavBar/>

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
          <ChannelList currentServer={currServer?.name} channels={getChannels(currServer)} setChannel={setCurrChannel}/>
      </Grid>

      {/* Main Window */}
      <Grid className="FlexChildrenColumn" item xs={9}>
        {/*
          TODO: add logic here to display login, signup, and settings pages
          Not sure how to route this. <routes> can be across different files but this set up is tricky
        */}
        <CenterWindow windowTitle={currChannel?.name}>
          <ChatWindow/>
        </CenterWindow>
      </Grid>

      {/* User List */}
      <Grid className="FlexChildrenColumn" item xs={1.25}>
          <UserList users={getUsers(currServer)} />
      </Grid>

    </Grid>
  );
}
