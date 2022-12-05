import '../../styles.css';
import CenterWindow from 'renderer/components/CenterWindow/CenterWindow';
import Header from 'renderer/components/Header';
import ServerList from '../ServerList';
import ChannelList from '../ChannelList';
import UserList from '../UserList';
import { CssBaseline, Grid } from '@mui/material';
import { useState } from 'react';
import { ChatWindow } from 'renderer/components/Chat/ChatWindow';
import { Channel, Message } from 'data-models';
import { observer } from 'mobx-react';
import { getStore } from 'renderer/state';
import { ServerMetadata } from '../ServerMetadata';

export const ChatApplication = observer(() => {
  const [currChannel, setCurrChannel] = useState<Channel>();
  let { selectedServer } = getStore();

  const store = getStore();

  const windowName = currChannel ? currChannel.name : selectedServer;

  return (
    <Grid className="App" container>
      <CssBaseline />

      <Grid className="FlexChildrenRow" item xs={12}>
        <Header />
      </Grid>

      <Grid className="FlexChildrenColumn" item xs={0.8}>
        <ServerList />
      </Grid>

      <Grid className="FlexChildrenColumn" item xs={1.20}>
        <ChannelList/>
      </Grid>

      <Grid className="FlexChildrenColumn" item xs={8.8}>
        <CenterWindow windowTitle={windowName}>
          {currChannel ? <ChatWindow messages={[]} /> : <ServerMetadata />}
        </CenterWindow>
      </Grid>

      <Grid className="FlexChildrenColumn" item xs={1.20}>
        <UserList/>
      </Grid>
    </Grid>
  );
});
