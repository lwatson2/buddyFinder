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
        <span onClick={() => setshowNav(!showNav)}>X</span>
      ) : (
        <button onClick={() => setshowNav(!showNav)}>test</button>
      )}
      <button>Home</button>
      <button>Login</button>
      <button>Create new post</button>
      <button>My profile</button>
    </nav>
  );
}

export default Header;
