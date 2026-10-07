import React, { useState, useEffect, useContext } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import BackButton from '../components/BackButton';
import Loading from '../components/Loading';
import { updateExpense, deleteExpense } from '../services/expenseService';

/**
 * EditExpense - Dedicated page for modifying ledger transactions
 * Located in frontend/src/pages/EditExpense.jsx
 */
const EditExpense = () => {
  const { id: paramId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { expenses, setExpenses, fetchExpenses, user } = useContext(UserContext) || {
    expenses: [],
    setExpenses: () => {},
    fetchExpenses: () => {},
    user: null
  };

  // Determine active expense ID from path param or query string
  const activeId = paramId || searchParams.get('id') || '';

  const [selectedExpense, setSelectedExpense] = useState(null);
  const [category, setCategory] = useState('Food');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('');

  // Load matching expense when activeId or expenses list updates
  useEffect(() => {
    if (expenses && expenses.length > 0) {
      if (activeId) {
        const found = expenses.find((item) => String(item._id) === String(activeId));
        if (found) {
          populateForm(found);
          return;
        }
      }
      // If no valid activeId but expenses exist and no selection yet, default to first item
      if (!selectedExpense && expenses[0]) {
        populateForm(expenses[0]);
      }
    }
  }, [activeId, expenses]);

  const populateForm = (expense) => {
    setSelectedExpense(expense);
    setCategory(expense.category || 'Food');
    setAmount(String(expense.amount || ''));
    try {
      const parsedDate = new Date(expense.date).toISOString().split('T')[0];
      setDate(parsedDate);
    } catch {
      setDate(new Date().toISOString().split('T')[0]);
    }
  };

  const handleSelectExpense = (expense) => {
    populateForm(expense);
    setStatusMessage('');
    setStatusType('');
    setSearchParams({ id: expense._id });
  };

  /**
   * Submit form to update the selected expense
   */
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!selectedExpense) {
      setStatusMessage("Please select a transaction to modify.");
      setStatusType('error');
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setStatusMessage("Please enter a valid expense amount greater than zero.");
      setStatusType('error');
      return;
    }

    setStatusMessage('');
    setStatusType('');
    setLoading(true);

    try {
      const updatedData = {
        category,
        amount: Number(amount),
        date: date
      };

      const result = await updateExpense(selectedExpense._id, updatedData);

      // Optimistically update local context list
      if (setExpenses && expenses) {
        setExpenses((prev) =>
          prev.map((item) =>
            item._id === selectedExpense._id ? { ...item, ...updatedData, ...result } : item
          )
        );
      }

      setStatusMessage("Expenditure successfully updated in ledger!");
      setStatusType('success');
      
      // Refresh latest from backend
      if (fetchExpenses) {
        fetchExpenses();
      }

      // Update selected reference
      setSelectedExpense((prev) => ({ ...prev, ...updatedData, ...result }));

    } catch (error) {
      console.error("Update Expense Error:", error);
      setStatusMessage(error.message || "Failed to update expense record");
      setStatusType('error');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Delete the selected expense
   */
  const handleDelete = async () => {
    if (!selectedExpense) return;

    let confirmDelete = true;
    try {
      if (typeof window !== 'undefined' && window.confirm) {
        confirmDelete = window.confirm(`Permanently remove ${selectedExpense.category} record of ₹${selectedExpense.amount}?`);
      }
    } catch {
      confirmDelete = true;
    }

    if (!confirmDelete) return;

    setStatusMessage('');
    setStatusType('');
    setLoading(true);

    try {
      await deleteExpense(selectedExpense._id);
      
      if (setExpenses && expenses) {
        setExpenses((prev) => prev.filter((item) => item._id !== selectedExpense._id));
      }

      setStatusMessage("Expense record permanently removed.");
      setStatusType('success');
      setSelectedExpense(null);

      if (fetchExpenses) {
        fetchExpenses();
      }
    } catch (error) {
      console.error("Delete Expense Error:", error);
      setStatusMessage(error.message || "Failed to remove expense");
      setStatusType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#fafafa] py-10 px-6 sm:px-10">
      <Loading visible={loading} message="Committing ledger update..." />

      <div className="max-w-[1280px] mx-auto space-y-8">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <BackButton />
          <div className="flex items-center gap-3">
            <Link 
              to="/dashboard"
              className="text-xs uppercase tracking-wider font-mono text-slate-500 hover:text-black transition"
            >
              Dashboard →
            </Link>
          </div>
        </div>

        {/* Header Title */}
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold block mb-2 font-sans">
            Ledger Revision
          </span>
          <h1 
            className="text-4xl sm:text-5xl font-normal text-slate-900 tracking-tight"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            Modify <em>Expenditure</em>
          </h1>
          <p className="text-sm text-slate-600 mt-2 font-body">
            Calibrate transaction classifications, adjust benchmarked amounts, or update timestamps.
          </p>
        </div>

        {/* Status Notification */}
        {statusMessage && (
          <div className={`mx-auto max-w-xl rounded-full px-6 py-3 text-sm text-center font-medium border animate-fade-rise ${
            statusType === 'error' 
              ? 'bg-rose-50 border-rose-200 text-rose-700' 
              : 'bg-emerald-50 border-emerald-200 text-emerald-800'
          }`}>
            {statusMessage}
          </div>
        )}

        {/* Not Logged In Notice */}
        {!user && (
          <div className="max-w-xl mx-auto p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-800 text-xs text-center">
            Notice: You are currently browsing as a guest. <Link to="/login" className="underline font-semibold ml-1">Sign in</Link> to sync changes with your personal account.
          </div>
        )}

        {/* Main Content Layout */}
        {expenses.length === 0 ? (
          <div className="bg-white border border-slate-200/90 rounded-3xl p-16 text-center space-y-4 max-w-2xl mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-slate-400 text-2xl font-editorial">
              ∅
            </div>
            <h3 
              className="text-2xl font-normal text-slate-900"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              No transactions available to edit
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Your financial ledger does not contain any entries yet. Record your first expenditure to begin tracking.
            </p>
            <div className="pt-2">
              <Link to="/add-expense" className="btn-pill btn-pill-primary btn-pill-small">
                + Record New Expense
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT: Record Selector (List of expenses) */}
            <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 font-sans">
                  Select Ledger Entry ({expenses.length})
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Pick to Edit
                </span>
              </div>

              {/* Scrollable list of user expenses */}
              <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
                {expenses.map((item) => {
                  const isSelected = selectedExpense && selectedExpense._id === item._id;
                  return (
                    <button
                      key={item._id}
                      type="button"
                      onClick={() => handleSelectExpense(item)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between group ${
                        isSelected
                          ? 'border-slate-950 bg-slate-900 text-white shadow-md'
                          : 'border-slate-200/70 bg-slate-50/50 hover:bg-slate-100/70 hover:border-slate-300 text-slate-800'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            isSelected 
                              ? 'bg-white/20 text-white' 
                              : 'bg-white text-slate-700 border border-slate-200'
                          }`}>
                            {item.category}
                          </span>
                          <span className={`text-xs font-mono ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                            {new Date(item.date).toLocaleDateString(undefined, {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className={`text-xs truncate max-w-[180px] ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                          ID: #{String(item._id).slice(-6)}
                        </div>
                      </div>

                      <div className="text-right">
                        <div 
                          className={`text-xl font-normal leading-none ${isSelected ? 'text-white' : 'text-slate-900'}`}
                          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                        >
                          ₹ {Number(item.amount).toFixed(2)}
                        </div>
                        <span className={`text-[11px] font-mono mt-1 block ${isSelected ? 'text-slate-300' : 'text-slate-400 group-hover:text-slate-700'}`}>
                          {isSelected ? 'Active' : 'Edit →'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 text-center border-t border-slate-100">
                <Link to="/add-expense" className="text-xs font-medium text-slate-600 hover:text-black underline">
                  + Create another entry instead
                </Link>
              </div>
            </div>

            {/* RIGHT: Edit Form for Selected Expense */}
            <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-sm">
              {selectedExpense ? (
                <form onSubmit={handleUpdate} className="space-y-6">
                  
                  <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block">
                        Modifying Entry #{String(selectedExpense._id).slice(-6)}
                      </span>
                      <h3 
                        className="text-2xl font-normal text-slate-900 mt-1"
                        style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                      >
                        Edit Details
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={handleDelete}
                      className="text-xs text-rose-600 hover:text-rose-800 font-semibold px-3 py-1.5 rounded-full hover:bg-rose-50 transition border border-rose-200"
                      title="Delete this expense"
                    >
                      Delete Entry
                    </button>
                  </div>

                  {/* Category Selection */}
                  <div>
                    <label 
                      htmlFor="editCategory" 
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2 font-sans"
                    >
                      Expense Classification
                    </label>
                    <select
                      id="editCategory"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white transition"
                    >
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

                  {/* Amount Field with Currency Indicator */}
                  <div>
                    <label 
                      htmlFor="editAmount" 
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2 font-sans"
                    >
                      Transaction Amount (₹)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-sm">
                        ₹
                      </span>
                      <input 
                        type="number" 
                        id="editAmount"
                        step="0.01"
                        min="0"
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)} 
                        placeholder="0.00" 
                        required
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-8 pr-4 py-3 text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white transition"
                      />
                    </div>
                    {selectedExpense && Number(amount) !== Number(selectedExpense.amount) && (
                      <p className="text-xs text-slate-500 font-mono mt-1.5">
                        Original: ₹{Number(selectedExpense.amount).toFixed(2)} → Adjustment: {Number(amount) > Number(selectedExpense.amount) ? '+' : ''}₹{(Number(amount) - Number(selectedExpense.amount)).toFixed(2)}
                      </p>
                    )}
                  </div>

                  {/* Transaction Date */}
                  <div>
                    <label 
                      htmlFor="editDate" 
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2 font-sans"
                    >
                      Transaction Date
                    </label>
                    <input 
                      type="date" 
                      id="editDate"
                      value={date} 
                      required
                      onChange={(e) => setDate(e.target.value)} 
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white transition"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                    <button 
                      type="submit" 
                      className="w-full sm:flex-1 btn-pill btn-pill-primary py-3.5 text-sm font-medium shadow-sm transition"
                      style={{ backgroundColor: '#000000', color: '#ffffff', borderRadius: '9999px' }}
                    >
                      Save Ledger Changes
                    </button>
                    
                    <button 
                      type="button"
                      onClick={() => navigate('/dashboard')}
                      className="w-full sm:w-auto btn-pill btn-pill-outline py-3.5 px-6 text-sm font-medium"
                    >
                      Return to Dashboard
                    </button>
                  </div>

                </form>
              ) : (
                <div className="text-center py-16 text-slate-500 space-y-2">
                  <p className="text-sm">Select an expense item from the list on the left to edit its details.</p>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default EditExpense;
