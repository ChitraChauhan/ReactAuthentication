import React, { Component } from "react";
import Login from "./Login";

export default class Home extends Component {
  render() {
    return (
      <div style={{ float: "center" }}>
        {/* <p>
          Welcome to SearchApp !! You must sign up or sign in to view the page
        </p> */}
        <Login />
      </div>
    );
  }
}
