const db  = require("../db");
const bcrypt = require("bcrypt");

function register(req, res) {
  // CHECK EXISTING USER
  const q = "SELECT * FROM admin WHERE email = ? OR username = ?";

  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");

    // Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO admin(`username`,`email`,`password`) VALUES (?)";
    const values = [req.body.username, req.body.email, hash];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
}

function login(req, res) {
  // CHECK USER
  const q = "SELECT * FROM admin WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    // Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password!");

    // Set user session
    req.session.user = data[0];
    res.status(200).json("Logged in successfully.");
  });
}

function logout(req, res) {
  // Clear user session
  req.session.destroy(err => {
    if (err) return res.status(500).json(err);
    res.clearCookie("connect.sid").status(200).json("Logged out successfully.");
  });
}

module.exports = { register, login, logout };
