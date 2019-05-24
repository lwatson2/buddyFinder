import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
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
  faCheck,
  faExclamation
} from "@fortawesome/free-solid-svg-icons";
import NewPost from "./components/newpost/NewPost";
import { PostProvider } from "./components/context/PostContext";
import ProfilePage from "./components/profilepage/ProfilePage";

library.add(faBars, faGamepad, faClock, faUsers, faCheck, faExclamation);
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !sessionStorage.getItem("user") ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <PostProvider>
          <div className="App">
            <Header />
            <Switch>
              <Route exact path="/" component={Homepage} />
              <ProtectedRoute exact path="/register" component={Register} />
              <ProtectedRoute exact path="/login" component={Login} />
              <Route exact path="/createnewpost" component={NewPost} />
              <Route exact path="/user/:username" component={ProfilePage} />
            </Switch>
          </div>
        </PostProvider>
      </BrowserRouter>
    );
  }
}

export default App;
