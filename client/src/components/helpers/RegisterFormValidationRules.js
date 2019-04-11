const validate = values => {
  let errors = {};
  if (!values.username) {
    errors.username = "Username is required";
  }
  if (!values.gamertag) {
    errors.gamertag = "Gamertag is required";
  }
  if (values.password.length < 6) {
    errors.password = "Password must be greater than 6 characters.";
    console.log(errors);
  }
  if (values.password.length > 50) {
    errors.password = "Password cannot be greater than 50 characters.";
  }
  return errors;
};

export default validate;
