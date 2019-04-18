import React from "react";
import useForm from "../helpers/FormHelper";
import validate from "../helpers/LoginFormValidationRules";
import "./Login.css";

const Login = () => {
  const handleLogin = () => {};
  const { values, handleChange, handleSubmit, errors } = useForm(
    handleLogin,
    validate
  );
  return (
    <div className="loginContainer">
      <div className="loginWrapper">
        {sessionStorage.getItem("isAuth") && (
          <span className="successMsg">Success! You may now login.</span>
        )}
        <form className="loginFormContainer" onSubmit={handleSubmit}>
          <div className="loginGroupWrapper">
            <label className="loginLabel" htmlFor="username">
              {" "}
              Username
            </label>
            <input
              className="loginFormInput"
              value={values.username || ""}
              onChange={handleChange}
              placeholder="Please enter your username"
              type="text"
              id="username"
              name="username"
            />
            {errors.username && (
              <p className="loginErrorMessage">{errors.username}</p>
            )}
          </div>
          <div className="loginGroupWrapper">
            <label className="loginLabel" htmlFor="password">
              {" "}
              Password
            </label>
            <input
              className="loginFormInput"
              value={values.password || ""}
              onChange={handleChange}
              placeholder="Please enter your password"
              type="password"
              id="password"
              name="password"
            />
            {errors.password && (
              <p className="loginErrorMessage">{errors.password}</p>
            )}
          </div>
          <button className="loginSubmitBtn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
