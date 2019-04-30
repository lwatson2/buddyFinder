import React from "react";
import useForm from "../helpers/FormHelper";
import validate from "../helpers/RegisterFormValidationRules";
import "./Register.css";
import axios from "axios";
import { withRouter } from "react-router";

const Register = props => {
  const handleRegister = async () => {
    /*  const res = await axios.post("/users/register", values);
    console.log(res.data); */
    sessionStorage.setItem("isAuth", true);
    props.history.push("/login");
  };
  const { values, handleChange, handleSubmit, errors } = useForm(
    handleRegister,
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
              className="formInput"
              value={values.username || ""}
              onChange={handleChange}
              placeholder="Please enter your username"
              type="text"
              id="username"
              name="username"
            />
            {errors.username && (
              <div className="registerErrorMessage">
                <span>{errors.username}</span>
              </div>
            )}
          </div>
          <div className="form-group">
            <label className="formLabel" htmlFor="password">
              Password
            </label>
            <input
              className="formInput"
              value={values.password || ""}
              onChange={handleChange}
              placeholder="Please enter your password"
              type="password"
              id="password"
              name="password"
            />
            {errors.password && (
              <div className="registerErrorMessage">
                <span>{errors.password}</span>
              </div>
            )}
          </div>
          <div className="form-group">
            <label className="formLabel" htmlFor="gamertag">
              Gamertag
            </label>
            <input
              className="formInput"
              value={values.gamertag || ""}
              onChange={handleChange}
              placeholder="Please enter your gamertag"
              type="text"
              id="gamertag"
              name="gamertag"
            />
            {errors.gamertag && (
              <div className="registerErrorMessage">
                <span>{errors.gamertag}</span>
              </div>
            )}
          </div>
          <div className="formSelectGroup">
            <label className="selectLabel" htmlFor="system">
              What system do you play on?
            </label>
            <select
              className="selectButton"
              value={values.system || ""}
              onChange={handleChange}
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

export default withRouter(Register);
