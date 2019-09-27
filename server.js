const express  = require('express');
const mongoose = require('mongoose');
const bodyParser= require('body-parser');

const users = require('./routes/api/register');

const app = express();

//Bodyparser Middleware
app.use(bodyParser.json());

//database config
const db = require('./config/keys').mongoURI;

//connect to Mongo
mongoose.connect(db, {useNewUrlParser: true})
        .then(() => console.log("Mongodb connected"))
        .catch(err => console.log(err));

//Use routes
app.use('/api/register', users);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));