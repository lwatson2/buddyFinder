import React, { Component } from "react";
import Formol, { Field } from "formol";

export default class NewPost extends Component {
  render() {
    return (
      <div>
        <Formol onSubmit={this.handleSubmit}>
          <Field>Title</Field>
          <Field>Time</Field>
          <Field>How many people do you want in your group?</Field>
          <Field>Game tite</Field>
          <Field />
        </Formol>
      </div>
    );
  }
}
