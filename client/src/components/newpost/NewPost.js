import React from "react";
import useForm from "../helpers/FormHelper";
import validate from "../helpers/NewPostValidationRules";
import "./NewPost.css";

function NewPost() {
  const handleNewPostSubmit = () => {
    console.log("tets");
  };
  const { values, handleChange, handleSubmit, errors } = useForm(
    handleNewPostSubmit,
    validate
  );
  return (
    <div className="newPostPageWrapper">
      <div className="newPostFormContainer">
        <form>
          <div className="newPostGroupWrapper">
            <label className="newPostLabel" htmlFor="title">
              Title
            </label>
            <input
              value={values.title || ""}
              placeholder="Please enter the title for your post"
              onChange={handleChange}
              className="postTitleInput"
              type="text"
              name="title"
              id="title"
            />
          </div>
          <div className="newPostGroupWrapper">
            <label htmlFor="gameName">Your game name</label>
            <input
              type="text"
              name="gameName"
              id="gameName"
              onChange={handleChange}
              value={values.gameName}
            />
          </div>
          <div className="newPostGroupWrapper">
            <label htmlFor="time">Select your start time</label>
            <input
              type="time"
              name="time"
              id="time"
              className="timeInput"
              onChange={handleChange}
              value={values.time || ""}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewPost;
