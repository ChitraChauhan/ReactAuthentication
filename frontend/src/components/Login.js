import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authentication";
import classnames from "classnames";
import { fakeAuth } from "../App";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  Checkbox
} from "react-bootstrap";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      rememberMe: false,
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

  toggleRememberMe() {
    this.setState({
      rememberMe: !this.state.rememberMe
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
      rememberMe: this.state.rememberMe
    };
    this.props.loginUser(user, this.props.history);

    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }));
    });
  }

  // componentDidMount() {
  //   if (this.props.auth.isAuthenticated) {
  //     // this.props.history.push("/dashboard");
  //   }
  // }

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
              <h2>Login Page</h2>
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
                <ControlLabel style={{ paddingRight: "330px" }}>
                  Password:{" "}
                </ControlLabel>
                <FormControl
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.password
                  })}
                  name="password"
                  type="password"
                  value={this.state.password}
                  placeholder="Please Enter Password Here..."
                  onChange={this.handleInputChange}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </FormGroup>
              <Checkbox
                onChange={() => this.toggleRememberMe()}
                style={{ paddingRight: "250px" }}
              >
                Remember me
              </Checkbox>
              <Button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Submit
              </Button>
              <p>
                Not register yet?
                <a href="/register"> Register Here... </a>
                <br />
                <a href="/reset">Change Password...</a>
                <br />
                <a href="/forgot">Forgot Password?</a>
              </p>
            </form>
          </div>
        </div>
        {/* <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.email
              })}
              name="email"
              onChange={this.handleInputChange}
              value={this.state.email}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.password
              })}
              name="password"
              onChange={this.handleInputChange}
              value={this.state.password}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Login User
            </button>
          </div>
        </form> */}
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);

// import React, { Component } from "react";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { loginUser } from "../actions/authentication";
// import classnames from "classnames";
// import { fakeAuth } from "../App";
// import Button from '@material-ui/core/Button';
// import Avatar from "@material-ui/core/Avatar";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import FormControl from "@material-ui/core/FormControl";
// import Input from "@material-ui/core/Input";
// import InputLabel from "@material-ui/core/InputLabel";
// import LockIcon from "@material-ui/icons/LockOutlined";
// import Paper from "@material-ui/core/Paper";
// import Typography from "@material-ui/core/Typography";
// import withStyles from "@material-ui/core/styles/withStyles";

// const styles = theme => ({
//   layout: {
//     width: "auto",
//     display: "block", // Fix IE11 issue.
//     marginLeft: theme.spacing.unit * 3,
//     marginRight: theme.spacing.unit * 3,
//     [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
//       width: 400,
//       marginLeft: "auto",
//       marginRight: "auto"
//     }
//   },
//   paper: {
//     marginTop: theme.spacing.unit * 8,
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
//       .spacing.unit * 3}px`
//   },
//   avatar: {
//     margin: theme.spacing.unit,
//     backgroundColor: theme.palette.secondary.main
//   },
//   form: {
//     width: "100%", // Fix IE11 issue.
//     marginTop: theme.spacing.unit
//   },
//   submit: {
//     marginTop: theme.spacing.unit * 3
//   }
// });

// class Login extends Component {
//   constructor() {
//     super();
//     this.state = {
//       email: "",
//       password: "",
//       errors: {},
//       redirectToReferrer: false
//     };
//     this.handleInputChange = this.handleInputChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleInputChange(e) {
//     this.setState({
//       [e.target.name]: e.target.value
//     });
//   }

//   handleSubmit(e) {
//     e.preventDefault();
//     const user = {
//       email: this.state.email,
//       password: this.state.password
//     };
//     this.props.loginUser(user, this.props.history);

//     fakeAuth.authenticate(() => {
//       this.setState(() => ({
//         redirectToReferrer: true
//       }));
//     });
//   }

//   componentDidMount() {
//     if (this.props.auth.isAuthenticated) {
//       // this.props.history.push("/dashboard");
//     }
//   }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.auth.isAuthenticated) {
//       // this.props.history.push("/dashboard");
//     }
//     if (nextProps.errors) {
//       this.setState({
//         errors: nextProps.errors
//       });
//     }
//   }

//   render() {
//     const { errors } = this.state;
//     const { classes } = this.props;

//     return (
//       <React.Fragment>
//         <CssBaseline />
//         <main className={classes.layout}>
//           <Paper className={classes.paper}>
//             <Avatar className={classes.avatar}>
//               <LockIcon />
//             </Avatar>
//             <Typography variant="headline">Sign in</Typography>
//             <form className={classes.form}>
//             <FormControl margin="normal" required fullWidth>
//               <InputLabel htmlFor="email">Email Address</InputLabel>
//               <Input id="email" name="email" autoComplete="email" autoFocus />
//             </FormControl>
//             <FormControl margin="normal" required fullWidth>
//               <InputLabel htmlFor="password">Password</InputLabel>
//               <Input
//                 name="password"
//                 type="password"
//                 id="password"
//                 autoComplete="current-password"
//               />
//             </FormControl>
//             <Button
//               type="submit"
//               fullWidth
//               variant="raised"
//               color="primary"
//               className={classes.submit}
//             >
//               Sign in
//             </Button>
//           </form>
//           </Paper>
//         </main>
//       </React.Fragment>
//     );
//   }
// }
// Login.propTypes = {
//   loginUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired,
//   classes: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth,
//   errors: state.errors
// });

// export default (withStyles(styles),
// connect(
//   mapStateToProps,
//   { loginUser }
// ))(Login);
