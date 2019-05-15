import React, { useState, useContext, useEffect } from "react";
import "./ProfilePage.css";
import axios from "axios";
import { PostContext } from "./../context/PostContext";

const ProfilePage = () => {
  const [messages, setMessages] = useState([]);
  const user = sessionStorage.getItem("user");
  const [fullGroup, setFullGroup] = useContext(PostContext);

  const parsedUser = JSON.parse(user);
  useEffect(() => {
    const getMessages = async () => {
      await axios.post("/users/updateMessages", {
        username: parsedUser.username,
        fullGroup
      });
      const res = await axios.get(
        `/users/getNotifications/${parsedUser.username}`
      );
      setMessages(res.data.messages);
      console.log(messages);
    };
    getMessages();
  }, []);

  return (
    <main className="profilePageContainer">
      <div className="profileDetailsContainer">
        <ul className="profileListContainer">
          <li className="usernameListItem" key={parsedUser.username}>
            Username: {parsedUser.username}
          </li>
          <li className="systemListItem" key={parsedUser.system}>
            System: {parsedUser.system}
          </li>
          <li className="gamertagListItem" key={parsedUser.gamertag}>
            Gamertag: {parsedUser.gamertag}
          </li>
        </ul>
      </div>
    </main>
  );
};

export default ProfilePage;
