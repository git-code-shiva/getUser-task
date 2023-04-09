// require('dotenv').config();
const mongoose = require('mongoose');

async function getConnection(){
    await mongoose.connect('mongodb+srv://shvasharma29:shivasharma@cluster0.iajrtpz.mongodb.net/?retryWrites=true&w=majority');
}

module.exports = getConnection;
