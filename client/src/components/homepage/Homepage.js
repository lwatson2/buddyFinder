import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Homepage.css";
import axios from "axios";

//xbox color hsl(120, 100%, 47%)
// Steam color #1b2838
//Switch color hsl(348, 100%, 50%)

const Homepage = props => {
  const [data, setData] = useState({ posts: [] });
  const [joined, setJoined] = useState({
    joinedGroup: false,
    groupId: [],
    groupMembers: [{}]
  });
  const user = sessionStorage.getItem("user");

  const parsedUser = JSON.parse(user);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/posts/getposts");
      console.log(res);
      setData({ posts: res.data.posts });
      if (user) {
        const joinedPosts = joined.groupId;
        const groupMembers = joined.groupMembers;
        res.data.posts.map(post => {
          post.currentGroupMembers.map(member => {
            console.log(parsedUser.gamertag);
            console.log(member.gamertag);
            if (parsedUser.gamertag === member.gamertag) {
              joinedPosts.push(member._id);
              groupMembers.push(member.gamertag, post._id);

              setJoined({
                joinedGroup: true,
                groupId: joinedPosts,
                groupMembers: groupMembers
              });
              console.log("true");
            } else {
              console.log(false);
            }
          });
        });
      }
      console.log(joined);
    };
    getData();
  }, []);
  const handleGroupJoin = async (postId, currentGroupMembers) => {
    const joinedPosts = joined.groupId;
    const currentMembers = joined.groupMembers;
    const user = sessionStorage.getItem("user");
    const parsedUser = JSON.parse(user);
    joinedPosts.push(postId);
    currentMembers.push(parsedUser.gamertag);
    setJoined({
      joinedGroup: true,
      groupId: joinedPosts,
      groupMembers: currentMembers
    });
    const posts = data.posts;
    posts.map(post => {
      if (post._id === postId) {
        post.currentGroupMembers.push(parsedUser);
      }
    });
    setData({ posts: posts });
    await axios.post("/posts/joinPost", { parsedUser, postId });
  };
  const checkIfJoined = post => {
    if (post.currentGroupMembers.length >= post.groupLimit) {
      return (
        <button className="joinButton" disabled={true}>
          Full
        </button>
      );
    } else if (
      joined.groupMembers.includes(post._id) &&
      joined.groupMembers.includes(parsedUser.gamertag)
    ) {
      console.log(true);
      return (
        <button className="joinButton">
          Joined
          <FontAwesomeIcon
            icon="check"
            size="sm"
            style={{ marginLeft: "5px" }}
          />
        </button>
      );
    } else {
      return (
        <button
          className="joinButton"
          onClick={() => handleGroupJoin(post._id, post.currentGroupMembers)}
        >
          Join
        </button>
      );
    }
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
  console.log(joined);
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
          {checkIfJoined(post)}
        </div>
      ))}
    </main>
  );
};

export default Homepage;
