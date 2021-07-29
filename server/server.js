const express = require('express');
const cors = require('cors');
const path = require('path')
const app = express();
const dotenv = require('dotenv');

// Connection to the MongoDB Database
require('./db');  // OR
// require('./database');

app.use(cors());
app.use(express.json());


// API
// const books = require('./routes');
// app.use('/api', books);

// app.get('/home', (req, res) => {
//     res.send("Hello world")
// })

app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})

app.use(require("./routes"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});