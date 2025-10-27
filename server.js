const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Sample user (for demo)
const user = {
  username: "testuser",
  password: "12345"
};

// Render login page
app.get("/", (req, res) => {
  res.render("index");
});

// Handle login form submission
app.post("/login", (req, res) => {
  const { username, password, captcha, generatedCaptcha, robot } = req.body;

  if (!robot) {
    return res.send("<h3>Please confirm you are not a robot 🤖</h3>");
  }

  if (captcha !== generatedCaptcha) {
    return res.send("<h3>❌ Incorrect captcha. Try again.</h3>");
  }

  if (username === user.username && password === user.password) {
    return res.send("<h2>✅ Login successful!</h2>");
  } else {
    return res.send("<h3>❌ Invalid username or password.</h3>");
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
