const validate = values => {
  const errors = {};
  console.log(values);
  if (!values.title) {
    errors.title = "Post title is required";
  }
  if (values.title && values.title.length > 100) {
    errors.title = "Post title cannot be greater than 100 characters";
  }
  if (values.title && values.title.length < 2) {
    errors.title = "Title must be longer than one character";
  }
  if (!values.time) {
    errors.time = "You must enter a time";
  }
  if (!values.groupLimit) {
    errors.groupLimit = "Please enter your group limit";
  }
  if (values.groupLimit && values.groupLimit >= 10) {
    console.log("object");
    errors.groupLimit =
      "I see you trying to be sneaky. Please only use values from 1 to 9.";
  }

  if (!values.gameName) {
    errors.gameName = "Game Name is requried";
  }
  if (values.gameName && values.gameName.length > 100) {
    errors.gameName = "Are you sure this is a real game?";
  }

  return errors;
};
export default validate;
