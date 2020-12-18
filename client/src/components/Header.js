import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel } from "@fortawesome/free-solid-svg-icons";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import { faComments } from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "../context/auth";
import { Link, NavLink, BrowserRouter as Router } from "react-router-dom";

const Header = (props) => {
  const { authTokens } = useAuth();
  const { setAuthTokens } = useAuth();

  const handleLogOut = () => {
    setAuthTokens({ message: "logout", id: null, status: false });
  };
  return (
    <div style={{ position: "sticky", top: 0, marginBottom: 50 }}>
      {/* <Router> */}
      <Navbar sticky="top" bg="light" expand="lg">
        <Navbar.Brand /* href="#home" */ style={{ pointerEvents: "none" }}>
          small talks
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink
              style={{ padding: 10, color: "black" }}
              to={{
                pathname: "/",
                state: { personalBoard: false, userPage: false },
              }}
            >
              <FontAwesomeIcon icon={faComments} /> talks
            </NavLink>

            {authTokens.status && (
              <NavLink
                style={{ padding: 10, color: "black" }}
                to={{
                  pathname: "/",
                  state: { personalBoard: true, userPage: true },
                }}
              >
                <FontAwesomeIcon icon={faCommentAlt} /> my talks
              </NavLink>
            )}

            {!authTokens.status && (
              <Nav.Link href="/login">
                {" "}
                {/* <FontAwesomeIcon icon={faCommentAlt} />  */} login
              </Nav.Link>
            )}
            {authTokens.status && (
              <NavLink
                style={{ padding: 10, color: "black" }}
                to={{
                  pathname: "/",
                  state: { personalBoard: false, userPage: false },
                }}
                onClick={handleLogOut}
              >
                {" "}
                {/* <FontAwesomeIcon icon={faCommentAlt} />  */} logout
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
