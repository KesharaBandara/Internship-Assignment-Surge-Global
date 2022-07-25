import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import usersRouter from "./routes/user_router.js";
import notesRouter from "./routes/note_router.js";

const PORT = "5000";
dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use("/users", usersRouter);
app.use("/notes", notesRouter);

app.listen(PORT, () =>
  console.log(`Server is up and running on https://localhost:${PORT}`)
);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));
