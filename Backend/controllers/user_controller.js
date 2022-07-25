import User from "../models/user_model.js";

export const allUser = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const oneUser = (req, res) => {
  res.json(res.user);
};

export const createUser = async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    dateOfBirth: req.body.dateOfBirth,
    mobile: req.body.mobile,
    status: req.body.status,
    password: req.body.password,
    accountType: req.body.accountType,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  if (req.body.firstName != null) {
    res.user.firstName = req.body.firstName;
  }
  if (req.body.lastName != null) {
    res.user.lastName = req.body.lastName;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.dateOfBirth != null) {
    res.user.dateOfBirth = req.body.dateOfBirth;
  }
  if (req.body.mobile != null) {
    res.user.mobile = req.body.mobile;
  }
  if (req.body.status != null) {
    res.user.status = req.body.status;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  if (req.body.accountType != null) {
    res.user.accountType = req.body.accountType;
  }
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "Deleted User" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
