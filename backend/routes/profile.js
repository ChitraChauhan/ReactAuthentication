const express = require("express");
const profileRouter = express.Router();
const validateProfileRegisterInput = require("../validation/profile");
var Profile = require("../models/profileRegister");

profileRouter.get("/profileRegistration", function(req, res) {
  Profile.find(function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

profileRouter.post("/profileRegistration", function(req, res) {
  const { errors, isValid } = validateProfileRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Profile.findOne({
    name: req.body.name,
    fathersName: req.body.fathersName
  }).then(user => {
    if (user) {
      return res.status(400).json({
        name: "This profile already exists"
      });
    } else {
      var newUser = new Profile();
      newUser.name = req.body.name;
      newUser.fathersName = req.body.fathersName;
      newUser.age = req.body.age;
      newUser.address = req.body.address;
      newUser.occupation = req.body.occupation;
      newUser.maritalStatus = req.body.maritalStatus;

      newUser.save(function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.json(result);
        }
      });
    }
  });
});

profileRouter.get("/editProfile", function(req, res) {
  Profile.find(function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

profileRouter.get("/editProfile/:id", function(req, res) {
  Profile.find({ _id: req.params.id }, function(err, result) {
    if (err) {
      return res.send({ err });
    }
    res.json(result);
  });
});


profileRouter.delete("/editProfile/:id", function(req, res) {
  var query = req.params._id;
  Profile.remove(query, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

profileRouter.put("/editProfile/:id", function(req, res) {
  Profile.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
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
});

module.exports = profileRouter;
