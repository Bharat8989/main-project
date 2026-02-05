const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/loginpage';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected Successfully'))
.catch((err) => console.error('❌ MongoDB Connection Error:', err));

module.exports = mongoose.connection;