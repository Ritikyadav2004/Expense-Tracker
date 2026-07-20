import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Footer() {
  return (
    <Card className="text-center">
      <Card.Header>Featured</Card.Header>
      <Card.Body>
        <Card.Title>Trackify</Card.Title>
        <Card.Text>
          Track Your Daily Expense Here
        </Card.Text>
        <Button onClick={() => window.open('https://github.com/Ritikyadav2004/Expense-Tracker/', '_blank')} variant="primary">
          View Repo
        </Button>
      </Card.Body>
      <Card.Footer className="text-muted">2026 Trackify All right reserved</Card.Footer>
    </Card>
  );
}

export default Footer;