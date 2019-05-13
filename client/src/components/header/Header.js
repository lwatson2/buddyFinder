import React, { useState, useEffect, useContext } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "axios";
import { withRouter } from "react-router";
import { PostContext } from "./../context/PostContext";

const Header = props => {
  const [showNav, setshowNav] = useState(false);
  const [newNotification, setNewNotification] = useState(false);
  const [fullGroup, setFullGroup] = useContext(PostContext);

  const user = sessionStorage.getItem("user");
  const token = sessionStorage.getItem("token");
  const parsedUser = JSON.parse(user);
  const notification = localStorage.getItem("newNotification");

  useEffect(() => {
    const checkNotications = () => {
      if (user && notification) {
        if (fullGroup.length > 0) {
          fullGroup.map(group => {
            group.currentMembers.map(member => {
              if (member.username === parsedUser.username) {
                setNewNotification(true);
              }
            });
          });
        }
      }
    };
    checkNotications();
  }, [fullGroup]);

  const handleLogout = async () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    await axios.get("/users/logout");
    setNewNotification(false);
    props.history.push("/");
  };
  const removeNotification = () => {
    setshowNav(false);
    setNewNotification(false);
    localStorage.removeItem("newNotification");
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
        <>
          <button
            className="navBarOpenBtn"
            onClick={() => setshowNav(!showNav)}
          >
            <FontAwesomeIcon icon="bars" />
          </button>
          {newNotification && !showNav && (
            <FontAwesomeIcon
              icon="exclamation"
              style={{
                color: "red",
                position: "absolute",
                right: "19px",
                top: "3px",
                fontSize: "10px"
              }}
              className="notification"
              size="sm"
            />
          )}
        </>
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
            <Link to={`/user/${parsedUser.username}`}>
              <button
                onClick={() => removeNotification()}
                className="navBarLinkBtn"
              >
                My profile
              </button>
              {newNotification && (
                <FontAwesomeIcon
                  icon="exclamation"
                  className="profileNotication"
                  size="sm"
                  style={{
                    position: "relative",
                    right: "7px",
                    bottom: "7px",
                    color: "red",
                    fontSize: "10px"
                  }}
                />
              )}
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default withRouter(Header);
