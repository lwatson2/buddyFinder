import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Homepage from "./components/homepage/Homepage";
import Header from "./components/header/Header";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faGamepad,
  faClock,
  faUsers,
  faCheck
} from "@fortawesome/free-solid-svg-icons";
import NewPost from "./components/newpost/NewPost";

library.add(faBars, faGamepad, faClock, faUsers, faCheck);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/createnewpost" component={NewPost} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
