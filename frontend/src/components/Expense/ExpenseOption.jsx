import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';

function BasicExample() {

  
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" 
        id="dropdown-basic"
       style={{backgroundColor: '#4CAF50', border: 'none', fontSize: '20px', padding: '10px 20px', borderRadius: '5px', fontWeight: '600', cursor: 'pointer', marginLeft: '10px ', hover: { backgroundColor: '#388E3C' }}}>
        Expenses
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as={Link}  to="/add-expense">Add Expense</Dropdown.Item>
        <Dropdown.Item as={Link} to="/view-expense">View Expense</Dropdown.Item>
        <Dropdown.Item as={Link} to="/edit-expense">Edit Expense</Dropdown.Item>
        <Dropdown.Item as={Link} to="/delete-expense">Delete Expense</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default BasicExample;
