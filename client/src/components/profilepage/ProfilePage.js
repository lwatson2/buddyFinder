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
      const res = await axios.get(
        `/users/getNotifications/${parsedUser.username}`
      );
      setMessages(res.data.messages);
      await axios.post("/users/updateMessages", {
        username: parsedUser.username,
        fullGroup
      });
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
      <div className="newMessagesContainer">
        <p className="myMessagesTag">My messages</p>
        <div className="messagesContaier">
          {messages.map(
            message =>
              message.viewed === false && (
                <div className="newMessage" key={message.postId}>
                  <span className="message">
                    Your group "{message.title}" is ready. Good luck have fun!
                  </span>
                </div>
              )
          )}
        </div>
      </div>
      <div className="updateProfileContainer">
        <p className="updateProfileTag">Update profile</p>
        <div className="updateProfileFormContainer">
          <form className="updateProfileForm">
            <div className="profileFormGroupContainer">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                className="updateUsernameInput"
              />
            </div>
            <div className="profileFormGroupContainer">
              <label htmlFor="gamertag">Gamertag</label>
              <input
                type="text"
                name="gamertag"
                id="gamertag"
                className="updateGamertagInput"
              />
            </div>
            <div className="profileFormGroupContainer">
              <label htmlFor="system">System</label>
              <select className="profileSystemSelect" name="system" id="system">
                <option default hidden />
                <option value="Playstation">Playstation</option>
                <option value="Xbox">Xbox</option>
                <option value="Steam">Steam</option>
                <option value="Switch">Switch</option>
              </select>
            </div>
            <button type="submit" className="profileSubmitBtn">
              Save
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
