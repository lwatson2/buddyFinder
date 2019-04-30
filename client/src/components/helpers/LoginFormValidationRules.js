const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = "Please enter your username";
  }
  if (values.username && values.username.length > 50) {
    errors.username = "Username cannot be greater than 50 characters.";
  }
  if (!values.password) {
    errors.password = "Please enter your password";
  }
  if (values.password && values.password.length < 6) {
    errors.password = "Password must be greater than six Characters";
  }
  if (values.password && values.password.length > 50) {
    errors.password = "Password cannot be greater than 50 characters.";
  }
  return errors;
};
export default validate;
