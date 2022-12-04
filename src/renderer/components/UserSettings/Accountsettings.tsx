import { AccountCircle, Spa } from '@mui/icons-material';
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { history } from '../../history';
import { VolumeSlider } from 'renderer/components/Chat/VolumeSlider';
interface AccountsettingsProps {}
interface Props {

}
type Tabs = 'account' | 'volume' | 'blockedusers';
export const Space=(props:Props)=>{
 return(
 <Box sx={{display: 'flex', alignItems: 'flex-end', width: 300,  paddingTop:"20px"}}> </Box>
 )
}
export const Confirmbutton=(props:Props)=>{
 return(
   <Button variant="contained"  sx={{borderRadius: "70px", paddingTop: "10px", paddingBottom: "10px", backgroundColor:"#1e2124"}} >Confirm</Button>
 )
}

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
         paddingBottom: '15px',
         fontWeight: 'bold',
         fontSize: '100%',
         color: 'lightgrey',
       }}
     >
       {' '}
       Username
     </Typography>
     <Box sx={{ display: 'flex', alignItems: 'flex-end', width: 300, paddingLeft: "30px", paddingTop:"20px", backgroundColor: "#7289da", paddingBottom:"20px", paddingRight:"40px"}}>
       <AccountCircle sx={{ fontSize: "250%",paddingLeft: "15px", color: 'action.active', mr: 1, my: 0.5 }} />
       <TextField
         id="input-with-sx"
         label="Edit Username"
         variant="filled"
         sx={{paddingRight: "20px"}}
       /> <Confirmbutton/>
     </Box>
     <Space/>
     <Typography
       sx={{
         textAlign: 'left',
         paddingTop: ' 10px',
         paddingLeft: '40px',
         paddingBottom: '15px',
         fontWeight: 'bold',
         fontSize: '100%',
         color: 'lightgrey',
       }}
     >
       {' '}
       Password Change
     </Typography>

     <Box sx={{ display: 'flex', alignItems: 'flex-end', width: 300, paddingLeft: "30px", paddingTop:"20px", backgroundColor: "#7289da", paddingBottom:"20px", paddingRight:"40px"}}>
       <TextField
         id="input-with-sx"
         label="Edit Password"
         variant="filled"
         sx={{paddingRight: "20px"}}
       />
     </Box>

     <Box sx={{ display: 'flex', alignItems: 'flex-end', width: 300, paddingLeft: "30px",  backgroundColor: "#7289da", paddingBottom:"20px", paddingRight:"40px"}}>
       <Stack>
       <TextField
         id="input-with-sx"
         label="Confirm Change"
         variant="filled"
         sx={{paddingRight: "20px", paddingBottom: "20px"}}
       />
       <Confirmbutton/>

       </Stack>
       </Box>
   </Stack>
 );
};

const VolumeTab = (props: {}) => {
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
     <VolumeSlider />
   </Stack>
 );
};

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
         backgroundColor: "  #1e2124",
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
         backgroundColor: "  #1e2124",
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

           <Button onClick={()=> setTab("volume")} variant="text"  sx={{justifyContent:'flex-start', paddingBottom: '15px'}}>
             <Typography className="randomSettingsThingsIcantNameRightNow">
               Alert Volume Settings
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


