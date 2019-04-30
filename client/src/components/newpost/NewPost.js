import React from "react";
import useForm from "../helpers/FormHelper";
import validate from "../helpers/NewPostValidationRules";
import "./NewPost.css";

function NewPost() {
  const handleNewPostSubmit = e => {
    e.preventDefault();
    console.log("tets");
    console.log(values);
  };
  const { values, handleChange, handleSubmit, errors } = useForm(
    handleNewPostSubmit,
    validate
  );
  return (
    <div className="newPostPageWrapper">
      <div className="newPostFormContainer">
        <form onSubmit={handleSubmit}>
          <div className="newPostGroupWrapper">
            <label className="newPostLabel" htmlFor="title">
              Title
            </label>
            <input
              className="newPostInput"
              value={values.title || ""}
              onChange={handleChange}
              placeholder="Please title your post"
              type="text"
              id="title"
              name="title"
            />
            {errors.title && (
              <div className="newPostErrorWrapper">
                <span>{errors.title}</span>
              </div>
            )}
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
            {errors.gameName && (
              <div className="newPostErrorWrapper">
                <span>{errors.gameName}</span>
              </div>
            )}
          </div>
          <div className="newPostGroupWrapper">
            <label className="newPostSelectLabel" htmlFor="groupLimit">
              How many people do you need?
            </label>
            <select
              className="groupLimitSelect"
              id="groupLimit"
              name="groupLimit"
              onChange={handleChange}
              value={values.groupLimit || ""}
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
            {errors.groupLimit && (
              <div className="newPostErrorWrapper">
                <span>{errors.groupLimit}</span>
              </div>
            )}
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
            {errors.time && (
              <div className="newPostErrorWrapper">
                <span>{errors.time}</span>
              </div>
            )}
          </div>
          <div className="submitBtnWrapper">
            <button type="submit" className="newPostSubmitBtn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewPost;
