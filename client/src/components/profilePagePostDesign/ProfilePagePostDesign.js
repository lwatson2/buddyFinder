import React from "react";
import "./ProfilePagePostDesign.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProfilePagePostDesign = props => {
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
        return "profilePagePsnGamertag";
      case "Steam":
        return "profilePageSteamGamertag";
      case "Xbox":
        return "profilePageXboxGamertag";
      case "Switch":
        return "profilePageSwitchGamertag";
    }
  };
  const { post } = props;
  return (
    <div>
      <div key={post._id} className="profilePagePostBoxContainer">
        <div className="profilePagePostListsContainer">
          <ul className="profilePagePostDetailList">
            <li className="profilePagePostListItem" key={post._id}>
              {post.title}
            </li>
            <li className="profilePagePostListItem" key={post.system}>
              {" "}
              <FontAwesomeIcon icon="gamepad" /> {post.system}{" "}
            </li>
            <li className="profilePagePostListItem" key={post.gameName}>
              <FontAwesomeIcon icon="gamepad" /> {post.gameName}
            </li>
            <li className="profilePagePostListItem" key={post.time}>
              <FontAwesomeIcon icon="clock" /> {post.time}
            </li>
            <li className="profilePagePostListItem" key={post.groupLimit}>
              <FontAwesomeIcon icon="users" /> {post.currentGroupMembers.length}{" "}
              / {post.groupLimit} members
            </li>
          </ul>

          <div className="profilePageCurrentMembersContainer">
            {post.currentGroupMembers.map(member => (
              <div
                key={member.username}
                className="profilePageMemberNameContainer"
              >
                <span className="profilePageMemberName">{member.username}</span>
                <span className={changeStyle(member.system)}>
                  {changeSystem(member.system)} id: {member.gamertag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePagePostDesign;
