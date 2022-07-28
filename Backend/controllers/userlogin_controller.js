const path = require("path");
const express = require("express");
const User = require("../model/user_model");
const jwt = require("jsonwebtoken");
const Router = express.Router();
const bcrypt = require('bcrypt')

/**
 * sign in controller
 * @param req
 * @param res
 * @returns {Promise<any>}
 */

Router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  console.log(password);

  try {
    //find user by email
    const getUser = await User.findOne({ email });
    if (!getUser) return res.status(404).json({ message: "Account not found" });
    let isMatch = await bcrypt.compare(password, getUser.password);
    console.log(isMatch);

    if (!isMatch)
      return res.status(404).json({ message: "Invalid password" });

    if (getUser) {
      const token = jwt.sign(
        {
          email: getUser.email,
          userId: getUser._id,
        },
        "" + process.env.JWT_KEY,
        {
          expiresIn: "1h",
        }
      );

      return res.status(200).json({
        message: "Login successful",
        user: getUser,
        token: token,
      });
    }
  } catch (e) {
    res.status(500).json({ message: "Server error" + e });
  }
});

/**
 *get staff member by id controller
 * @param req
 * @param res
 * @returns {Promise<any>}
 */

Router.get("/getUser/:id", async (req, res) => {
  try {
    let id = req.params._id;
    console.log(_id);
    const member = await User.find({ id: _id });
    res.send(member);
  } catch (error) {
    res
      .status(400)
      .send("Error while getting list of user. Try again later.");
  }
});
module.exports = Router;