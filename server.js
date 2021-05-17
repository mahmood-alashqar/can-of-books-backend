'use strict';

//require the packages
const express = require('express');
const cors = require('cors');
require('dotenv').config();

//modules
const handelUser = require('./modules/User/User');

//env
const PORT = process.env.PORT;

const app = express();
app.use(cors());

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.get('/books', handelUser);


app.listen(PORT);
