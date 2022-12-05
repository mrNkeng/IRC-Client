import '../../styles.css';
import { Box, Grid, Typography } from "@mui/material";
import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Login } from '../Login/Login';
import { Signup } from '../SignUp/Signup';
import { Accountsettings } from '../UserSettings/Accountsettings';
import {Settingsbutton} from './Settingsbutton'


function Header() {
  return(
    //TODO fix this ugly mess
    <Box className="Header">
      <Box className="FlexColumnHeading">
        <Grid container>
        <Grid item xs={11}>
        <Typography sx={{fontSize:"100%", fontWeight: "bold"}}>AOL Messenger</Typography>

        </Grid>
        <Grid item xs={1}>

          <Settingsbutton >

          </Settingsbutton>
        </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Header;
