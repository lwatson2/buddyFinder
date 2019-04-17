const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = "Username is required";
  }
  if (values.username.length > 50) {
    errors.username = "Username cannot be greater than 50 characters.";
  }
  if (values.password.length < 6) {
    errors.password = "Password must be greater than six Characters";
  }
  if (values.password.length > 50) {
    errors.password = "Password cannot be greater than 50 characters.";
  }
  return errors;
};
export default validate;
