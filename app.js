// //starter code for the app.js
// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const app = express();
// const morgan = require("morgan"); //used for middleware
// const bodyParser = require("body-parser");
// const expressValidator = require("express-validator");
// //dotenv config
// dotenv.config();

// //db connection

// mongoose
//   .connect(process.env.MONGO_URL, { useNewUrlParser: true })
//   .then(() => console.log("DB connected"));
// mongoose.connection.on("error", (err) => {
//   console.log(`DB connection error: ${err.message}`);
// });

// //bringing routes

// const postRoutes = require("./routes/post"); //importing the required routes
// const myOwnMiddleWare = (req, res, next) => {
//   console.log("my middle where is applied !!");
//   next(); //because it can get stuck we need to use next()
// };
// //midleware

// app.use(morgan("dev")); // gives information from where the data has come
// app.use(myOwnMiddleWare);
// app.use(bodyParser.json());
// app.use(expressValidator());
// app.use("/", postRoutes);

// const port = process.env.PORT || 3000;
// app.listen(port, () => {});
// //starter code for the app.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan"); // Logs HTTP requests
const { body, validationResult } = require("express-validator"); // Modern validation API

// Load environment variables
dotenv.config();

const app = express();

// Database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(`DB connection error: ${err.message}`));

// Middleware
app.use(morgan("dev")); // Log HTTP requests
app.use(express.json()); // Parse JSON bodies

// Custom Middleware Example
const myOwnMiddleware = (req, res, next) => {
  console.log("Custom middleware is applied!!");
  next();
};
app.use(myOwnMiddleware);

// Example validation middleware
const validatePost = [
  body("title", "Title is required").notEmpty(),
  body("title", "Title must be between 4 and 150 characters").isLength({
    min: 4,
    max: 150,
  }),
  body("body", "Body is required").notEmpty(),
  body("body", "Body must be between 10 and 2000 characters").isLength({
    min: 10,
    max: 2000,
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Example route using validation middleware
app.post("/posts", validatePost, (req, res) => {
  res.status(200).json({
    message: "Post created successfully",
    data: req.body,
  });
});

// Import and use other routes
const postRoutes = require("./routes/post");
app.use("/", postRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
