import React, { useState, useContext, useEffect } from "react";
import "./ProfilePage.css";
import axios from "axios";
import { PostContext } from "./../context/PostContext";
import useForm from "../helpers/FormHelper";
import validate from "../helpers/ProfilePageValidationRules";
import ProfilePagePostDesign from "../profilePagePostDesign/ProfilePagePostDesign";

const ProfilePage = () => {
  const [messages, setMessages] = useState([]);
  const [joinedPosts, setJoinedPosts] = useState([]);
  const [user, setUser] = useState({});
  const usercreds = sessionStorage.getItem("user");
  const [fullGroup] = useContext(PostContext);
  const parsedUser = JSON.parse(usercreds);

  useEffect(() => {
    const getMessages = async () => {
      setUser(parsedUser);
      const res = await axios.get(`/users/getNotifications/${parsedUser.id}`);
      setMessages(res.data.messages);
      await axios.post("/users/updateMessages", {
        id: parsedUser.id,
        fullGroup
      });
    };
    const getUserPosts = async () => {
      const response = await axios.get(
        `/posts/fetchUserPosts/${parsedUser.id}`
      );
      setJoinedPosts(response.data.posts);
    };
    getMessages();
    getUserPosts();
  }, []);
  const handleSave = async () => {
    await axios.post(`/users/update/${parsedUser.id}`, {
      username: values.username,
      gamertag: values.gamertag,
      system: values.system
    });
    const res = await axios.get(`/users/getuser/${parsedUser.id}`);
    sessionStorage.setItem("user", JSON.stringify(res.data.user));
    setUser(res.data.user);
  };
  const setFilter = async e => {
    let { value } = e.target;
    const response = await axios.get(`/posts/fetchUserPosts/${parsedUser.id}`);
    let newArray = response.data.posts;
    if (value === "created") {
      let filtered = newArray.filter(post => post.id === parsedUser.id);
      return setJoinedPosts(filtered);
    }
    if (value === "joined") {
      let filtered = newArray.filter(post => post.id !== parsedUser.id);
      return setJoinedPosts(filtered);
    }
    if (value === "full") {
      let filtered = newArray.filter(
        post => post.currentGroupMembers.length >= post.groupLimit
      );
      return setJoinedPosts(filtered);
    }
    if (value === "all") {
      return setJoinedPosts(newArray);
    }
  };
  const { values, handleChange, handleSubmit } = useForm(handleSave, validate);
  return (
    <main className="profilePageContainer">
      <div className="profileDetailsContainer">
        <ul className="profileListContainer">
          <li className="usernameListItem" key={user.username}>
            Username: {user.username}
          </li>
          <li className="systemListItem" key={user.system}>
            System: {user.system}
          </li>
          <li className="gamertagListItem" key={user.gamertag}>
            Gamertag: {user.gamertag}
          </li>
        </ul>
      </div>
      <div className="newMessagesContainer">
        <div className="myMessagesTagContainer">
          <p className="myMessagesTag">My messages</p>
        </div>
        <div className="messagesContainer">
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
        <div className="updateProfileTagContainer">
          <p className="updateProfileTag">Update profile</p>
        </div>
        <div className="updateProfileFormContainer">
          <form className="updateProfileForm" onSubmit={handleSubmit}>
            <div className="profileFormGroupContainer">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                value={values.username || ""}
                onChange={handleChange}
                id="username"
                className="updateUsernameInput"
              />
            </div>
            <div className="profileFormGroupContainer">
              <label htmlFor="gamertag">Gamertag</label>
              <input
                type="text"
                name="gamertag"
                value={values.gamertag || ""}
                onChange={handleChange}
                id="gamertag"
                className="updateGamertagInput"
              />
            </div>
            <div className="profileFormGroupContainer">
              <label htmlFor="system">System</label>
              <select
                className="profileSystemSelect"
                name="system"
                id="system"
                value={values.system || ""}
                onChange={handleChange}
              >
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
      <div className="myGroupsContainer">
        <div className="groupTextContainer">
          <p className="myGroupsTag">My Groups</p>
          <select
            className="filterSelect"
            name="filter"
            id="filter"
            value={values.filter || ""}
            onChange={setFilter}
          >
            <option default value="all" hidden>
              Filter
            </option>
            <option value="created">Created</option>
            <option value="joined">Joined</option>
            <option value="all">All</option>
            <option value="full">Full Groups</option>
          </select>
        </div>
        <div className="groupWrapper">
          {joinedPosts.map((post, index) => (
            <ProfilePagePostDesign post={post} key={index} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
