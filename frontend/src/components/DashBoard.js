import React, { Component } from "react";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../actions/authentication";
import Slider from "./Slider";

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPaneOpen: true,
      isPaneOpenLeft: false
    };
  }

  componentDidMount() {
    console.log(this.props.user);
  }

  render() {
    return (
      <div>
        <Slider />
        <h4 style={{ paddingLeft: "500px" }}>
          Welcome {this.props.user.name} !!
        </h4>
        <p style={{ paddingLeft: "500px" }}>
          Want to become a member?? Register here...{" "}
          <Link to="/profileRegistration">Profile Registration</Link>
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { loginUser }
)(DashBoard);
