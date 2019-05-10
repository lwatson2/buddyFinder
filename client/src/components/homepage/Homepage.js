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
    groupMembers: []
  });
  const [error, setError] = useState({
    isError: false,
    errorMsg: "",
    groupId: ""
  });

  const user = sessionStorage.getItem("user");

  const parsedUser = JSON.parse(user);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/posts/getposts");
      setData({ posts: res.data.posts });
      //If user is logged in check to see if they are apart of current group members array
      if (user) {
        const joinedPosts = joined.groupId;
        const groupMembers = joined.groupMembers;
        res.data.posts.map(post => {
          return post.currentGroupMembers.map(member => {
            // If the parsed users gamertag(i.e. their creds)  is the same as a one in the current group members add the post id and thier gamertag to the group members state
            if (parsedUser.gamertag === member.gamertag) {
              joinedPosts.push(post._id);
              groupMembers.push(member.gamertag);

              return setJoined({
                joinedGroup: true,
                groupId: joinedPosts,
                groupMembers: groupMembers
              });
            } else {
            }
          });
        });
      }
    };
    getData();
  }, []);
  const handleGroupJoin = async (postId, system, post) => {
    const joinedPosts = joined.groupId;
    const currentMembers = joined.groupMembers;
    // Check if user is logged in before joining
    if (!parsedUser) {
      return setError({
        isError: true,
        errorMsg: "Please log in to join groups.",
        groupId: postId
      });
    }
    //Make sure user is only joining groups for thier platform
    if (parsedUser.system !== system) {
      return setError({
        isError: true,
        errorMsg: "Please only join groups on your platform.",
        groupId: postId
      });
    }
    // Add their post id and gamertag to state to show they've joined the group and to show which button
    joinedPosts.push(postId);
    currentMembers.push(parsedUser.gamertag);
    currentMembers.push(postId);
    setJoined({
      joinedGroup: true,
      groupId: joinedPosts,
      groupMembers: currentMembers
    });
    //Add their creds to the currentGroupMmebers state to be shown on the post list
    const posts = data.posts;
    posts.map(post => {
      if (post._id === postId) {
        return post.currentGroupMembers.push(parsedUser);
      }
    });
    setData({ posts: posts });
    checkIfJoined(post, currentMembers);
    // Send their data back to the sever to be saved to the database
    await axios.post("/posts/joinPost", { parsedUser, postId });
  };
  const checkIfJoined = (post, currentMembers) => {
    if (post.currentGroupMembers.length >= post.groupLimit) {
      return (
        <button className="joinButton" disabled={true}>
          Full
        </button>
      );
    } else if (
      // Check if group members state contains the post id and if the group members state contains the users gamertag to show they've already joined
      (parsedUser &&
        joined.groupId.includes(post._id) &&
        joined.groupMembers.includes(parsedUser.gamertag)) ||
      (currentMembers &&
        currentMembers.includes(post._id) &&
        currentMembers.includes(parsedUser.gamertag))
    ) {
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
          onClick={() => handleGroupJoin(post._id, post.system, post)}
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
  return (
    <main className="homepageContainer">
      {data.posts.map((post, index) => (
        <div key={post._id} className="postBoxContainer">
          {error.isError && error.groupId === post._id && (
            <div className="postErrorMessageContainer">
              <span className="postErrorMessage">{error.errorMsg}</span>
            </div>
          )}
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
