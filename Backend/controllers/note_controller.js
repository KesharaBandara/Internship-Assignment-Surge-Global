const path = require("path");
const express = require("express");
const Note = require("../model/note_model");
const jwt = require("jsonwebtoken");
const Router = express.Router();

Router.post(
  "/insert",
  async (req, res) => {
    console.log(req.body);

    try {
      const note = new Note(req.body);
      await note.save().then((result) => {
        console.log(result);
        res.send("successful");
      });

    } catch (error) {
      console.log(error);
      res
        .status(400)
        .send("Error while uploading. Try again later.");
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);


Router.get("/getAllNotes", async (req, res) => {
  try {
    let id = req.params.id
    const files = await Note.find({});
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res
      .status(400)
      .send("Error while getting list of Notes. Try again later.");
  }
});

Router.get("/getUserNotes/:id", async (req, res) => {
  try {
    let id = req.params.id
    const files = await Note.find({ userid: id });
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res
      .status(400)
      .send("Error while getting list of Notes. Try again later.");
  }
});

Router.get("/searchNote/:key", async (req, res) => {
  try {
    let key = req.params.key;
    let query = { name: new RegExp(key, "i") };
    console.log(query);
    Note.find(query, (err, result) => {
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
      .send("Error while Loading Details. Try again later.");
  }
});

// Router.get("/getNote/:id", async (req, res) => {
//   try {
//     let id = req.params._id;
//     console.log(id);
//     const member = await Note.find({ title: _id });
//     res.send(member);
//   } catch (error) {
//     res
//       .status(400)
//       .send("Error while Loading list of notes. Try again later.");
//   }
// });

Router.put("/:id", async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    const data = {
      title: req.body.title || note.title,
      description: req.body.description || note.description,
    };
    note = await Note.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(note);
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

//Delete
Router.delete("/:id", async (req, res) => {
  try {
    // Find note by id
    const note = await Note.findById(req.params.id);
    if (!note) throw Error("No file found");
    // Delete note from db
    const removed = await note.remove();
    if (!removed)
      throw Error("Something went wrong while trying to delete the file");
    res.json(note);
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});



module.exports = Router;