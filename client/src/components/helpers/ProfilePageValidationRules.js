const validate = values => {
  const errors = {};
  if (values.username && values.username.length > 50) {
    errors.username = "Username cannot be greater than 50 characters";
  }
  if (values.gamertag && values.gamertag.length > 75) {
    errors.gamertag = "Gamertag cannot be greater than 75 characters";
  }
  return errors;
};
export default validate;
