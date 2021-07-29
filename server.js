const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const dotenv = require('dotenv');
const mongoose = require("mongoose");

const routes = require('./client/server/routes')

// Connection to the MongoDB Database
/* const server = require('./server/db'); */  // OR
// require('./database');

app.use(cors());
app.use(express.json());


// API
// const books = require('./routes');
// app.use('/api', books);

// app.get('/home', (req, res) => {
//     res.send("Hello world")
// })

app.use(express.static(path.join(__dirname, './client/build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build'))
})


const db = mongoose.connect(`mongodb+srv://nathan:password1234@cluster0.dfgvs.mongodb.net/googleBooks?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useFindAndModify: false
})
.then(() => console.log("MongoDB Database is Connected"))
.catch((err) => console.log(`An error has occured in DB connection: ${err}`))

app.use(require("./client/server/routes"));

const PORT = process.env.PORT || 5000;
app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${PORT}`);
});