import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home, Login, Serverlist } from './Pages';

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/Login">Login</Link>
          <Link to="/Serverlist">Serverlist</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Serverlist" element={<Serverlist />} />
        </Routes>
      </div>
    </Router>
  );
}
