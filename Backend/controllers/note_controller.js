import Note from "../models/note_model.js";

export const allNote = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const oneNote = (req, res) => {
  res.json(res.note);
};

export const createNote = async (req, res) => {
  const note = new Note({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateNote = async (req, res) => {
  if (req.body.title != null) {
    res.note.title = req.body.title;
  }
  if (req.body.description != null) {
    res.note.description = req.body.description;
  }
  try {
    const updatedNote = await res.note.save();
    res.json(updatedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    await res.note.remove();
    res.json({ message: "Deleted Note" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
