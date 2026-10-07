import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { Navigate, Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Loading from "../components/Loading";
import { deleteExpense } from "../services/expenseService";

function ExpenseCard({ mode }) {
  const { expenses, setExpenses, fetchExpenses, user } = useContext(UserContext) || { expenses: [], setExpenses: () => {}, fetchExpenses: () => {}, user: null };
  const [filteredExpenses, setFilteredExpenses] = useState(null);
  const [activeFilter, setActiveFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showTotal, setShowTotal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('');

  /**
   * Print log for editing expense
   * @param {string} id
   */
  const handleEdit = (id) => {
    console.log(`Edit expense with id: ${id}`);
    setStatusMessage(`Editing mode active for item: ${id}`);
    setStatusType('success');
  };

  /**
   * Delete expense by ID and reload list
   * @param {string} id
   */
  const handleDelete = async (id) => {
    let confirmDelete = true;
    try {
      if (typeof window !== 'undefined' && window.confirm) {
        confirmDelete = window.confirm("Are you sure you want to delete this expense?");
      }
    } catch {
      confirmDelete = true;
    }
    if (!confirmDelete) return;

    setStatusMessage('');
    setStatusType('');
    setLoading(true);
    try {
      await deleteExpense(id);
      setStatusMessage("Expense deleted successfully!");
      setStatusType('success');
      fetchExpenses();
    } catch (error) {
      console.error("Connection Error:", error);
      setStatusMessage(error.message || "Failed to delete expense");
      setStatusType('error');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Filter expenses list by category
   * @param {string} val
   */
  const handleFilterByCategory = (val) => {
    if (val === "" || val === "All") {
      setFilteredExpenses(null);
      setSelectedCategory("");
      setActiveFilter(false);
    } else if (selectedCategory === val) {
      setFilteredExpenses(null);
      setSelectedCategory("");
      setActiveFilter(false);
    } else {
      setSelectedCategory(val);
      const filtered = expenses.filter((expense) => expense.category === val);
      setFilteredExpenses(filtered);
      setActiveFilter(true);
    }
  };

  const displayExpenses = filteredExpenses !== null ? filteredExpenses : expenses;
  const totalAmount = displayExpenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  const getModeTitle = () => {
    switch (mode) {
      case "dashboard":
        return "Financial Portfolio";
      case "view":
        return "Curated Expenses";
      case "edit":
        return "Modify Expenses";
      case "delete":
        return "Remove Expenses";
      default:
        return "Overview";
    }
  };

  return (
    <div className="relative text-slate-900 w-full min-h-screen bg-[#fafafa] py-10 px-6 sm:px-10">
      <Loading visible={loading} message="Updating expenses..." />

      {/* Main Container */}
      <div className="max-w-[1280px] mx-auto space-y-8">
        
        {/* Status Message Notification */}
        {statusMessage && (
          <div className={`mx-auto max-w-2xl rounded-full px-6 py-3 text-sm text-center font-medium border ${
            statusType === 'error' 
              ? 'bg-rose-50 border-rose-200 text-rose-700' 
              : 'bg-emerald-50 border-emerald-200 text-emerald-800'
          }`}>
            {statusMessage}
          </div>
        )}

        {/* Header Title & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-8 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold block mb-2 font-sans">
              Trackify Ledger
            </span>
            <h1 
              className="text-4xl sm:text-5xl font-normal text-slate-900 tracking-tight"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              {getModeTitle()}
            </h1>
            <p className="text-sm text-slate-600 mt-2 font-body max-w-lg">
              {user ? `Showing records for ${user.name}` : "Connect your account to save personal finances."}
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex items-center gap-6">
            <div className="bg-white border border-slate-200/80 rounded-2xl px-6 py-4 shadow-sm text-right">
              <span className="text-xs text-slate-500 uppercase tracking-wider block font-medium">
                {selectedCategory ? `${selectedCategory} Total` : "Total Outflow"}
              </span>
              <span 
                className="text-2xl sm:text-3xl font-normal text-slate-900"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                ₹ {totalAmount.toFixed(2)}
              </span>
            </div>
            <Link
              to="/add-expense"
              className="btn-pill btn-pill-primary btn-pill-small shadow-sm hidden sm:inline-flex"
            >
              + Add Record
            </Link>
          </div>
        </div>

        {/* Filter Controls Bar */}
        {(mode === "view" || mode === "dashboard") && (
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm">
            
            <div className="flex flex-wrap items-center gap-3">
              <Dropdown onSelect={(val) => handleFilterByCategory(val)}>
                <Dropdown.Toggle
                  variant="outline-secondary"
                  id="dropdown-category-filter"
                  className="btn-pill btn-pill-outline btn-pill-small !border-slate-300 text-slate-800 flex items-center gap-2"
                >
                  {activeFilter ? `Category: ${selectedCategory}` : "Filter by Category"}
                </Dropdown.Toggle>
                <Dropdown.Menu className="border border-slate-200 shadow-xl rounded-xl py-2 min-w-[200px] mt-2">
                  <Dropdown.Item eventKey="All" className="text-sm py-2 px-4 font-medium">
                    Show All (Reset)
                  </Dropdown.Item>
                  <Dropdown.Divider className="my-1 border-slate-100" />
                  {['Food', 'Travel', 'Shopping', 'Entertainment', 'Health', 'Bills', 'Education', 'Other'].map(cat => (
                    <Dropdown.Item key={cat} eventKey={cat} className="text-sm py-2 px-4">
                      {cat}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>

              {activeFilter && (
                <button
                  onClick={() => handleFilterByCategory("All")}
                  className="text-xs text-slate-500 hover:text-black underline font-medium"
                >
                  Reset filter
                </button>
              )}
            </div>

            <button
              onClick={() => setShowTotal(!showTotal)}
              className="btn-pill btn-pill-outline btn-pill-small"
            >
              Category Distribution
            </button>
          </div>
        )}

        {showTotal === true && <Navigate to="/show-per-category" />}

        {/* Expenses Grid */}
        {expenses.length === 0 ? (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-16 text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-slate-400 text-2xl font-editorial">
              ∅
            </div>
            <h3 
              className="text-2xl font-normal text-slate-900"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              No expenses recorded yet
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Your financial ledger is currently clear. Add your first expenditure to begin tracking your spending behavior.
            </p>
            <div className="pt-2">
              <Link to="/add-expense" className="btn-pill btn-pill-primary btn-pill-small">
                Add First Expense
              </Link>
            </div>
          </div>
        ) : displayExpenses.length === 0 ? (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-12 text-center space-y-3">
            <h3 className="text-xl font-normal text-slate-900 font-editorial">
              No expenses match category "{selectedCategory}"
            </h3>
            <button
              onClick={() => handleFilterByCategory("All")}
              className="btn-pill btn-pill-outline btn-pill-small"
            >
              Clear Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayExpenses.map((expense) => (
              <div
                key={expense._id}
                className="group bg-white border border-slate-200/90 hover:border-slate-400/80 rounded-2xl p-6 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  {/* Category tag & Date */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                      {expense.category}
                    </span>
                    <span className="text-xs text-slate-600 font-mono">
                      {new Date(expense.date).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>

                  {/* Expense Amount */}
                  <div className="mt-2 mb-4">
                    <span className="text-xs text-slate-600 uppercase tracking-wider block font-medium">Amount</span>
                    <div 
                      className="text-3xl font-normal text-slate-900"
                      style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                    >
                      ₹ {Number(expense.amount).toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Card Actions for Edit or Delete mode */}
                {(mode === "edit" || mode === "delete") && (
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2 mt-2">
                    {mode === "edit" && (
                      <button
                        onClick={() => handleEdit(expense._id)}
                        className="btn-pill btn-pill-outline text-xs px-3 py-1.5 hover:bg-slate-100 transition"
                      >
                        Edit
                      </button>
                    )}
                    {mode === "delete" && (
                      <button
                        onClick={() => handleDelete(expense._id)}
                        className="btn-pill text-xs px-3 py-1.5 bg-rose-600 text-white hover:bg-rose-700 transition"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default ExpenseCard;
