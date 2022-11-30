import { Box } from "@mui/material";
import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import App from '../../App'
import Home from '../Center';
import { Login } from '../Login/Login';
import { Signup } from '../SignUp/Signup';
import { Accountsettings } from '../UserSettings/Accountsettings';

function NavBar() {

  return (
    <Box>
      <nav
        style={{
          justifyContent: 'space-evenly',
          height: "3vh",
          backgroundColor:"#1e2124"
        }}
      >
        <Link to="/" style={{ margin: '15px' }}>Home</Link>
        <Link to="/Accountsettings" style={{ margin: '15px' }}>Accountsettings</Link>
        <Link to="/Login" style={{ margin: '15px' }}>Login</Link>
        <Link to="/Signup" style={{ margin: '15px' }}>Signup</Link>
      </nav>
    </Box>
  );
}

export default NavBar;
