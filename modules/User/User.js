'use strict';

//require the packages
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/canOfBooks', { useNewUrlParser: true, useUnifiedTopology: true });

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

function seedBooksCollection(name, description, status) {
  const newBook = new Book({
    name: name,
    description: description,
    status: status
  });
  newBook.save();
}

function seedUsersCollection(email, arrObj) {
  const newUser = new User({
    email: email,
    books: arrObj
  });
  newUser.save();
}

const booksNames = ['Code Complete', 'Design Patterns', 'Soft Skills'];
const booksDescriptions = ['Code Complete is a software development book, written by Steve McConnell and published in 1993 by Microsoft Press, encouraging developers to continue past code-and-fix programming and the big design up front and waterfall models.', 'Design Patterns: Elements of Reusable Object-Oriented Software is a book written by Richard Helm, Erich Gamma Ralph Johnson, John Vlissides, and Grady Booch. The authors of this book begin by illustrating what patterns are and how they can help you design object-oriented software.', 'Soft Skills: The Software Developer\'s Life is a reference book written by Manual John. It is a guide to a well-rounded, satisfying life as a software development professional. For that, developer and life author advise software engineers on important subjects like career and productivity, personal finance and investing, and fitness and relationships.'];
const booksStatus = ['available', 'not available', 'available'];

const usersEmails = ['mohammadkhaled59@gmail.com', 'technology.style.cs@gmail.com'];
const arrObjs = [[{ name: booksNames[0], description: booksDescriptions[0], status: booksStatus[0] }, { name: booksNames[2], description: booksDescriptions[2], status: booksStatus[2] }], [{ name: booksNames[1], description: booksDescriptions[1], status: booksStatus[1] }, { name: booksNames[0], description: booksDescriptions[0], status: booksStatus[0] }]];

// booksNames.map((result, index) => seedBooksCollection(booksNames[index], booksDescriptions[index], booksStatus[index]));
// usersEmails.map((result, index) => seedUsersCollection(usersEmails[index], arrObjs[index]));


const handelUser = (req, res) => {
  const { email } = req.query;
  User.find({ email: email }, function (err, userData) {
    if (err) res.send('didnt work');
    res.send(userData);
  });
};

module.exports = handelUser;
