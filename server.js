const express = require("express");
const path = require("path");
const fs = require("fs");

//setting up port that app will listen to
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

//Use route files
require('./routes')(app);
require('./htmlroute')(app);

// Setup app listener
app.listen(PORT, function() {
    console.log(`App listening at http://localhost:${PORT} 🚀`)
});  