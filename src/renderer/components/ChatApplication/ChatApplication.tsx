import '../../styles.css';
import { CssBaseline, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import Header from 'renderer/components/Header';
import { ChatWindow } from 'renderer/components/Chat/ChatWindow';
import CenterWindow from 'renderer/components/CenterWindow/CenterWindow';
import { Channel, Message } from 'data-models';
import { observer } from 'mobx-react';
import { getStore } from 'renderer/state';
import ServerList from '../ServerList';
import { toJS } from 'mobx';
import { ServerMetadata } from '../ServerMetadata';

export const ChatApplication = observer(() => {
  const [currChannel, setCurrChannel] = useState<Channel>();
  let { selectedServer } = getStore();

  const windowName = currChannel ? currChannel.name : selectedServer;

  return (
    <Grid className="App" container>
      <CssBaseline />

      {/* Header */}
      <Grid className="FlexChildrenRow" item xs={12}>
        <Header />
      </Grid>

      {/* Server List */}
      <Grid className="FlexChildrenColumn" item xs={0.8}>
        <ServerList />
      </Grid>

      {/* Channel List */}
      <Grid className="FlexChildrenColumn" item xs={1.20}>
        {/* <ChannelList
          currentServer={currServer?.name}
          channels={getChannels()}
          setChannel={setCurrChannel}
        /> */}

      </Grid>

      {/* Main Window */}
      <Grid className="FlexChildrenColumn" item xs={8.8}>
        {/*
          TODO: add logic here to display login, signup, and settings pages
          Not sure how to route this. <routes> can be across different files but this set up is tricky
        */}
        <CenterWindow windowTitle={windowName}>
          {currChannel ? <ChatWindow messages={[]} /> : <ServerMetadata />}
        </CenterWindow>
      </Grid>

      {/* User List */}
      <Grid className="FlexChildrenColumn" item xs={1.25}>
        {/* <UserList users={getUsers()} /> */}
      </Grid>
    </Grid>
  );
});
