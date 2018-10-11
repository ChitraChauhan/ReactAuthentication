import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import { fakeAuth } from "../App";
import { FormGroup, ControlLabel, FormControl, Button } from "react-bootstrap";
import axios from "axios";
import Slider from "./Slider";
import { loginUser } from "../actions/authentication";

class EditUserProfile extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      errors: {},
      redirectToReferrer: false
    };
  }

  handleInputChange = e => {
    const state = this.state.data;
    state[e.target.name] = e.target.value;
    this.setState({ data: state });
  };

  handleSubmit = e => {
    e.preventDefault();
    var body = {
      name: this.state.data.name || this.props.user.name,
      fullName: this.state.data.fullName || this.props.user.fullName,
      email: this.state.data.email || this.props.user.email,
      password: this.state.data.password || this.props.user.password,
      newPassword: this.state.data.newPassword
    };
    axios
      .put(
        "http://localhost:5000/api/users/editUser/" + this.props.user.id,
        body
      )
      .then(res => {
        console.log("result", res);
        this.props.history.push("/dashboard");
      });
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }));
    });
  };

  render() {
    const { errors, data } = this.state;
    const { user } = this.props;
    return (
      <div>
        <Slider />
        <div className="register-profile">
          <form onSubmit={this.handleSubmit} ref={el => (this.myForm = el)}>
            <h2 style={{ color: "#5cb85c" }}>Update your Login Info...</h2>
            <FormGroup>
              <ControlLabel
                style={{ paddingRight: "330px", paddingTop: "10px" }}
              >
                Username:{" "}
              </ControlLabel>
              <FormControl
                required={true}
                name="name"
                value={data.name ? data.name : user.name}
                type="text"
                placeholder="Please Enter Username Here..."
                onChange={this.handleInputChange}
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.name
                })}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </FormGroup>

              <FormGroup>
              <ControlLabel
                style={{ paddingRight: "1000px", paddingTop: "10px" }}
              >
                Name:{" "}
              </ControlLabel>
              <div
                className={
                  errors.fullName && errors.fullName.length > 0 ? "error" : ""
                }
              >
                <FormControl
                  required={true}
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.fullName
                  })}
                  name="fullName"
                  value={data.fullName ? data.fullName : user.fullName}
                  type="text"
                  placeholder="Please Enter LastName and FirstName Here..."
                  onChange={this.handleInputChange}
                />
              </div>
              {errors.fullName && (
                <div className="invalid-feedback">{errors.fullName}</div>
              )}
            </FormGroup>

            <FormGroup>
              <ControlLabel
                style={{ paddingRight: "330px", paddingTop: "10px" }}
              >
                Email:{" "}
              </ControlLabel>
              <FormControl
                name="email"
                value={data.email ? data.email : user.email}
                type="email"
                placeholder="Please Enter Email Here..."
                onChange={this.handleInputChange}
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.email
                })}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </FormGroup>

            <FormGroup>
              <ControlLabel
                style={{ paddingRight: "330px", paddingTop: "10px" }}
              >
                Old Password:{" "}
              </ControlLabel>
              <FormControl
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.password
                })}
                required={true}
                name="password"
                value={data.password ? data.password : user.password}
                type="password"
                placeholder="Please Enter Password Here..."
                onChange={this.handleInputChange}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </FormGroup>

            <FormGroup>
              <ControlLabel
                style={{ paddingRight: "330px", paddingTop: "10px" }}
              >
                New Password:{" "}
              </ControlLabel>
              <FormControl
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.newPassword
                })}
                name="newPassword"
                value={this.state.data.newPassword}
                type="password"
                placeholder="Please Enter Password Here..."
                onChange={this.handleInputChange}
              />
              {errors.newPassword && (
                <div className="invalid-feedback">{errors.newPassword}</div>
              )}
            </FormGroup>
            <br />
            <Button type="submit" className="btn btn-lg btn-success btn-block">
              Update
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

EditUserProfile.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(EditUserProfile));
