import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Post.css";
const Post = props => {
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
  const { homePage, checkIfJoined, error, post } = props;
  return (
    <div key={post._id} className="postBoxContainer">
      {error && error.isError && error.groupId === post._id && (
        <div className="postErrorMessageContainer">
          <span className="postErrorMessage">{error.errorMsg}</span>
        </div>
      )}
      <div className="postListsContainer">
        <ul className="postDetailList">
          <li className="postListItem" key={post._id}>
            {post.title}
          </li>
          <li className="postListItem" key={post.system}>
            {" "}
            <FontAwesomeIcon icon="gamepad" /> {post.system}{" "}
          </li>
          <li className="postListItem" key={post.gameName}>
            <FontAwesomeIcon icon="gamepad" /> {post.gameName}
          </li>
          <li className="postListItem" key={post.time}>
            <FontAwesomeIcon icon="clock" /> {post.time}
          </li>
          <li className="postListItem" key={post.groupLimit}>
            <FontAwesomeIcon icon="users" /> {post.currentGroupMembers.length} /{" "}
            {post.groupLimit} members
          </li>
        </ul>

        <div className="currentMembersContainer">
          {post.currentGroupMembers.map(member => (
            <div key={member.username} className="memberNameContainer">
              <span className="memberName">{member.username}</span>
              <span className={changeStyle(member.system)}>
                {changeSystem(member.system)} id: {member.gamertag}
              </span>
            </div>
          ))}
        </div>
      </div>

      {homePage && checkIfJoined(post)}
    </div>
  );
};
export default Post;
