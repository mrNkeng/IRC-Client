import '../../styles.css';
import { CssBaseline, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import UserList from 'renderer/components/UserList';
import ServerList from 'renderer/components/ServerList';
import Header from 'renderer/components/Header';
import ChannelList from 'renderer/components/ChannelList';
import mock_data from 'main/const/mockdata.json';
import { ChatWindow } from 'renderer/components/Chat/ChatWindow';
import CenterWindow from 'renderer/components/CenterWindow/CenterWindow';
import {
  Root,
  ServerData,
  ChannelData,
  Server,
  Channel,
  User,
  Message,
} from 'data-models/interfaces';
import { observer } from 'mobx-react';
import { getStore } from 'renderer/state';

export const ChatApplication = observer(() => {
  const [currServer, setCurrServer] = useState<Server>();
  const [currChannel, setCurrChannel] = useState<Channel>();
  const store = getStore();

  const data = store.serverData

  function getUsers() {
    //uses built in array functions
    //see more: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    const str: User[] | undefined =
      data?.ServerList.find((element) => {
        return element.serverName == currServer?.name
      })?.userList.map(item => {
        return { name: item };
      });

    if (str != undefined) {
      return str;
    }
    return [];
  }

  function getChannels() {
    //uses built in array functions
    //see more: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    const str: Channel[] | undefined =
      data?.ServerList.find((element) => {
        return element.serverName == currServer?.name
      })?.channelList?.map((element: ChannelData) => {
        return { name: element.channelName }
      });

    if (str != undefined) {
      return str;
    }
    return [];
  }

  function getMessages() {
    //uses built in array functions
    //see more: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    const str: Message[] | undefined =
      data?.ServerList.find((element) => {
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

  function getServerList() {
    //this is here to not clutter up the nice look of return html tags
    return data?.ServerList.map((list: ServerData) => { return { name: list.serverName }});
  }

  function setServerAndClearState(server: Server) {
    //when we change the server, we want to change what channel is in view
    //TODO search for general and assign it here
    setCurrServer(server);
    setCurrChannel(undefined);
  }

  return (
    <Grid className="App" container>
      <CssBaseline />

      {/* Header */}
      <Grid className="FlexChildrenRow" item xs={12}>
        <Header />
      </Grid>

      {/* Server List */}
      <Grid className="FlexChildrenColumn" item xs={0.5}>
        <ServerList
          servers={getServerList()}
          setServerAndClearState={setServerAndClearState}
        />
      </Grid>

      {/* Channel List */}
      <Grid className="FlexChildrenColumn" item xs={1.25}>
        <ChannelList
          currentServer={currServer?.name}
          channels={getChannels()}
          setChannel={setCurrChannel}
        />
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
        <UserList users={getUsers()} />
      </Grid>
    </Grid>
  );
})
