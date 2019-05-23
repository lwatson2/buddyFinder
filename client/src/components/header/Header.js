import React, { useState, useEffect, useContext } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "axios";
import { withRouter } from "react-router";
import { PostContext } from "./../context/PostContext";
import { subscribePush } from "../../webPushConfig";

const Header = props => {
  const [showNav, setshowNav] = useState(false);
  const [newNotification, setNewNotification] = useState(false);
  const [fullGroup, setFullGroup] = useContext(PostContext);

  const user = sessionStorage.getItem("user");
  const token = sessionStorage.getItem("token");
  const parsedUser = JSON.parse(user);
  const viewed = localStorage.getItem("viewed");
  useEffect(() => {
    const checkNotications = async () => {
      if (user) {
        const res = await axios.get(`/users/getNotifications/${parsedUser.id}`);
        res.data.messages.map(message => {
          fullGroup.map(group => {
            if (
              message.postId === group.postId &&
              message.viewed === false &&
              viewed &&
              viewed !== true
            ) {
              setNewNotification(true);
            }
          });
        });
      }
    };
    checkNotications();
  }, [fullGroup]);
  useEffect(() => {
    if (newNotification) {
      console.log("object");
      subscribePush();
    }
  }, [newNotification]);
  const handleLogout = async () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    await axios.get("/users/logout");
    setNewNotification(false);
    props.history.push("/");
  };
  const removeNotification = async () => {
    setshowNav(false);
    localStorage.setItem("viewed", true);
    setNewNotification(false);
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
