'use strict';

//require the packages
const mongoose = require('mongoose');

const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(`${MONGODB_URL}/canOfBooks`, { useNewUrlParser: true, useUnifiedTopology: true });

// db schema
const bookSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: String
});

const userSchema = new mongoose.Schema({
  email: String,
  books: [bookSchema]
});

const Book = mongoose.model('Books', bookSchema);
const User = mongoose.model('Users', userSchema);

const seedBooksCollection = (name, description, status) => {
  const newBook = new Book({
    name: name,
    description: description,
    status: status
  });
  newBook.save();
};

const seedUsersCollection = (email, arrObj) => {
  const newUser = new User({
    email: email,
    books: arrObj
  });
  newUser.save();
};


const handelUser = async (req, res) => {
  const { email } = req.query;
  await User.find({ email: email }, function (err, userData) {
    if (err) res.send('didnt work');
    res.send(userData);
  });
};

const addbook = async (req, res) => {
  console.log(req.body);
  const { email, name, description, statu } = req.body;
  await User.find({ email: email }, (err, userData) => {
    if (err) res.send('didnt work');
    userData[0].books.push({
      name: name,
      description: description,
      status: statu,
    });
    userData[0].save();
    res.send(userData[0].books);
  });
};

const deleteBook = async (req, res) => {
  const index = Number(req.params.index);
  const { email } = req.query;
  await User.find({ email: email }, (err, userData) => {
    const newBook = userData[0].books.filter((book, idx) => {
      return idx !== index;
    });
    userData[0].books = newBook;
    userData[0].save();
    res.send('book deleted');
  });
};

const updateBook = async (req, res) => {
  const index = Number(req.params.index);
  const { email, name, description, statu } = req.body;
  await User.find({ email: email }, (err, userData) => {

    userData[0].books.splice(index, 1, {
      name: name,
      description: description,
      status: statu,
    });
    userData[0].save();
    res.send(userData[0].books)
  });
}

module.exports = {
  handelUser,
  Book,
  User,
  addbook,
  deleteBook,
  updateBook,
};
