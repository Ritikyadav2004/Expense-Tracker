import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';

function ExpenseOption() {
  return (
    <Dropdown className="inline-block">
      <Dropdown.Toggle 
        variant="link"
        id="dropdown-expenses"
        className="text-slate-800 hover:text-black font-medium text-sm no-underline p-0 border-0 flex items-center gap-1.5 focus:shadow-none"
        style={{ textDecoration: 'none', color: '#0f172a', fontWeight: 500, fontSize: '14px' }}
      >
        <span>Expenses</span>
      </Dropdown.Toggle>

      <Dropdown.Menu className="border border-slate-200/80 shadow-lg rounded-xl py-2 min-w-[180px] mt-2 backdrop-blur-sm bg-white/95">
        <Dropdown.Item as={Link} to="/add-expense" className="text-sm px-4 py-2 hover:bg-slate-50 text-slate-800 font-medium">
          Add Expense
        </Dropdown.Item>
        <Dropdown.Item as={Link} to="/view-expense" className="text-sm px-4 py-2 hover:bg-slate-50 text-slate-800 font-medium">
          View Expenses
        </Dropdown.Item>
        <Dropdown.Item as={Link} to="/edit-expense" className="text-sm px-4 py-2 hover:bg-slate-50 text-slate-800 font-medium">
          Edit Expense
        </Dropdown.Item>
        <Dropdown.Item as={Link} to="/delete-expense" className="text-sm px-4 py-2 hover:bg-slate-50 text-slate-800 font-medium">
          Delete Expense
        </Dropdown.Item>
        <Dropdown.Divider className="my-1 border-slate-100" />
        <Dropdown.Item as={Link} to="/show-per-category" className="text-sm px-4 py-2 hover:bg-slate-50 text-slate-800 font-medium">
          Category Summary
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ExpenseOption;
