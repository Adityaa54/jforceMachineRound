// /config/db.js

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    
    await mongoose.connect('mongodb+srv://new-user:Aniket%4054@user1.zoqramh.mongodb.net/expenseDB?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); 
  }
};

module.exports = connectDB;