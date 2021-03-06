const validate = values => {
  let errors = {};
  if (!values.username) {
    errors.username = "Username is required";
  }
  if (values.username && values.username.length > 50) {
    errors.username = "Username cannot be greater than 50 characters.";
  }
  if (!values.gamertag) {
    errors.gamertag = "Gamertag is required";
  }
  if (values.gamertag && values.gamertag.length > 75) {
    errors.gamertag = "Gamertag cannot be greater than 75 characters";
  }
  if (!values.password) {
    errors.password = "Password is required";
  }
  if (values.password && values.password.length < 6) {
    errors.password = "Password must be greater than 6 characters.";
  }
  if (values.password && values.password.length > 50) {
    errors.password = "Password cannot be greater than 50 characters.";
  }
  if (!values.system) {
    errors.system = "Please select a system.";
  }
  if (
    values.system &&
    !values.system.includes("Playstation" || "Xbox" || "Steam" || "Switch")
  ) {
    errors.system = "Please select a system from the list.";
  }
  return errors;
};

export default validate;
