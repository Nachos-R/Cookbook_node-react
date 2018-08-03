const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateRecipeInput = data => {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.text = !isEmpty(data.text) ? data.text : '';

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
