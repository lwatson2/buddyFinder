import { error } from "util";

const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = "Post title is required";
  }
  if (values.title.length > 100) {
    errors.title = "Post title cannot be greater than 100 characters";
  }
  if (values.title.length < 2) {
    errors.title = "Title must be longer than one character";
  }
  if (!values.time) {
    errors.time = "You must enter a time";
  }
  if (!values.groupLimit) {
    errors.groupLimit =
      "Please enter your the amout of people you want in your group";
  }

  if (!values.gameName) {
    errors.gameName = "Game Name is requried";
  }
  if (values.gameName.length > 100) {
    errors.gameName = "Are you sure this is a real game?";
  }
};
export default validate;
