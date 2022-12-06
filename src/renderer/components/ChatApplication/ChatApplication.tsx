import '../../styles.css';
import Header from 'renderer/components/Header';
import ServerList from '../ServerList';
import ChannelList from '../ChannelList';
import UserList from '../UserList';
import { CssBaseline, Grid } from '@mui/material';
import { observer } from 'mobx-react';
import { ChatWindow } from '../Chat/ChatWindow';
import ChannelUserList from '../ChannelUserList';
import { getStore } from 'renderer/state';
import { ServerMetadata } from '../ServerMetadata';

export const ChatApplication = observer(() => {
  const { selectedChannel } = getStore()

  return (
    <Grid className="App" container>
      <CssBaseline />

      <Grid className="FlexChildrenRow" item xs={12}>
        <Header />
      </Grid>

      <Grid className="FlexChildrenColumn" item xs={0.75}>
        <ServerList />
      </Grid>

      <Grid className="FlexChildrenColumn" item xs={1.25}>
        <ChannelList/>
      </Grid>

      <Grid className="FlexChildrenColumn" item xs={8}>
        {selectedChannel === "" ? <ServerMetadata/> : <ChatWindow /> }
      </Grid>

      <Grid className="FlexChildrenColumn" item xs={1}>
        <ChannelUserList/>
      </Grid>

      <Grid className="FlexChildrenColumn" item xs={1}>
        <UserList/>
      </Grid>
    </Grid>
  );
});
