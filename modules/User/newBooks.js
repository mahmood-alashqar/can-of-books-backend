'use strict'

const recieveNewBooks = (req, res) => {
  const { email, books } = req.body;
  User.find({ email: email }, (error, emailData) => {
    emailData[0].books.push({
      email: email,
      book: books,
    })
    emailData[0].save();
    res.send(emailData[0].books);
  });

}
module.exports = recieveNewBooks;