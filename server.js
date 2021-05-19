'use strict';

//require the packages
const express = require('express');
const cors = require('cors');
require('dotenv').config();


//modules
const userModel = require('./models/user.model/user.model');

//env
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.get('/books', userModel.handelUser);

app.post('/books', userModel.addbook);

app.delete('/books/:index', userModel.deleteBook);

app.put('/books/:index', userModel.updateBook);

app.listen(PORT);
