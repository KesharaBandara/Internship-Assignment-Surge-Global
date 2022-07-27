const path = require("path");
const express = require("express");
const User = require("../model/user_model");
const jwt = require("jsonwebtoken");
const Router = express.Router();

/**
 * Add user member controller
 * @param req
 * @param res
 * @returns {Promise<any>}
 */

Router.post(
  "/insert",
  async (req, res) => {
    try {
      const { firstName, lastName, email, dateOfBirth, mobile, status, password, accountType } = req.body;
      const user = new User({
        firstName,
        lastName,
        email,
        dateOfBirth,
        mobile,
        status,
        password,
        accountType,
      });
      await user.save();
      res.send("successfully new User added to the system.");
    } catch (error) {
      res
        .status(400)
        .send("Error while uploading User details. Try again later.");
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

/**
 * get all user member controller
 * @param req
 * @param res
 * @returns {Promise<any>}
 */

Router.get("/getAllUsers", async (req, res) => {
  try {
    const files = await User.find({});
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res
      .status(400)
      .send("Error while getting list of users. Try again later.");
  }
});

/**
 *search user member by name controller
 * @param req
 * @param res
 * @returns {Promise<any>}
 */

Router.get("/searchStaff/:key", async (req, res) => {
  try {
    let key = req.params.key;
    let query = { name: new RegExp(key, "i") };
    console.log(query);
    User.find(query, (err, result) => {
      if (err) {
        return next(err);
      }

      data = {
        status: "success",
        code: 200,
        data: result,
      };
      res.json(data);
    });
  } catch (error) {
    res
      .status(400)
      .send("Error while getting user member Details. Try again later.");
  }
});

/**
 *get user member by id controller
 * @param req
 * @param res
 * @returns {Promise<any>}
 */

Router.get("/getstaffmember/:id", async (req, res) => {
  try {
    let id = req.params._id;
    console.log(id);
    const member = await User.find({ firstName: _id });
    res.send(member);
  } catch (error) {
    res
      .status(400)
      .send("Error while getting list of user members. Try again later.");
  }
});

/**
 * update user member controller
 * @param req
 * @param res
 * @returns {Promise<any>}
 */

Router.put("/:id",async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(user.cloudinary_id);
    // Upload image to cloudinary
    const data = {
      firstName: req.body.firstName || user.firstName,
      lastName: req.body.contact || user.lastName,
      email: req.body.email || user.email,
      dateOfBirth: req.body.address || user.dateOfBirth,
      mobile: req.body.address || user.mobile,
      status: req.body.address || user.status,
      password: req.body.address || user.password,

    };
    user = await User.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(user);
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});



module.exports = Router;