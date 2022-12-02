import '../../styles.css';
import { Box } from "@mui/material";
import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Login } from '../Login/Login';
import { Signup } from '../SignUp/Signup';
import { Accountsettings } from '../UserSettings/Accountsettings';


function Header() {
  return(
    //TODO fix this ugly mess
    <Box className="Header">
      <Box className="FlexColumnHeading">
        <nav>
          <Link to="/Accountsettings" style={{ margin: '15px' }}>Accountsettings</Link>
          <Link to="/Login" style={{ margin: '15px' }}>Login</Link>
          <Link to="/Signup" style={{ margin: '15px' }}>Signup</Link>
          <Link to="/ServerList">Server List</Link>
        </nav>
        AOL Messenger
      </Box>
    </Box>
  );
}

export default Header;
