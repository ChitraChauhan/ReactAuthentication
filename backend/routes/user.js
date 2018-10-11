const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const User = require("../models/User");

router.post("/register", function(req, res) {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      return res.status(400).json({
        email: "Email already exists"
      });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      const newUser = new User({
        name: req.body.name,
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        avatar
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) console.error("There was an error", err);
        else {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) console.error("There was an error", err);
            else {
              newUser.password = hash;
              newUser.save().then(user => {
                res.json(user);
              });
            }
          });
        }
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          fullName: user.fullName,
          avatar: user.avatar
        };
        jwt.sign(
          payload,
          "secret",
          {
            expiresIn: 3600
          },
          (err, token) => {
            if (err) console.error("There is some error in token", err);
            else {
              res.json({
                success: true,
                token: `Bearer ${token}`
              });
              return res.redirect("/dashboard");
            }
          }
        );
      } else {
        errors.password = "Incorrect Password";
        return res.status(400).json(errors);
      }
    });
  });
});

router.get("/editUser/:id", function(req, res) {
  User.find({ _id: req.params.id }, function(err, result) {
    if (err) {
      return res.send({ err });
    }
    res.json(result);
  });
});

router.put("/editUser/:id", function(req, res) {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //if password is updated
  if (req.body.password && req.body.newPassword) {
    const email = req.body.email;
    const password = req.body.password;
    const newPassword = req.body.newPassword;

    User.findOne({ email }).then(user => {
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors);
      }
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = {
            name: user.name,
            password: newPassword,
            avatar: user.avatar
          };
          bcrypt.genSalt(10, (err, salt) => {
            if (err) console.error("There was an error", err);
            else {
              bcrypt.hash(payload.password, salt, (err, hash) => {
                if (err) console.error("There was an error", err);
                else {
                  payload.password = hash;
                  User.findByIdAndUpdate({ _id: user.id }, payload, {
                    new: true
                  }).then(user => {
                    if (!user) {
                      return res.sendStatus(404);
                    }
                    jwt.sign(
                      payload,
                      "secret",
                      {
                        expiresIn: 3600
                      },
                      (err, token) => {
                        if (err)
                          console.error("There is some error in token", err);
                        else {
                          res.json({
                            success: true,
                            token: `Bearer ${token}`,
                            payload
                          });
                          return res.redirect("/dashboard");
                        }
                      }
                    );
                  });
                }
              });
            }
          });
        } else {
          errors.password = "Incorrect Password";
          return res.status(400).json(errors);
        }
      });
    });
  }
  //any other field is updated except password
  else {
    User.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true
    })
      .then(user => {
        if (!user) {
          return res.sendStatus(404);
        }
        res.json(user);
      })
      .catch(err => {
        logger.error(err);
        res.status(422).send(err.errors);
      });
  }
});

// router.get("/reset", function(req, res) {
//   res.render("reset", {
//     user: req.user
//   });
// });

router.post("/reset", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  const newPassword = req.body.newPassword;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          name: user.name,
          password: newPassword,
          avatar: user.avatar
        };
        bcrypt.genSalt(10, (err, salt) => {
          if (err) console.error("There was an error", err);
          else {
            bcrypt.hash(payload.password, salt, (err, hash) => {
              if (err) console.error("There was an error", err);
              else {
                payload.password = hash;
                User.findByIdAndUpdate({ _id: user.id }, payload, {
                  new: true
                }).then(user => {
                  if (!user) {
                    return res.sendStatus(404);
                  }
                  jwt.sign(
                    payload,
                    "secret",
                    {
                      expiresIn: 3600
                    },
                    (err, token) => {
                      if (err)
                        console.error("There is some error in token", err);
                      else {
                        res.json({
                          success: true,
                          token: `Bearer ${token}`,
                          payload
                        });
                        return res.redirect("/dashboard");
                      }
                    }
                  );
                });
              }
            });
          }
        });
      } else {
        errors.password = "Incorrect Password";
        return res.status(400).json(errors);
      }
    });
  });
});

router.post("/forgot", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const newPassword = req.body.newPassword;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    const payload = {
      name: user.name,
      password: newPassword,
      avatar: user.avatar
    };
    bcrypt.compare(newPassword, user.password).then(isMatch => {
      if (isMatch) {
        console.log("This Password is same as exisiting!");
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) console.error("There was an error", err);
          else {
            bcrypt.hash(payload.password, salt, (err, hash) => {
              if (err) console.error("There was an error", err);
              else {
                payload.password = hash;
                User.findByIdAndUpdate({ _id: user.id }, payload, {
                  new: true
                }).then(user => {
                  if (!user) {
                    return res.sendStatus(404);
                  }
                  jwt.sign(
                    payload,
                    "secret",
                    {
                      expiresIn: 3600
                    },
                    (err, token) => {
                      if (err)
                        console.error("There is some error in token", err);
                      else {
                        res.json({
                          success: true,
                          token: `Bearer ${token}`,
                          payload
                        });
                        return res.redirect("/dashboard");
                      }
                    }
                  );
                });
              }
            });
          }
        });
      }
    });
  });
});

module.exports = router;
