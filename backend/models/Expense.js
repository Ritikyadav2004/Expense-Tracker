
const mongoose = require('mongoose');

// Schema 
const expenseSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, 'Category is required'], // required
    enum: ['Food', 'Travel', 'Shopping', 'Entertainment', 'Health', 'Bills', 'Education','Other' ], // //avilable options
    trim: true
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount cannot be negative'] 
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
    default: Date.now // agar date na bheji jaye toh aaj ki date select ho jayegi
  },

   user: {
    type: mongoose.Schema.Types.ObjectId, //  unique ObjectId type  og Mongodb
    ref: 'User', // it will reffred to user model
    required: true,
  }
  
}, {
  timestamps: true // isse automatically createdAt aur updatedAt timestamps mil jayenge
});

// 2. Schema se Model create kiya aur export kiya
const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;