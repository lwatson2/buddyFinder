import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Homepage.css";

//xbox color hsl(120, 100%, 47%)
// Steam color #1b2838
//Switch color

const Homepage = props => {
  let system = "Steam";

  const changeSystem = system => {
    switch (system) {
      default:
        return "";
      case "Playstation":
        return "Psn";
      case "Steam":
        return "Steam";
      case "Xbox":
        return "Xbox";
      case "Switch":
        return "Switch";
    }
  };
  const changeStyle = system => {
    switch (system) {
      default:
        return "";
      case "Playstation":
        return "psnGamertag";
      case "Steam":
        return "steamGamertag";
      case "Xbox":
        return "xboxGamertag";
      case "Switch":
        return "switchGamertag";
    }
  };
  console.log(system);
  return (
    <main className="homepageContainer">
      <div className="postBoxContainer">
        <div className="postListsContainer">
          <ul className="postDetailList">
            <li className="postListItem">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
              saepe
            </li>
            <li className="postListItem">
              {" "}
              <FontAwesomeIcon icon="gamepad" /> Playstation{" "}
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
              <span className={changeStyle(system)}>
                {changeSystem(system)} id: Straightkillinya
              </span>
            </div>
            <div className="memberNameContainer">
              <span className="memberName">Straight</span>
              <span className={changeStyle(system)}>
                {changeSystem(system)} id: Straightkillinya
              </span>
            </div>
            <div className="memberNameContainer">
              <span className="memberName">Straight</span>
              <span className={changeStyle(system)}>
                {changeSystem(system)} id: Straightkillinya
              </span>
            </div>
            <div className="memberNameContainer">
              <span className="memberName">Straight</span>
              <span className={changeStyle(system)}>
                {changeSystem(system)} id: Straightkillinya
              </span>
            </div>
          </div>
        </div>
        <button className="joinButton">Join</button>
      </div>
    </main>
  );
};

export default Homepage;
