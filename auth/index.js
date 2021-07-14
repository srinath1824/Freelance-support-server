const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/login", (req, res) => {
  if (
    req.body.username === "test" &&
    req.body.password === "test"
  ) {
    const token = jwt.sign(
      { message: "authenticated" },
      process.env.JWTPRIVATEKEY
    );
    res.header("x-auth-token", token);
    res.status(200).send({
      message: "Logged in successfully",
      "x-auth-token": token,
    });
  } else {
    res.status(400).send({
      message: "Incorrect username or password",
    });
  }
});

module.exports = router;
