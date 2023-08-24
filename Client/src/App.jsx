import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import { HomePage, Helper, TwoTC, FTTC, LCC, LTC, TwoMPC, LCD, TwoTCC, TwoTCAlts, TwoMPCAlts, TwoTCStats,TwoMPCStats } from "./pages/index.js";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar bg="#444" expand="lg">
        <Navbar.Brand><NavLink to='/'>BTD6 INDEX</NavLink></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href='/2TC'>2TC</Nav.Link>
            <NavDropdown title="" id="basic-nav-dropdown">
              <NavDropdown.Item href='/2TC/Alts'>Alts</NavDropdown.Item>
              <NavDropdown.Item href='/2TC/Stats'>Stats</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href='/FTTC'>FTTC</Nav.Link>
            <Nav.Link href='/LCC'>LCC</Nav.Link>
            <Nav.Link href='/LTC'>LTC</Nav.Link>
            <Nav.Link href='/2MPC'>2MPC</Nav.Link>
            <NavDropdown title="" id="basic-nav-dropdown">
              <NavDropdown.Item href='/2MPC/Alts'>Alts</NavDropdown.Item>
              <NavDropdown.Item href='/2MPC/Stats'>Stats</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href='/LCD'>LCD</Nav.Link>
            <Nav.Link href='/2TCC'>2TCC</Nav.Link>
            <Nav.Link className='Helper' href='/Helper'>Helper</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes>
        <Route path="/" element={<HomePage />}>Home</Route>
        <Route path="/Helper" element={<Helper />}>Home</Route>
        <Route path="/2TC" element={<TwoTC />}>2TC</Route>
        <Route path="/FTTC" element={<FTTC />}>FTTC</Route>
        <Route path="/LCC" element={<LCC />}>LCC</Route>
        <Route path="/LTC" element={<LTC />}>LTC</Route>
        <Route path="/2MPC" element={<TwoMPC />}>2MPC</Route>
        <Route path="/LCD" element={<LCD />}>LCD</Route>
        <Route path="/2TCC" element={<TwoTCC />}>2TCC</Route>
        <Route path="/2TC/Alts" element={<TwoTCAlts />}>2TC/Alts</Route>
        <Route path="/2MPC/Alts" element={<TwoMPCAlts />}>2MPC/Alts</Route>
        <Route path="/2TC/Stats" element={<TwoTCStats />}>2TC/Stats</Route>
        <Route path="/2MPC/Stats" element={<TwoMPCStats />}>2MPC/Stats</Route>
      </Routes>
    </BrowserRouter>
  );
}
