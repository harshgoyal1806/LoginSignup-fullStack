const Joi = require("joi");

const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(100).required(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false }); // `abortEarly: false` gives all validation errors, not just the first one

  if (error) {
    return res.status(400).json({
      message: error.message,
      errors: error.details.map((detail) => detail.message), // Clean error messages
    });
  }
  next();
};

const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(100).required(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false }); // `abortEarly: false` gives all validation errors, not just the first one

  if (error) {
    return res.status(400).json({
      message: "Bad Request",
      error: error, // Clean error messages
    });
  }

  next();
};

module.exports = {signupValidation,loginValidation};
