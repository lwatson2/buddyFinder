import React, { useState } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Header(props) {
  const [showNav, setshowNav] = useState(false);
  const username = sessionStorage.getItem("username");
  console.log(username);
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
          <button className="navBarLinkBtn">Home</button>
        </Link>
        <Link to="/login">
          <button className="navBarLinkBtn">Login</button>
        </Link>
        <Link to="/createnewpost">
          <button className="navBarLinkBtn">Create new post</button>
        </Link>
        <Link to={`/user/${username}`}>
          <button className="navBarLinkBtn">My profile</button>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
