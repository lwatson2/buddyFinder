import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { PostContext } from "./../context/PostContext";
import HomePagePostDesign from "../homepagePostDesign/HomePagePostDesgin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sendSubscription } from "../../webPushConfig";

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
  const [fullGroup, setFullGroup] = useContext(PostContext);

  const user = sessionStorage.getItem("user");

  const parsedUser = JSON.parse(user);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/posts/getposts");
      const reversedArray = res.data.posts.reverse();
      setData({ posts: reversedArray });
      //If user is logged in check to see if they are apart of current group members array
      if (user) {
        sendSubscription();
        const joinedPosts = joined.groupId;
        const groupMembers = joined.groupMembers;
        res.data.posts.forEach(post => {
          if (post.currentGroupMembers.length >= post.groupLimit) {
            setFullGroup(prevState => [
              ...prevState,
              {
                title: post.title,
                postId: post._id,
                currentMembers: post.currentGroupMembers
              }
            ]);
          }
          post.currentGroupMembers.forEach(member => {
            // If the parsed users gamertag(i.e. their creds)  is the same as a one in the current group members add the post id and thier gamertag to the group members state
            if (parsedUser.username === member.username) {
              joinedPosts.push(post._id);
              groupMembers.push(member.username);

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
  useEffect(() => {
    const setNewNotifcation = async () => {
      // Get all messages for the user
      let newArray;
      if (parsedUser) {
        const res = await axios.get(`/users/getNotifications/${parsedUser.id}`);
        data.posts.forEach(post => {
          post.currentGroupMembers.forEach(member => {
            // check if user is logged in and group is full and a groupmembers username is the same as the current logged in username
            if (
              post.currentGroupMembers.length >= post.groupLimit &&
              member.id === parsedUser.id
            ) {
              //Check if messages array has any values already in it before mapping
              if (res.data.messages.length > 0) {
                //Filter any post that is not already in the messages array
                let result = [];

                if (
                  res.data.messages.some(message => message.postId !== post._id)
                ) {
                  result.push(post);
                }
                //Use .filter to go through every message and check if the post id does not equal the messages post id and if they dont return them
                let filtered = result.filter(post =>
                  res.data.messages.every(
                    message => message.postId !== post._id
                  )
                );
                if (filtered.length > 0) {
                  newArray = filtered;
                }
              } else {
                axios.post("/users/setMessage", {
                  username: parsedUser.username,
                  postId: post._id,
                  title: post.title,
                  id: parsedUser.id
                });
                localStorage.setItem("viewed", false);
              }
            }
          });
        });
        if (newArray) {
          newArray.map(post => {
            axios.post("/users/setMessage", {
              username: parsedUser.username,
              postId: post._id,
              title: post.title,
              id: parsedUser.id
            });
            return localStorage.setItem("viewed", false);
          });
        }
      }
    };
    setNewNotifcation();
  }, [data.posts]);
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
    currentMembers.push(parsedUser.username);
    currentMembers.push(postId);
    setJoined({
      joinedGroup: true,
      groupId: joinedPosts,
      groupMembers: currentMembers
    });
    //Add their creds to the currentGroupMmebers state to be shown on the post list
    const posts = data.posts;
    posts.forEach(post => {
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
      return <button className="joinButton">Full</button>;
    } else if (
      // Check if group members state contains the post id and if the group members state contains the users gamertag to show they've already joined
      (parsedUser &&
        joined.groupId.includes(post._id) &&
        joined.groupMembers.includes(parsedUser.username)) ||
      (currentMembers &&
        currentMembers.includes(post._id) &&
        currentMembers.includes(parsedUser.username))
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

  return (
    <main className="homepageContainer">
      {data.posts.map((post, index) => (
        <HomePagePostDesign
          homePage={true}
          checkIfJoined={checkIfJoined}
          error={error}
          post={post}
          key={index}
        />
      ))}
    </main>
  );
};

export default Homepage;
