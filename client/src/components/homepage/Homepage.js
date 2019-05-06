import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Homepage.css";

const Homepage = props => {
  return (
    <main className="homepageContainer">
      <div className="postContainer">
        <ul className="postList">
          <li className="postListItem">Lf2 for nightfall</li>
          <li className="postListItem">
            {" "}
            <FontAwesomeIcon icon="gamepad" /> Playstaion{" "}
          </li>
          <li className="postListItem">
            <FontAwesomeIcon icon="gamepad" /> Destiny
          </li>
          <li className="postListItem">
            <FontAwesomeIcon icon="clock" /> 8:45 am
          </li>
          <li className="postListItem">
            <FontAwesomeIcon icon="users" /> 1 / 3 members
          </li>
        </ul>
        <div className="currentMembersContainer">
          <div className="memberNameContainer">
            <span className="memberName">Straight</span>
            <span className="memberGamertag">Psn id: Straightkillinya</span>
          </div>
          <div className="memberNameContainer">
            <span className="memberName">Straight</span>
            <span className="memberGamertag">Psn id: Straightkillinya</span>
          </div>
          <div className="memberNameContainer">
            <span className="memberName">Straight</span>
            <span className="memberGamertag">Psn id: Straightkillinya</span>
          </div>
          <div className="memberNameContainer">
            <span className="memberName">Straight</span>
            <span className="memberGamertag">Psn id: Straightkillinya</span>
          </div>
        </div>
        <button className="joinButton">Join</button>
      </div>
    </main>
  );
};

export default Homepage;
