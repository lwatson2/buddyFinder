import React, { useState } from "react";
import useForm from "../helpers/FormHelper";
import validate from "../helpers/LoginFormValidationRules";
import "./Login.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = props => {
  const [loginErr, setLoginErr] = useState("");
  const handleLogin = async () => {
    const res = await axios.post("/users/login", values);

    if (res.data.err) {
      setLoginErr(res.data.err.message);
    }
    sessionStorage.setItem("token", res.data.token);
    sessionStorage.setItem("username", res.data.username);
    props.history.push("/");
  };
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
        {loginErr && <span className="loginErrorMessage">{loginErr}</span>}
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
        <div className="registerLink">
          <span className="linkTxt">
            Need to create a account?{" "}
            <Link to="register">
              <span className="formLink">Click Here</span>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
