import React, { Component } from "react";
import { Formik } from "formik";

export default class Register extends Component {
  render() {
    return (
      <div>
        <Formik
          initialValues={{ name: "" }}
          onSubmit={values => {
            console.log("submitting", values);
          }}
        >
          {({ handleSubmit, handleChange, values }) => (
            <form onSubmit={handleSubmit}>
              <input
                onChange={handleChange}
                value={values.name}
                type="text"
                placeholder="Name"
                name="name"
              />
              <button>Submit</button>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}
