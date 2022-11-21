import { AccountCircle } from '@mui/icons-material';
import { Box, Button, FormControl, Grid, Stack, TextField, Typography } from '@mui/material';
import React from 'react';

interface AccountsettingsProps {
}
export const Accountsettings = (props: AccountsettingsProps) => {
  return (
    <Grid container>
     <Grid item xs={4}>
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "right",
      justifyContent:"right",
      backgroundColor: "	#1e2124",
      height: "100vh"
    }}></Box>
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
            color: 'lightgrey' }} >User Settings
      </Typography>
      <Stack>
      <Button variant="text" sx={{justifyContent:'flex-start', paddingTop:'20px', paddingBottom: '15px'}}>
        <Typography sx={{fontSize: 'inherit',
            textAlign: 'right',
            fontWeight: 'bold',
            color: 'lightgrey' }} >My Account
      </Typography></Button>

      <Button variant="text" sx={{justifyContent:'flex-start', paddingBottom: '15px'}}>
        <Typography sx={{fontSize: 'inherit',
            textAlign: 'right',
            fontWeight: 'bold',
            color: 'lightgrey' }} >Blocked Users
      </Typography></Button>

      <Button variant="text" sx={{justifyContent:'flex-start', paddingBottom: '15px'}}>
        <Typography sx={{fontSize: 'inherit',
            textAlign: 'right',
            fontWeight: 'bold',
            color: 'lightgrey' }} >Alert Volume Settings
      </Typography></Button>

      <Button variant="text" sx={{justifyContent:'flex-start', paddingBottom: '15px'}}>
        <Typography sx={{fontSize: 'inherit',
            textAlign: 'right',
            fontWeight: 'bold',
            color: 'lightgrey' }} >Direct Message Settings
      </Typography></Button>

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
      <Typography sx={{fontSize: 'large',
            textAlign: 'left',
            paddingTop:' 80px',
            paddingLeft: '40px',
            fontWeight: 'bold',
            fontSize: '300%',
            color: 'lightgrey' }} >My Account</Typography>

      <Typography sx={{fontSize: 'large',
            textAlign: 'left',
            paddingTop:' 10px',
            paddingLeft: '40px',
            fontWeight: 'bold',
            fontSize: '100%',
            color: 'lightgrey' }} > Username</Typography>
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
