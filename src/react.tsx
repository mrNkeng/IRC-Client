import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Link, Routes} from 'react-router-dom'
import { render } from 'react-dom';
import {Home, Login, Serverlist} from './Pages'; // do we even need pages folder if we are switching between componenets???

const Index = () => {
  return(
    <Router>
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/Login">Login</Link>
        <Link to="/Serverlist">Serverlist</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Serverlist" element={<Serverlist/>} />
      </Routes>
    </div>
  </Router>
  );
}


ReactDOM.render(<Index />, document.getElementById('app'));
