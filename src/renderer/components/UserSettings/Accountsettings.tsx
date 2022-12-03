import { AccountCircle } from '@mui/icons-material';
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { history } from '../../history';

interface AccountsettingsProps {}

export const Accountsettings = (props: AccountsettingsProps) => {

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

            <Button variant="text" sx={{justifyContent:'flex-start', paddingTop:'20px', paddingBottom: '15px'}}>
              <Typography className="randomSettingsThingsIcantNameRightNow">
                My Account
              </Typography>
            </Button>

            <Button variant="text" sx={{justifyContent:'flex-start', paddingBottom: '15px'}}>
              <Typography className="randomSettingsThingsIcantNameRightNow">
                Blocked Users
              </Typography>
            </Button>

            <Button variant="text" sx={{justifyContent:'flex-start', paddingBottom: '15px'}}>
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
            <Typography sx={{
              textAlign: 'left',
              paddingTop:' 80px',
              paddingLeft: '40px',
              fontWeight: 'bold',
              fontSize: '300%',
              color: 'lightgrey'
            }} >
              My Account
            </Typography>

            <Typography sx={{
              textAlign: 'left',
              paddingTop:' 10px',
              paddingLeft: '40px',
              fontWeight: 'bold',
              fontSize: '100%',
              color: 'lightgrey'
            }} >
              Username
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField id="input-with-sx" label="Edit Username" variant="standard" />
            </Box>
          </Stack>
        </Box>
      </Grid>

    </Grid>
  );
};
