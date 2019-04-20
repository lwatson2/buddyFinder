import React, { useState } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header(props) {
  const [showNav, setshowNav] = useState(false);
  return (
    <nav
      className={showNav ? "navContainer" : "navContainer navContaierClosed"}
    >
      {showNav ? (
        <span className="navBarCloseBtn" onClick={() => setshowNav(!showNav)}>
          X
        </span>
      ) : (
        <button className="navBarOpenBtn" onClick={() => setshowNav(!showNav)}>
          <FontAwesomeIcon icon="bars" />
        </button>
      )}
      <div
        className={showNav ? " mainNavContainer active" : "mainNavContainer"}
      >
        <button>Home</button>
        <button>Login</button>
        <button>Create new post</button>
        <button>My profile</button>
      </div>
    </nav>
  );
}

export default Header;
