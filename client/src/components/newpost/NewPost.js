import React from "react";
import useForm from "../helpers/FormHelper";
import validate from "../helpers/NewPostValidationRules";

function NewPost() {
  const handleNewPostSubmit = () => {
    console.log("tets");
  };
  const { values, handleChange, handleSubmit, errors } = useForm(
    handleNewPostSubmit,
    validate
  );
  return (
    <div>
      <form>
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
        <label htmlFor="gameName">Your game name</label>
        <input
          type="text"
          name="gameName"
          id="gameName"
          onChange={handleChange}
          value={values.gameName}
        />
        <label htmlFor="time">Select your start time</label>
        <input
          type="time"
          name="time"
          id="time"
          onChange={handleChange}
          value={values.time || ""}
        />
      </form>
    </div>
  );
}

export default NewPost;
