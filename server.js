const express = require("express");
const path = require("path");

const app = express();

// Serve static files from the "assets" directory in the root folder
app.use(express.static(path.join(__dirname, "assets")));

// Serve static files from the "images" directory in the root folder
app.use(express.static(path.join(__dirname, "images")));

// Serve the index.html file as the home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
