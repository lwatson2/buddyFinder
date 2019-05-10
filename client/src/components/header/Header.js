import React, { useState } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "axios";
import { withRouter } from "react-router";

const Header = props => {
  const [showNav, setshowNav] = useState(false);
  const user = sessionStorage.getItem("user");
  const token = sessionStorage.getItem("token");
  const parsedUser = JSON.parse(user);
  const handleLogout = async () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    await axios.get("/users/logout");
    props.history.push("/");
  };
  return (
    <nav
      className={showNav ? "navContainer" : "navContainer navContaierClosed"}
    >
      {showNav ? (
        <button className="navBarCloseBtn" onClick={() => setshowNav(!showNav)}>
          X
        </button>
      ) : (
        <button className="navBarOpenBtn" onClick={() => setshowNav(!showNav)}>
          <FontAwesomeIcon icon="bars" />
        </button>
      )}
      <div
        className={showNav ? " mainNavContainer active" : "mainNavContainer"}
      >
        <Link to="/">
          <button onClick={() => setshowNav(false)} className="navBarLinkBtn">
            Home
          </button>
        </Link>
        {token ? (
          <button onClick={handleLogout} className="NavBarLinkBtn">
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button onClick={() => setshowNav(false)} className="navBarLinkBtn">
              Login
            </button>
          </Link>
        )}
        {token && (
          <>
            <Link to="/createnewpost">
              <button
                onClick={() => setshowNav(false)}
                className="navBarLinkBtn"
              >
                Create new post
              </button>
            </Link>
            <Link to={`/user/${parsedUser.user}`}>
              <button
                onClick={() => setshowNav(false)}
                className="navBarLinkBtn"
              >
                My profile
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default withRouter(Header);
