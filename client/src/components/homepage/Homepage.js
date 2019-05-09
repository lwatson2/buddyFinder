import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Homepage.css";
import axios from "axios";

//xbox color hsl(120, 100%, 47%)
// Steam color #1b2838
//Switch color hsl(348, 100%, 50%)

const Homepage = props => {
  const [data, setData] = useState({ posts: [] });
  let system = "Playstation";

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/posts/getposts");
      console.log(res);
      setData({ posts: res.data.posts });
    };
    getData();
  }, []);

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
        <div key={index} className="postBoxContainer">
          <div className="postListsContainer">
            <ul className="postDetailList">
              <li className="postListItem" key={index}>
                {post.title}
              </li>
              <li className="postListItem" key={index}>
                {" "}
                <FontAwesomeIcon icon="gamepad" /> {post.system}{" "}
              </li>
              <li className="postListItem" key={index}>
                <FontAwesomeIcon icon="gamepad" /> {post.gameName}
              </li>
              <li className="postListItem" key={index}>
                <FontAwesomeIcon icon="clock" /> {post.time}
              </li>
              <li className="postListItem" key={index}>
                <FontAwesomeIcon icon="users" />{" "}
                {post.currentGroupMembers.length} / {post.groupLimit} members
              </li>
            </ul>

            <div className="currentMembersContainer">
              {post.currentGroupMembers.map(member => (
                <div className="memberNameContainer">
                  <span key={member.gamertag} className="memberName">
                    {member.username}
                  </span>
                  <span
                    key={member.username}
                    className={changeStyle(member.system)}
                  >
                    {changeSystem(member.system)} id: {member.gamertag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button className="joinButton">Join</button>
        </div>
      ))}
    </main>
  );
};

export default Homepage;
