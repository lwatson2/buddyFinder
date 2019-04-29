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
              className="newPostInput"
              type="text"
              name="title"
              id="title"
            />
          </div>
          <div className="newPostGroupWrapper">
            <label className="newPostLabel" htmlFor="gameName">
              Your game name
            </label>
            <input
              type="text"
              placeholder="Please enter your game name"
              className="newPostInput"
              name="gameName"
              id="gameName"
              onChange={handleChange}
              value={values.gameName}
            />
          </div>
          <div className="newPostGroupWrapper">
            <label className="newPostSelectLabel" htmlFor="groupLimit">
              How many people do you need?
            </label>
            <select
              className="groupLimitSelect"
              id="groupLimit"
              onChange={handleChange}
              value={values.groupLimit}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
          </div>
          <div className="newPostTimeContainer">
            <label className="newPostLabel" htmlFor="time">
              Select your start time
            </label>
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
