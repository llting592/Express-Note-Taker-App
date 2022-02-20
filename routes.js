const path = require("path");
const fs = require ("fs");


let noteData = getNotes();

function getNotes(){
    let data = fs.readFileSync("./db/db.json", "utf8");

    let note = JSON.parse(data);

    for (let i = 0; i < note.length; i++){
        note[i]="" + i;
    }

    return note;
}

module.exports = function (app) {

    app.get("/api/notes", function (req, res) {
        noteData = getNotes();
        res.json(noteData);
    });

    app.post("/api/notes", function (req, res) {
        noteData.push(req.body);
        fs.writeFileSync('./db/db.json', JSON.stringify(noteData), 'utf8');
        res.json(true);
    });

    app.delete("/api/notes/:id", function (req, res) {
        const requestID = req.params.id;
        console.log(requestID);

        let note = noteData.filter(note => {
            return note.id === requestID;
        })[0];

        console.log(note);
        const index = noteData.indexOf(note);

        noteData.splice(index, 1);

        fs.writeFileSync('./db/db.json', JSON.stringify(noteData), 'utf8');
        res.json("Note deleted");
    });
};