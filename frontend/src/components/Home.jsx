import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://plus.unsplash.com/premium_photo-1661677860371-3343b3d73a4f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGV4cGVuc2V8ZW58MHx8MHx8fDA%3D" />
      <Card.Body>
        <Card.Title>Track Your Expenses</Card.Title>
        <Card.Text>
          Over 90 % of people fail to track their expenses. Start tracking your expenses today and take control of your finances.

        </Card.Text>
        <Button className="btn btn-primary" ><Link to='/login' className="text-white text-decoration-none">Get Started</Link></Button>
      </Card.Body>
    </Card>
  );
}

export default Home;