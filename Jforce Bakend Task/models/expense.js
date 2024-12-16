
const mongoose = require('mongoose');
const User = require('./user');
const expenseSchema = new mongoose.Schema({
  expensename: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:User,
    required:true,
  }
});


const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;