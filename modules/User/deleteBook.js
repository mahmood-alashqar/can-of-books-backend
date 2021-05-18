'use strict';
const deleteBook = (req, res) => {
  const index = Number(req.params.indexFromUser);
  const { email } = req.query;
  User.find({ email: email }, (error, emailData) => {
    const newBookArray = emailData[0].books.filter((book, idx) => {
      return idx !== index;
    });
    emailData[0].books = newBookArray;
    emailData[0].save();
  });


}

module.exports = deleteBook;