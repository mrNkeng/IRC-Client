import { AccountCircle } from '@mui/icons-material';
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { history } from '../../history';
import { VolumeSlider } from 'renderer/components/Chat/VolumeSlider';
import { getStore } from 'renderer/state';
import { observer } from 'mobx-react';
interface AccountsettingsProps {}

type Tabs = 'account' | 'volume' | 'blockedusers';

const AccountTab = (props: {}) => {
  return (
    <Stack>
      <Typography
        sx={{
          textAlign: 'left',
          paddingTop: ' 80px',
          paddingLeft: '40px',
          fontWeight: 'bold',
          fontSize: '300%',
          color: 'lightgrey',
        }}
      >
        My Account
      </Typography>

      <Typography
        sx={{
          textAlign: 'left',
          paddingTop: ' 10px',
          paddingLeft: '40px',
          fontWeight: 'bold',
          fontSize: '100%',
          color: 'lightgrey',
        }}
      >
        {' '}
        Username
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField
          id="input-with-sx"
          label="Edit Username"
          variant="standard"
        />
      </Box>
    </Stack>
  );
};

const VolumeTab = observer((props: {}) => {
  const {settings, setVolume} = getStore()

  return (
    <Stack>
      <Typography
        sx={{
          textAlign: 'left',
          paddingTop: ' 80px',
          paddingLeft: '40px',
          fontWeight: 'bold',
          fontSize: '300%',
          color: 'lightgrey',
        }}
      >
        Alert Volume Settings
      </Typography>
      <VolumeSlider update={setVolume} value={settings.notificationVolume} />
    </Stack>
  );
});

const BlockedUsersTab = (props: {}) => {
  return (
    <Stack>
      <Typography
        sx={{
          textAlign: 'left',
          paddingTop: ' 80px',
          paddingLeft: '40px',
          fontWeight: 'bold',
          fontSize: '300%',
          color: 'lightgrey',
        }}
      >
        Blocked Users
      </Typography>
    </Stack>
  );
};

interface RenderTabProps {
  tab: Tabs
}

const RenderTab = (props: RenderTabProps) => {
  const { tab } = props;
  switch(tab) {
    case 'account':
      return <AccountTab />
    case 'volume':
      return <VolumeTab />
    case 'blockedusers':
      return <BlockedUsersTab />
    default:
      return <></>
  }
};


export const Accountsettings = (props: AccountsettingsProps) => {
  const [tab, setTab] = useState<Tabs>('account');

  const Skip = () => {
    history.push("/Chat");
  }

  return (
    //TODO fix styling on button
    <Grid className="AppContainer" container>

      <Grid item xs={4}>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "right",
          justifyContent:"right",
          backgroundColor: "	#1e2124",
          height: "100vh"
        }}>
          <Button onClick={() => {Skip();}} size="small" variant="outlined">
            Home
          </Button>
        </Box>
      </Grid>

      <Grid item xs={1}>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "right",
          justifyContent:"right",
          backgroundColor: "	#1e2124",
          height: "100vh"
        }}>
          <Typography sx={{fontSize: 'large',
                textAlign: 'right',
                paddingTop:' 70px',
                paddingRight: '100px',
                fontWeight: 'bold',
                color: 'lightgrey'
          }} >
            User Settings
          </Typography>
          <Stack>

            <Button onClick={()=> setTab("account")} variant="text" sx={{justifyContent:'flex-start', paddingTop:'20px', paddingBottom: '15px'}}>
              <Typography className="randomSettingsThingsIcantNameRightNow">
                My Account
              </Typography>
            </Button>

            <Button onClick={()=> setTab("blockedusers")} variant="text" sx={{justifyContent:'flex-start', paddingBottom: '15px'}}>
              <Typography className="randomSettingsThingsIcantNameRightNow">
                Blocked Users
              </Typography>
            </Button>

            <Button onClick={()=> setTab("volume")} variant="text" sx={{justifyContent:'flex-start', paddingBottom: '15px'}}>
              <Typography className="randomSettingsThingsIcantNameRightNow">
                Alert Volume Settings
              </Typography>
            </Button>

            <Button variant="text" sx={{justifyContent:'flex-start', paddingBottom: '15px'}}>
              <Typography className="randomSettingsThingsIcantNameRightNow">
                Direct Message Settings
              </Typography>
            </Button>

          </Stack>

        </Box>
      </Grid>

      <Grid item xs={7}>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          justifyContent:"left",
          backgroundColor: "#424549",
          height: "100vh"
        }}>
          <Stack>
            <RenderTab tab={tab} />
          </Stack>
        </Box>
      </Grid>

    </Grid>
  );
};
