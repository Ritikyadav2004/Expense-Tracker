import React, { useState, useContext } from 'react';
import Loading from '../components/Loading';
import BackButton from '../components/BackButton';
import UserContext from '../context/UserContext';
import { addExpense } from '../services/expenseService';
import { Link } from 'react-router-dom';

const AddExpense = () => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('');
  
  const { user, fetchExpenses } = useContext(UserContext) || { user: null, fetchExpenses: () => {} };
  
  /**
   * Handle form submission to add expense
   * @param {Object} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setStatusMessage("Please login first to record and preserve expenses!");
      setStatusType('error');
      return;
    }

    const expenseData = {
      category,
      amount: Number(amount),
      date,
      userId: user.id || user._id
    };

    setStatusMessage('');
    setStatusType('');
    setLoading(true);
    try {
      await addExpense(expenseData);
      setStatusMessage("Expenditure successfully archived into ledger!");
      setStatusType('success');
      setCategory('');
      setAmount('');
      fetchExpenses();
    } catch (error) {
      console.error("Save Expense Error:", error);
      setStatusMessage(error.message || "Failed to record expense");
      setStatusType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#fafafa] py-10 px-6 sm:px-10">
      <Loading visible={loading} message="Archiving expense record..." />

      <div className="max-w-[1280px] mx-auto space-y-8">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <BackButton />
        </div>

        <div className="max-w-xl mx-auto">
          
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold block mb-2 font-sans">
              Ledger Entry
            </span>
            <h1 
              className="text-4xl sm:text-5xl font-normal text-slate-900 tracking-tight"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              Record <em>Transaction</em>
            </h1>
            <p className="text-sm text-slate-600 mt-2 font-body">
              Log details to categorize and track expenditure habits.
            </p>
          </div>

          {/* Status notification */}
          {statusMessage && (
            <div className={`mb-6 rounded-full px-6 py-3 text-sm text-center font-medium border ${
              statusType === 'error' 
                ? 'bg-rose-50 border-rose-200 text-rose-700' 
                : 'bg-emerald-50 border-emerald-200 text-emerald-800'
            }`}>
              {statusMessage}
            </div>
          )}

          {!user && (
            <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-800 text-xs text-center">
              Notice: You are currently not signed in. <Link to="/login" className="underline font-semibold ml-1">Sign in</Link> to associate this expense with your account.
            </div>
          )}

          {/* Editorial Form Card */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Category Select */}
              <div>
                <label 
                  htmlFor="expenseCategory" 
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2 font-sans"
                >
                  Expense Classification
                </label>
                <select
                  id="expenseCategory"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white transition"
                >
                  <option value="">Select Category</option>
                  <option value="Food">Food</option>
                  <option value="Travel">Travel</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Health">Health</option>
                  <option value="Education">Education</option>
                  <option value="Bills">Bills</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Amount Input */}
              <div>
                <label 
                  htmlFor="amount" 
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2 font-sans"
                >
                  Amount (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-sm">
                    ₹
                  </span>
                  <input 
                    type="number" 
                    id="amount"
                    step="0.01"
                    min="0"
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    placeholder="0.00" 
                    required
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-8 pr-4 py-3 text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Date Input */}
              <div>
                <label 
                  htmlFor="date" 
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2 font-sans"
                >
                  Transaction Date
                </label>
                <input 
                  type="date" 
                  id="date"
                  value={date} 
                  required
                  onChange={(e) => setDate(e.target.value)} 
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white transition"
                />
              </div>

              {/* Submit Pill Button */}
              <div className="pt-2">
                <button 
                  type="submit" 
                  className="w-full btn-pill btn-pill-primary py-3.5 text-sm font-medium shadow-sm"
                  style={{ backgroundColor: '#000000', color: '#ffffff', borderRadius: '9999px' }}
                >
                  Commit Expense Record
                </button>
              </div>

            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AddExpense;