import '../../styles.css';
import CenterWindow from 'renderer/components/CenterWindow/CenterWindow';
import Header from 'renderer/components/Header';
import ServerList from '../ServerList';
import ChannelList from '../ChannelList';
import UserList from '../UserList';
import { CssBaseline, Grid } from '@mui/material';
import { observer } from 'mobx-react';

export const ChatApplication = observer(() => {
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
        <CenterWindow />
      </Grid>

      <Grid className="FlexChildrenColumn" item xs={1.20}>
        <UserList/>
      </Grid>
    </Grid>
  );
});
