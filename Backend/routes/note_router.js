import express from "express";
import Note from "../models/note_model.js";
import {
  allNote,
  oneNote,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/note_controller.js";

const router = express.Router();
// Getting all
router.get("/", allNote);

// Getting One
router.get("/:id", getNote, oneNote);

// Creating one
router.post("/", createNote);

// Updating One
router.patch("/:id", getNote, updateNote);

// Deleting One
router.delete("/:id", getNote, deleteNote);

async function getNote(req, res, next) {
  let note;
  try {
    note = await Note.findById(req.params.id);
    if (note == null) {
      return res.status(404).json({ message: "Cannot find note" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.note = note;
  next();
}

export default router;
