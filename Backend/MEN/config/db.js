const mongoose = require('mongoose');

const connection = mongoose.connect(
  'mongodb+srv://showman96m_db_user:Bharat%401297@cluster0.q7u5l9i.mongodb.net/backend'
)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => console.log(err));

module.exports = connection;
