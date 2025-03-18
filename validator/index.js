const { body, validationResult } = require("express-validator");

exports.createPostValidator = [
  // Validate the title field
  body("title", "Write a title").notEmpty(),
  body("title", "Title must be between 4 to 150 characters").isLength({
    min: 4,
    max: 150,
  }),

  // Validate the body field
  body("body", "Write a body").notEmpty(),
  body("body", "Body must be between 10 to 2000 characters").isLength({
    min: 10,
    max: 2000,
  }),

  // Middleware to check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Extract the first error message
      const firstError = errors.array().map((error) => error.msg)[0];
      return res.status(400).json({ error: firstError });
    }
    // Proceed to the next middleware if no validation errors
    next();
  },
];
