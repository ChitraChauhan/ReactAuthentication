const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileRegisterInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.fathersName = !isEmpty(data.fathersName) ? data.fathersName : "";
  data.age = !isEmpty(data.age) ? data.age : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.occupation = !isEmpty(data.occupation) ? data.occupation : "";
  data.maritalStatus = !isEmpty(data.maritalStatus) ? data.maritalStatus : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 to 30 chars";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (!Validator.isLength(data.fathersName, { min: 2, max: 30 })) {
    errors.fathersName = "Fathers Name must be between 2 to 30 chars";
  }

  if (Validator.isEmpty(data.fathersName)) {
    errors.fathersName = "Fathers Name is required";
  }

  if (Validator.isEmpty(data.age)) {
    errors.age = "Age field is required";
  }

  if (Validator.isEmpty(data.address)) {
    errors.address = "Address is required";
  }

  if (Validator.isEmpty(data.occupation)) {
    errors.occupation = "Occupation is required";
  }

  if (Validator.isEmpty(data.maritalStatus)) {
    errors.maritalStatus = "Marital Status is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
