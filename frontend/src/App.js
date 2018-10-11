import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect
  // withRouter
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authentication";

import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import ProfileRegistration from "./components/ProfileRegistration";
import MemberDetails from "./components/MemberDetails";
import MarriageDetails from "./components/MarriageDetails";
import EditProfile from "./components/EditProfile";
import "bootstrap/dist/css/bootstrap.min.css";
import DashBoard from "./components/DashBoard";
import EditUserProfile from "./components/EditUserProfile";
import Forgot from "./components/Forgot";
import Reset from "./components/resetPassword";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

// const AuthButton = withRouter(
//   ({ history }) =>
//     fakeAuth.isAuthenticated ? (
//       <p>
//         {/* <button
//           onClick={() => {
//             fakeAuth.signout(() => history.push("/"));
//           }}
//         >
//           Sign out
//         </button> */}
//       </p>
//     ) : (
//       <p>You are not logged in.</p>
//     )
// );

export const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            {/* <AuthButton /> */}
            <Navbar />
            <Route exact path="/" component={Home} />
            <Route exact path="/forgot" component={Forgot} />
            <Route exact path="/reset" component={Reset} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/dashboard" component={DashBoard} />
            <PrivateRoute
              exact
              path="/editUser/:id"
              component={EditUserProfile}
            />
            <PrivateRoute
              exact
              path="/profileRegistration"
              component={ProfileRegistration}
            />
            <PrivateRoute exact path="/member" component={MemberDetails} />
            <PrivateRoute exact path="/marriage" component={MarriageDetails} />
            <PrivateRoute
              exact
              path="/editProfile/:id"
              component={EditProfile}
            />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
