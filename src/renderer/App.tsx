import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Accountsettings, Home, Login, Serverlist, Signup } from './Pages';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';

export default function App() {
  return (
    <Router>
      <CssBaseline/>
      <div>
        <nav style={{
        justifyContent: 'space-evenly',
        height: "40px",
        backgroundColor:"#1e2124"
        }}>
          <Link to="/">Home</Link>
          <Link to="/Accountsettings">Accountsettings</Link>
          <Link to="/Login">Login</Link>
          <Link to="/Serverlist">Serverlist</Link>
          <Link to="/Signup">Signup</Link>
          

        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Accountsettings" element={<Accountsettings />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Serverlist" element={<Serverlist />} />
          <Route path="/Signup" element={<Signup />} />
          

        </Routes>
      </div>
    </Router>
  );
}
