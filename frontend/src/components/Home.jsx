import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function Home() {
   return (
    <div className="w-screen h-screen flex gap-10 p-10 bg-slate-200">
      
      {/* Left side card*/}
      <div className="w-1/2 flex justify-center items-start">
        <div className="bg-gray-200 rounded-lg shadow-md p-4">
          <img
            className="rounded-md"
            src="https://plus.unsplash.com/premium_photo-1661677860371-3343b3d73a4f?w=600&auto=format&fit=crop&q=60"
            alt="Expense"
          />
        </div>
      </div>

      {/* right side text content */}
      <div className="w-1/2 space-y-4">
        <h1 className="text-2xl font-bold text-center">
          Track Your Expense
        </h1>
        <p className='text-1xl  font-medium'>
          Tracking expenses transforms financial anxiety into control by replacing guesswork with data.
        </p>

        <h2 className="text-xl font-semibold">Why Expense Tracking is Needed?</h2>
        <br />
        <h3 className="font-semibold">1. Financial Awareness</h3>
        <ul className="list-disc list-inside">
          <li>Trackers: Know exactly where every rupee goes.</li>
          <li>Non-Trackers: Guess their balances and wonder where money went.</li>
        </ul>

        <h3 className="font-semibold">2. Spending Behavior</h3>
        <ul className="list-disc list-inside">
          <li>Trackers: Catch hidden leaks like unused subscriptions early.</li>
          <li>Non-Trackers: Suffer from impulse buying and frequent overspending.</li>
        </ul>

        <h3 className="font-semibold">3. Saving & Investing</h3>
        <ul className="list-disc list-inside">
          <li>Trackers: Save intentionally first, then spend the rest.</li>
          <li>Non-Trackers: Save only what is left at month-end.</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;