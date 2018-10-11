import React, { Component } from "react";
import { FormGroup, ControlLabel, FormControl, Button } from "react-bootstrap";
import { registerProfile } from "../actions/authentication";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { loginUser } from "../actions/authentication";
import Slider from "./Slider";

class ProfileRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      fathersName: "",
      age: "",
      address: "",
      occupation: "",
      maritalStatus: "",
      errors: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.resetForm = this.resetForm.bind(this);
  }

  // resetForm() {
  //   this.myFormRef.reset();
  // }

  resetState() {
    this.setState({
      name: "",
      fathersName: "",
      age: "",
      address: "",
      occupation: "",
      maritalStatus: ""
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const profile = {
      name: this.state.name || this.props.user.fullName,
      fathersName: this.state.fathersName,
      age: this.state.age,
      address: this.state.address,
      occupation: this.state.occupation,
      maritalStatus: this.state.maritalStatus
    };
    if (this.state.name === this.props.user.fullName) {
      this.props.registerProfile(profile, this.props.history);
    } else {
      alert("please fill name same as your login name");
    }
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.authProfile.isAuthenticated) {
    //   //   this.props.history.push("/dashboard");
    // }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    // if (this.props.authProfile.isAuthenticated) {
    //   //   this.props.history.push('/dashboard');
    // }
  }

  render() {
    const { errors } = this.state;
    const { user } = this.props;
    console.log("user", user);
    return (
      <div>
        <Slider />
        <div className="register-profile">
          <form onSubmit={this.handleSubmit} ref={el => (this.myFormRef = el)}>
            <h2 style={{ color: "#5cb85c" }}>Register your Profile Here...</h2>

            <FormGroup>
              <ControlLabel
                style={{ paddingRight: "1000px", paddingTop: "10px" }}
              >
                Name:{" "}
              </ControlLabel>
              <div
                className={errors.name && errors.name.length > 0 ? "error" : ""}
              >
                <FormControl
                  required={true}
                  className="form-control"
                  name="name"
                  value={this.state.name ? this.state.name : user.fullName}
                  type="text"
                  placeholder="Please Enter LastName and FirstName Here..."
                  onChange={this.handleChange}
                />
              </div>
              {errors.name && errors.name.length > 0 ? (
                <span style={{ color: "red", paddingRight: "220px" }}>
                  {errors.name}
                </span>
              ) : (
                ""
              )}
            </FormGroup>

            <FormGroup>
              <ControlLabel
                style={{ paddingRight: "1000px", paddingTop: "10px" }}
              >
                Father's Name:{" "}
              </ControlLabel>
              <div
                className={
                  errors.fathersName && errors.fathersName.length > 0
                    ? "error"
                    : ""
                }
              >
                <FormControl
                  required={true}
                  className="form-control"
                  name="fathersName"
                  value={this.state.fathersName}
                  type="text"
                  placeholder="Please Enter fathersName Here..."
                  onChange={this.handleChange}
                />
              </div>
              {errors.fathersName && errors.fathersName.length > 0 ? (
                <span style={{ color: "red", paddingRight: "200px" }}>
                  {errors.fathersName}
                </span>
              ) : (
                ""
              )}
            </FormGroup>

            <FormGroup>
              <ControlLabel
                style={{ paddingRight: "1000px", paddingTop: "10px" }}
              >
                FullName:{" "}
              </ControlLabel>
              <FormControl
                className="form-control"
                value={
                  this.state.name
                    ? this.state.name + " " + this.state.fathersName
                    : user.fullName + "" + this.state.fathersName
                }
                type="text"
              />
            </FormGroup>

            <FormGroup>
              <ControlLabel
                style={{ paddingRight: "1000px", paddingTop: "10px" }}
              >
                Age:{" "}
              </ControlLabel>
              <div
                className={errors.age && errors.age.length > 0 ? "error" : ""}
              >
                <FormControl
                  required={true}
                  className="form-control"
                  name="age"
                  value={this.state.age}
                  type="number"
                  placeholder="Please Enter age Here..."
                  onChange={this.handleChange}
                />
              </div>
              {errors.age && errors.age.length > 0 ? (
                <span style={{ color: "red", paddingRight: "220px" }}>
                  {errors.age}
                </span>
              ) : (
                ""
              )}
            </FormGroup>

            <FormGroup>
              <ControlLabel
                style={{ paddingRight: "1000px", paddingTop: "10px" }}
              >
                Address:{" "}
              </ControlLabel>
              <div
                className={
                  errors.address && errors.address.length > 0 ? "error" : ""
                }
              >
                <FormControl
                  required={true}
                  className="form-control"
                  name="address"
                  value={this.state.address}
                  type="text"
                  placeholder="Please Enter address Here..."
                  onChange={this.handleChange}
                />
              </div>
              {errors.address && errors.address.length > 0 ? (
                <span style={{ color: "red", paddingRight: "190px" }}>
                  {errors.address}
                </span>
              ) : (
                ""
              )}
            </FormGroup>

            <FormGroup>
              <ControlLabel
                style={{ paddingRight: "1000px", paddingTop: "10px" }}
              >
                Occupation:{" "}
              </ControlLabel>
              <div
                className={
                  errors.occupation && errors.occupation.length > 0
                    ? "error"
                    : ""
                }
              >
                <FormControl
                  required={true}
                  className="form-control"
                  name="occupation"
                  value={this.state.occupation}
                  type="text"
                  placeholder="Please Enter occupation Here..."
                  onChange={this.handleChange}
                />
              </div>
              {errors.occupation && errors.occupation.length > 0 ? (
                <span style={{ color: "red", paddingRight: "190px" }}>
                  {errors.occupation}
                </span>
              ) : (
                ""
              )}
            </FormGroup>

            <FormGroup>
              <ControlLabel
                style={{ paddingRight: "1000px", paddingTop: "10px" }}
              >
                Marital Status:{" "}
              </ControlLabel>
              <div
                className={
                  errors.maritalStatus && errors.maritalStatus.length > 0
                    ? "error"
                    : ""
                }
              >
                <FormControl
                  required={true}
                  className="form-control"
                  name="maritalStatus"
                  value={this.state.maritalStatus}
                  type="text"
                  placeholder="Please Enter maritalStatus Here..."
                  onChange={this.handleChange}
                />
              </div>
              {errors.maritalStatus && errors.maritalStatus.length > 0 ? (
                <span style={{ color: "red", paddingRight: "190px" }}>
                  {errors.maritalStatus}
                </span>
              ) : (
                ""
              )}
            </FormGroup>
            <br />

            <Button type="submit" className="btn btn-lg btn-success btn-block">
              Register
            </Button>
            <Button
              className="btn btn-secondary btn-block"
              onClick={() => this.resetState()}
            >
              Reset
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

ProfileRegistration.propTypes = {
  registerProfile: PropTypes.func.isRequired,
  // loginUser: PropTypes.func.isRequired,
  authProfile: PropTypes.object.isRequired
};

const mapStateToProps = state => (
  console.log("state", state),
  {
    authProfile: state.authProfile,
    errors: state.profileErrors,
    user: state.auth.user
  }
);

export default connect(
  mapStateToProps,
  { registerProfile }
  //, { loginUser }
)(withRouter(ProfileRegistration));
