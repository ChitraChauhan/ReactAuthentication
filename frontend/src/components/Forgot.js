import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { forgotPassword } from "../actions/authentication";
import classnames from "classnames";
import { fakeAuth } from "../App";
import { FormGroup, ControlLabel, FormControl, Button } from "react-bootstrap";

class Forgot extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      newPassword: "",
      errors: {},
      redirectToReferrer: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      newPassword: this.state.newPassword
    };
    this.props.forgotPassword(user, this.props.history);

    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }));
    });
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.auth.isAuthenticated) {
    //   // this.props.history.push("/dashboard");
    // }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="main">
          <div className="container">
            <form onSubmit={this.handleSubmit}>
              <h2>Forgot Password</h2>
              <FormGroup>
                <ControlLabel style={{ paddingRight: "330px" }}>
                  Email:{" "}
                </ControlLabel>
                <FormControl
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.email
                  })}
                  name="email"
                  value={this.state.email}
                  type="email"
                  placeholder="Please Enter Email Here..."
                  onChange={this.handleInputChange}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
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
                  required={true}
                  name="newPassword"
                  value={this.state.newPassword}
                  type="password"
                  placeholder="Please Enter Password Here..."
                  onChange={this.handleInputChange}
                />
                {errors.newPassword && (
                  <div className="invalid-feedback">{errors.newPassword}</div>
                )}
              </FormGroup>
              <Button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Forgot.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { forgotPassword }
)(Forgot);
