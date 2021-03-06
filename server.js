const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("./helpers/uuid")

//setting up port that app will listen to
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
let notes = require("./db/db.json");

//Route
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

//Display notes
app.get("/api/notes", function (req, res) {
  fs.readFile("db/db.json", "utf8", function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    res.json(notes);
  });
});


//Setup app listener
app.listen(PORT, function() {
    console.log(`App listening at http://localhost:${PORT} 🚀`)
});  

//Create new note
app.post("/api/notes", function (req, res) { 
  let newNote = {
    id: uuid(),
    title: req.body.title,
    text: req.body.text,
  };
  console.log(typeof notes);
  notes.push(newNote);
  const stringifyNote = JSON.stringify(notes);
  res.json(notes);
  fs.writeFile("db/db.json", stringifyNote, (err) => {
    if (err) console.log(err);
    else {
      console.log("Note successfully saved!");
    }
  });
});

//Delete note
app.delete("/api/notes/:id", function (req, res) {
  let noteID = req.params.id;
  fs.readFile("db/db.json", "utf8", function (err, data) {
    let updatedNotes = JSON.parse(data).filter((note) => {
      console.log("note.id", note.id);
      console.log("noteID", noteID);
      return note.id !== noteID;
    });
    notes = updatedNotes;
    const stringifyNote = JSON.stringify(updatedNotes);
    fs.writeFile("db/db.json", stringifyNote, (err) => {
      if (err) console.log(err);
      else {
        console.log("Note successfully deleted!");
      }
    });
    res.json(stringifyNote);
  });
});

//Catch all error route
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});