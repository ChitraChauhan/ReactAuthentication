import React, { Component } from "react";
import { FormGroup, ControlLabel, FormControl, Button } from "react-bootstrap";
import { registerProfile } from "../actions/authentication";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Slider from "./Slider";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      error: {}
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://localhost:5000/api/profiles/editProfile/" +
          this.props.match.params.id
      )
      .then(res => {
        this.setState({ data: res.data[0] });
      });
    if (this.props.authProfile.isAuthenticated) {
      //   this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authProfile.isAuthenticated) {
      //   this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  handleChange = e => {
    const state = this.state.data;
    state[e.target.name] = e.target.value;
    this.setState({ data: state });
  };

  handleSubmit = e => {
    e.preventDefault();
    var body = {
      name: this.state.data.name,
      fathersName: this.state.data.fathersName,
      age: this.state.data.age,
      address: this.state.data.address,
      occupation: this.state.data.occupation,
      maritalStatus: this.state.data.maritalStatus
    };
    axios
      .put(
        "http://localhost:5000/api/profiles/editProfile/" +
          this.props.match.params.id,
        body
      )
      .then(res => {
        console.log("result", res);
        this.props.history.push("/member");
      });
  };

  render() {
    const { errors } = this.state;
    console.log("data",this.state.data)
    return (
      <div>
        <Slider />
        <div className="register-profile">
          <form onSubmit={this.handleSubmit}>
            <h2 style={{ color: "#5cb85c" }}>Edit your Profile Here...</h2>

            <FormGroup>
              <ControlLabel
                style={{ paddingRight: "1000px", paddingTop: "10px" }}
              >
                Name:{" "}
              </ControlLabel>
              <FormControl
                required={true}
                // className={
                //   errors.name && errors.name.length > 0 ? "error" : ""
                // }
                name="name"
                value={this.state.data.name}
                type="text"
                placeholder="Please Enter LastName and FirstName Here..."
                onChange={this.handleChange}
              />
              {/* {errors.name && errors.name.length > 0 ? (
                <span style={{ color: "red", paddingRight: "220px" }}>
                  {errors.name}
                </span>
              ) : (
                ""
              )} */}
            </FormGroup>

            <FormGroup>
              <ControlLabel
                style={{ paddingRight: "1000px", paddingTop: "10px" }}
              >
                Father's Name:{" "}
              </ControlLabel>
              <FormControl
                required={true}
                // className={
                //   errors.fathersName && errors.fathersName.length > 0
                //     ? "error"
                //     : ""
                // }
                name="fathersName"
                value={this.state.data.fathersName}
                type="text"
                placeholder="Please Enter fathersName Here..."
                onChange={this.handleChange}
              />
              {/* {errors.fathersName && errors.fathersName.length > 0 ? (
                <span style={{ color: "red", paddingRight: "200px" }}>
                  {errors.fathersName}
                </span>
              ) : (
                ""
              )} */}
            </FormGroup>

            <FormGroup>
              <ControlLabel
                style={{ paddingRight: "1000px", paddingTop: "10px" }}
              >
                FullName:{" "}
              </ControlLabel>
              <FormControl
                className="form-control"
                value={this.state.data.name + " " + this.state.data.fathersName}
                type="text"
              />
            </FormGroup>

            <FormGroup>
              <ControlLabel
                style={{ paddingRight: "1000px", paddingTop: "10px" }}
              >
                Age:{" "}
              </ControlLabel>
              <FormControl
                required={true}
                // className={errors.age && errors.age.length > 0 ? "error" : ""}
                name="age"
                value={this.state.data.age}
                type="number"
                placeholder="Please Enter age Here..."
                onChange={this.handleChange}
              />
              {/* {errors.age && errors.age.length > 0 ? (
                <span style={{ color: "red", paddingRight: "220px" }}>
                  {errors.age}
                </span>
              ) : (
                ""
              )} */}
            </FormGroup>

            <FormGroup>
              <ControlLabel
                style={{ paddingRight: "1000px", paddingTop: "10px" }}
              >
                Address:{" "}
              </ControlLabel>
              <FormControl
                required={true}
                // className={
                //   errors.address && errors.address.length > 0 ? "error" : ""
                // }
                name="address"
                value={this.state.data.address}
                type="text"
                placeholder="Please Enter address Here..."
                onChange={this.handleChange}
              />
              {/* {errors.address && errors.address.length > 0 ? (
                <span style={{ color: "red", paddingRight: "190px" }}>
                  {errors.address}
                </span>
              ) : (
                ""
              )} */}
            </FormGroup>

            <FormGroup>
              <ControlLabel
                style={{ paddingRight: "1000px", paddingTop: "10px" }}
              >
                Occupation:{" "}
              </ControlLabel>
              <FormControl
                required={true}
                // className={
                //   errors.occupation && errors.occupation.length > 0
                //     ? "error"
                //     : ""
                // }
                name="occupation"
                value={this.state.data.occupation}
                type="text"
                placeholder="Please Enter occupation Here..."
                onChange={this.handleChange}
              />
              {/* {errors.occupation && errors.occupation.length > 0 ? (
                <span style={{ color: "red", paddingRight: "190px" }}>
                  {errors.occupation}
                </span>
              ) : (
                ""
              )} */}
            </FormGroup>

            <FormGroup>
              <ControlLabel
                style={{ paddingRight: "1000px", paddingTop: "10px" }}
              >
                Marital Status:{" "}
              </ControlLabel>
              <FormControl
                required={true}
                // className={
                //   errors.maritalStatus && errors.maritalStatus.length > 0
                //     ? "error"
                //     : ""
                // }
                name="maritalStatus"
                value={this.state.data.maritalStatus}
                type="text"
                placeholder="Please Enter maritalStatus Here..."
                onChange={this.handleChange}
              />
              {/* {errors.maritalStatus && errors.maritalStatus.length > 0 ? (
                <span style={{ color: "red", paddingRight: "190px" }}>
                  {errors.maritalStatus}
                </span>
              ) : (
                ""
              )} */}
            </FormGroup>
            <br />

            <Button type="submit" className="btn btn-lg btn-success btn-block">
              Update
            </Button>
          </form>
        </div>
        {/* {data.map((user, index) =>
                    <div key={index}>
                        {this.handleUser(user._id)}
                    </div>
                )} */}
      </div>
    );
  }
}

EditProfile.propTypes = {
  registerProfile: PropTypes.func.isRequired,
  authProfile: PropTypes.object.isRequired
};

const mapStateToProps = state => (console.log("state",state),{
  authProfile: state.authProfile,
  errors: state.profileErrors
});

export default connect(
  mapStateToProps,
  { registerProfile }
)(withRouter(EditProfile));
