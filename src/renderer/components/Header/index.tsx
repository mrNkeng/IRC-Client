import '../../styles.css';
import { Box, Grid } from "@mui/material";
import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Login } from '../Login/Login';
import { Signup } from '../SignUp/Signup';
import { Accountsettings } from '../UserSettings/Accountsettings';
import { Settingsbutton } from '../Chat/Settingsbutton';


function Header() {
  return(
    //TODO fix this ugly mess
    <Box className="Header">
      <Box className="FlexColumnHeading">
        <Grid container>
        <Grid item xs={11}>
        <nav>
          <Link to="/Login" style={{ margin: '15px' }}>Login</Link>
          <Link to="/Signup" style={{ margin: '15px' }}>Signup</Link>
        </nav>

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
