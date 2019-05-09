import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Homepage.css";
import axios from "axios";

//xbox color hsl(120, 100%, 47%)
// Steam color #1b2838
//Switch color hsl(348, 100%, 50%)

const Homepage = props => {
  const [data, setData] = useState({ posts: [] });
  const [joined, setJoined] = useState({ joinedGroup: false, groupId: [] });
  let system = "Playstation";

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/posts/getposts");
      console.log(res);
      setData({ posts: res.data.posts });
    };
    getData();
  }, []);
  const handleGroupJoin = async (postId, currentGroupMembers) => {
    const joinedPosts = joined.groupId;
    joinedPosts.push(postId);
    setJoined({ joinedGroup: true, groupId: joinedPosts });
    const user = sessionStorage.getItem("user");
    const parsedUser = JSON.parse(user);
    const posts = data.posts;
    posts.map(post => {
      if (post._id === postId) {
        post.currentGroupMembers.push(parsedUser);
      }
    });
    setData({ posts: posts });
    const res = await axios.post("/posts/joinPost", { user, postId });
  };
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
  console.log(data);
  return (
    <main className="homepageContainer">
      {data.posts.map((post, index) => (
        <div key={post._id} className="postBoxContainer">
          <div className="postListsContainer">
            <ul className="postDetailList">
              <li className="postListItem" key={post.title}>
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
                <FontAwesomeIcon icon="users" />{" "}
                {post.currentGroupMembers.length} / {post.groupLimit} members
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
          {joined.joinedGroup && joined.groupId.includes(post._id) ? (
            <button className="joinButton">
              Joined
              <FontAwesomeIcon
                icon="check"
                size="sm"
                style={{ marginLeft: "5px" }}
              />
            </button>
          ) : (
            <button
              className="joinButton"
              onClick={() =>
                handleGroupJoin(post._id, post.currentGroupMembers)
              }
            >
              Join
            </button>
          )}
        </div>
      ))}
    </main>
  );
};

export default Homepage;
