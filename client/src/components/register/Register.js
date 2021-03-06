import React, { useState } from "react";
import useForm from "../helpers/FormHelper";
import validate from "../helpers/RegisterFormValidationRules";
import "./Register.css";
import axios from "axios";
import { withRouter } from "react-router";

const Register = props => {
  const [err, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const handleRegister = async () => {
    const res = await axios.post("/users/register", values);
    if (res.data.err) {
      console.log(res.data.errMsg);
      setError(true);
      setErrMsg(res.data.errMsg);
    }
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
        {err && <div className="registerErrorMessage">{errMsg}</div>}
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
              What platform do you play on?
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
              <option default value hidden />
              <option value="Playstation">Playstation 4</option>
              <option value="Xbox">Xbox One</option>
              <option value="Steam">Steam</option>
              <option value="Switch">Switch</option>
            </select>
            {errors.system && (
              <div className="registerErrorMessage">
                <span>{errors.system}</span>
              </div>
            )}
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
