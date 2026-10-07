import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import BackButton from '../components/BackButton';

const FilterBar = () => {
  const { expenses } = useContext(UserContext) || { expenses: [] };

  let foodAmount = 0;
  let travelAmount = 0;
  let shoppingAmount = 0;
  let entertainmentAmount = 0;
  let healthAmount = 0;
  let billsAmount = 0;
  let otherAmount = 0;
  let educationAmount = 0;

  expenses.forEach((expense) => {
    const val = Number(expense.amount) || 0;
    if (expense.category === "Food") foodAmount += val;
    else if (expense.category === "Travel") travelAmount += val;
    else if (expense.category === "Bills") billsAmount += val;
    else if (expense.category === "Shopping") shoppingAmount += val;
    else if (expense.category === "Entertainment") entertainmentAmount += val;
    else if (expense.category === "Health") healthAmount += val;
    else if (expense.category === "Other") otherAmount += val;
    else if (expense.category === "Education") educationAmount += val;
  });

  const totalAmount = otherAmount + foodAmount + travelAmount + shoppingAmount + entertainmentAmount + healthAmount + billsAmount + educationAmount;

  const categories = [
    { name: "Food", amount: foodAmount },
    { name: "Travel", amount: travelAmount },
    { name: "Shopping", amount: shoppingAmount },
    { name: "Bills", amount: billsAmount },
    { name: "Entertainment", amount: entertainmentAmount },
    { name: "Health", amount: healthAmount },
    { name: "Education", amount: educationAmount },
    { name: "Other", amount: otherAmount }
  ];

  return (
    <div className="w-full min-h-screen bg-[#fafafa] py-10 px-6 sm:px-10">
      <div className="max-w-[1280px] mx-auto space-y-8">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <BackButton />
        </div>

        <div className="border-b border-slate-200 pb-6">
          <span className="text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold block mb-2 font-sans">
            Distribution Analytics
          </span>
          <h1 
            className="text-4xl sm:text-5xl font-normal text-slate-900 tracking-tight"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            Capital Allocation <em>Summary</em>
          </h1>
          <p className="text-sm text-slate-600 mt-2 font-body">
            Detailed breakdown of spending across all active categories.
          </p>
        </div>

        {expenses.length === 0 ? (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-16 text-center space-y-4 shadow-sm">
            <h2 
              className="text-3xl font-normal text-slate-900"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              No Expenses Recorded
            </h2>
            <p className="text-sm text-slate-500">
              Add expense items to inspect category breakdown metrics.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            
            {/* Grand Total Hero Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
              <div>
                <span className="text-xs tracking-[0.2em] uppercase text-slate-400 font-semibold block mb-1">
                  Cumulative Expenditure
                </span>
                <div 
                  className="text-5xl sm:text-6xl font-normal text-white"
                  style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                >
                  ₹ {totalAmount.toFixed(2)}
                </div>
              </div>
              <div className="text-right sm:border-l sm:border-slate-800 sm:pl-8 text-xs text-slate-400 font-mono">
                Across {expenses.length} Total Recorded Entries
              </div>
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((cat) => {
                const percentage = totalAmount > 0 ? ((cat.amount / totalAmount) * 100).toFixed(1) : 0;
                return (
                  <div 
                    key={cat.name}
                    className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                          {cat.name}
                        </span>
                        <span className="text-xs font-mono text-slate-600">
                          {percentage}%
                        </span>
                      </div>
                      <div 
                        className="text-3xl font-normal text-slate-900 my-2"
                        style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                      >
                        ₹ {cat.amount.toFixed(2)}
                      </div>
                    </div>

                    {/* Minimal Progress Bar */}
                    <div className="w-full bg-slate-100 rounded-full h-1.5 mt-4 overflow-hidden">
                      <div 
                        className="bg-slate-900 h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(Number(percentage), 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default FilterBar;