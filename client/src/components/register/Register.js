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
            <label htmlFor="username">Username</label>
            <input
              className={`input ${errors.username && "errorDiv"}`}
              value={values.username || ""}
              onChange={handleChange}
              placeholder="User Name"
              type="text"
              id="username"
              name="username"
            />
            {errors.username && <p>{errors.username}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className={`input ${errors.password && "errorDiv"}`}
              value={values.password || ""}
              onChange={handleChange}
              placeholder="Password"
              type="password"
              id="password"
              name="password"
            />
            {errors.password && <p>{errors.password}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="gamertag">Gamertag</label>
            <input
              className={`input ${errors.gamertag && "errorDiv"}`}
              value={values.gamertag || ""}
              onChange={handleChange}
              placeholder="Gamertag"
              type="text"
              id="gamertag"
              name="gamertag"
            />
            {errors.gamertag && <p>{errors.gamertag}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="system">What system do you play on?</label>
            <select
              value={values.system || ""}
              onChange={handleSubmit}
              placeholder="System"
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

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
