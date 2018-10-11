import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { registerUser } from "../actions/authentication";
import classnames from "classnames";
import { fakeAuth } from "../App";
import { FormGroup, ControlLabel, FormControl, Button } from "react-bootstrap";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      fullName: "",
      email: "",
      password: "",
      password_confirm: "",
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

  resetState() {
    this.setState({
      name: "",
      fullName: "",
      email: "",
      password: "",
      password_confirm: ""
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = {
      name: this.state.name,
      fullName: this.state.fullName,
      email: this.state.email,
      password: this.state.password,
      password_confirm: this.state.password_confirm
    };
    this.props.registerUser(user, this.props.history);

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

  componentDidMount() {
    // if (this.props.auth.isAuthenticated) {
    //   // this.props.history.push("/dashboard");
    // }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="main">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <h2>Registration Page</h2>
            <FormGroup>
              <ControlLabel
                style={{ paddingRight: "330px", paddingTop: "10px" }}
              >
                Username:{" "}
              </ControlLabel>
              <FormControl
                required={true}
                name="name"
                value={this.state.name}
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
                  value={this.state.fullName}
                  type="text"
                  placeholder="Please Enter LastName and FirstName Here..."
                  onChange={this.handleInputChange}
                />
              </div>
              {errors.fullName && errors.fullName.length > 0 ? (
                <span style={{ color: "red", paddingRight: "220px" }}>
                  {errors.fullName}
                </span>
              ) : (
                ""
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
                value={this.state.email}
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
                Password:{" "}
              </ControlLabel>
              <FormControl
                required={true}
                name="password"
                value={this.state.password}
                type="password"
                placeholder="Please Enter Password Here..."
                onChange={this.handleInputChange}
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.password
                })}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </FormGroup>
            <FormGroup>
              <ControlLabel
                style={{ paddingRight: "330px", paddingTop: "10px" }}
              >
                Confirm Password:{" "}
              </ControlLabel>
              <FormControl
                required={true}
                name="password_confirm"
                value={this.state.password_confirm}
                type="password"
                placeholder="Confirm Password"
                onChange={this.handleInputChange}
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.password_confirm
                })}
              />
              {errors.password_confirm && (
                <div className="invalid-feedback">
                  {errors.password_confirm}
                </div>
              )}
            </FormGroup>
            <br />
            <Button type="submit" className="btn btn-lg btn-primary btn-block">
              Register
            </Button>
            <Button
              className="btn btn-secondary btn-block"
              onClick={() => this.resetState()}
            >
              Reset
            </Button>
            <p>Already registered?
            <a href="/"> Login In Here </a></p>
          </form>
        </div>
      </div>
      // <div>
      //     <h2 style={{marginBottom: '40px'}}>Registration</h2>
      //     <form onSubmit={ this.handleSubmit }>
      //         <div className="form-group">
      //             <input
      //             type="text"
      //             placeholder="Name"
      //             className={classnames('form-control form-control-lg', {
      //                 'is-invalid': errors.name
      //             })}
      //             name="name"
      //             onChange={ this.handleInputChange }
      //             value={ this.state.name }
      //             />
      //             {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
      //         </div>
      //         <div className="form-group">
      //             <input
      //             type="email"
      //             placeholder="Email"
      //             className={classnames('form-control form-control-lg', {
      //                 'is-invalid': errors.email
      //             })}
      //             name="email"
      //             onChange={ this.handleInputChange }
      //             value={ this.state.email }
      //             />
      //             {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
      //         </div>
      //         <div className="form-group">
      //             <input
      //             type="password"
      //             placeholder="Password"
      //             className={classnames('form-control form-control-lg', {
      //                 'is-invalid': errors.password
      //             })}
      //             name="password"
      //             onChange={ this.handleInputChange }
      //             value={ this.state.password }
      //             />
      //             {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
      //         </div>
      //         <div className="form-group">
      //             <input
      //             type="password"
      //             placeholder="Confirm Password"
      //             className={classnames('form-control form-control-lg', {
      //                 'is-invalid': errors.password_confirm
      //             })}
      //             name="password_confirm"
      //             onChange={ this.handleInputChange }
      //             value={ this.state.password_confirm }
      //             />
      //             {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}
      //         </div>
      //         <div className="form-group">
      //             <button type="submit" className="btn btn-primary">
      //                 Register User
      //             </button>
      //         </div>
      //     </form>
      // </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => (
  console.log("state in register", state),
  {
    auth: state.auth,
    errors: state.errors
  }
);

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
