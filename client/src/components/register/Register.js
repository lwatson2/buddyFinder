import React from "react";
import useForm from "../helpers/FormHelper";
import validate from "../helpers/RegisterFormValidationRules";
import "./Register.css";

const Register = () => {
  const login = () => {
    console.log(values);
    console.log(errors);
  };
  const { values, handleChange, handleSubmit, errors } = useForm(
    login,
    validate
  );
  return (
    <div className="container">
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="formLabel" htmlFor="username">
              Username
            </label>
            <input
              className={errors.username ? "errorDiv" : "formInput"}
              value={values.username || ""}
              onChange={handleChange}
              placeholder="Please enter your username"
              type="text"
              id="username"
              name="username"
            />
            {errors.username && (
              <p className="registerErrorMessage">{errors.username}</p>
            )}
          </div>
          <div className="form-group">
            <label className="formLabel" htmlFor="password">
              Password
            </label>
            <input
              className={errors.password ? "errorDiv" : "formInput"}
              value={values.password || ""}
              onChange={handleChange}
              placeholder="Please enter your password"
              type="password"
              id="password"
              name="password"
            />
            {errors.password && (
              <p className="registerErrorMessage">{errors.password}</p>
            )}
          </div>
          <div className="form-group">
            <label className="formLabel" htmlFor="gamertag">
              Gamertag
            </label>
            <input
              className={errors.gamertag ? "errorDiv" : "formInput"}
              value={values.gamertag || ""}
              onChange={handleChange}
              placeholder="Please enter your gamertag"
              type="text"
              id="gamertag"
              name="gamertag"
            />
            {errors.gamertag && (
              <p className="registerErrorMessage">{errors.gamertag}</p>
            )}
          </div>
          <div className="formSelectGroup">
            <label className="selectLabel" htmlFor="system">
              What system do you play on?
            </label>
            <select
              className="selectButton"
              value={values.system || ""}
              onChange={handleSubmit}
              placeholder="system"
              type="text"
              id="system"
              name="system"
            >
              <option value="playstation 4">Playstation 4</option>
              <option value="xbox One">Xbox One</option>
              <option value="pc">PC</option>
              <option value="switch">Switch</option>
            </select>
          </div>

          <button className="registerSubmitBtn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
