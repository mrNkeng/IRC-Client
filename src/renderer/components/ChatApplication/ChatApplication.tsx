import '../../styles.css';
import { CssBaseline, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import Header from 'renderer/components/Header';
import { ChatWindow } from 'renderer/components/Chat/ChatWindow';
import CenterWindow from 'renderer/components/CenterWindow/CenterWindow';
import {
  ServerData,
  ChannelData,
  Channel,
  User,
  Message,
} from 'data-models/interfaces';
import { observer } from 'mobx-react';
import { getStore } from 'renderer/state';
import ServerList from '../ServerList';
import { toJS } from 'mobx';


export const ChatApplication = observer(() => {
  const [selectedServer, setSelectedServer] = useState<string | undefined>(undefined);
  const [currChannel, setCurrChannel] = useState<Channel>();
  const store = getStore()
  const data = store.serverList
  // FIXME: kind of a shitty resolution ~ please take a look at this
  const messages: Message[] = data.get(selectedServer ?? "")?.messages ?? []

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
          setSelection={setSelectedServer}  />
      </Grid>

      {/* Channel List */}
      <Grid className="FlexChildrenColumn" item xs={1.25}>
        {/* <ChannelList
          currentServer={currServer?.name}
          channels={getChannels()}
          setChannel={setCurrChannel}
        /> */}
      </Grid>

      {/* Main Window */}
      <Grid className="FlexChildrenColumn" item xs={9}>
        {/*
          TODO: add logic here to display login, signup, and settings pages
          Not sure how to route this. <routes> can be across different files but this set up is tricky
        */}
        <CenterWindow windowTitle={currChannel?.name}>
          <ChatWindow messages={messages} />
        </CenterWindow>
      </Grid>

      {/* User List */}
      <Grid className="FlexChildrenColumn" item xs={1.25}>
        {/* <UserList users={getUsers()} /> */}
      </Grid>
    </Grid>
  );
})
