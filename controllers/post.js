const Post = require("../models/post");

// Get all posts
// Get all posts using async/await
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().select("_id title body"); // Fetch all posts
    res.status(200).json({ posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posts" }); // Return an error response
  }
};

// Create a new post
const createPost = async (req, res) => {
  try {
    // Create a new Post instance from the request body
    const post = new Post(req.body);

    // Save the post and await the result
    const result = await post.save();

    // Send a success response
    res.status(200).json({
      post: result,
    });
  } catch (err) {
    // Handle errors and send a response
    res.status(400).json({
      error: err.message,
    });
  }
};

// Exporting the functions
module.exports = {
  getPosts,
  createPost,
};
