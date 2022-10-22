import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./App";

import logo from "../Images/logo3.jpg";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavBar({ onLogout }) {
  const currentUser = useContext(UserContext);

  function handleClick() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => onLogout());
  }

  return (
    <Navbar
      expand="sm"
      fixed="top"
      bg="dark"
      variant="dark"
      className="navBar"
      style={{ margin: "0", padding: "0" }}
    >
      <Container style={{ margin: "0", padding: "0" }}>
        {currentUser ? (
          <>
            <Navbar.Brand href="/" style={{ margin: "0", padding: "0" }}>
              <img src={logo} alt="logo" width="65px" />
              <b>INVITE ONLY</b>
            </Navbar.Brand>
            <Nav.Link href="/" className="navBar-link">
              Feed
            </Nav.Link>
            <Nav.Link href="profile" className="navBar-link">
              Profile
            </Nav.Link>
            <Nav.Link href="members" className="navBar-link">
              Members
            </Nav.Link>
            {currentUser.admin ? (
              <>
                <Nav.Link href="invite" className="navBar-link">
                  Invite People
                </Nav.Link>
              </>
            ) : null}
            <Nav.Link onClick={handleClick} className="navBar-link">
              Logout
            </Nav.Link>
          </>
        ) : (
          <>
            <Link to="/">
              <img src={logo} alt="logo" width="65px" />
            </Link>
            {/* | <Link to="register">Register</Link> */}
          </>
        )}
      </Container>
    </Navbar>
  );
}

export default NavBar;
