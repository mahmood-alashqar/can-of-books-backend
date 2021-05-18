'use strict';

//require the packages
const express = require('express');
const cors = require('cors');
require('dotenv').config();

//modules
const handelUser = require('./modules/User/User');
const recieveNewBooks = require('./modules/User/newBooks');

//env
const PORT = process.env.PORT;


const app = express();
app.use(cors());
app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.get('/books', handelUser);
app.post('/books', recieveNewBooks);


app.listen(PORT);
