const express = require("express");
const app = express();
const port = 3000;

// Serve static files from public folder
app.use(express.static("public"));





// app setup
app.use(express.json());
app.use(express.static("public"));

// create an array of posts
let posts = [];

// GET for the posts
app.get("/posts", (req, res) => {
	res.json(posts);
});

// POST the post
app.post("/posts", (req, res) => {
	// REQUEST
	const {author, text, timestamp} = req.body;

	const newPost = {author, text, timestamp};
	// put the new post into the array
	posts.push(newPost);
	console.log(posts);
	// RESPONSE
	res.json(newPost);
})

// Listening command through port assigned
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});