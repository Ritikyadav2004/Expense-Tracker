# Expense Tracker

This is a simple full-stack Expense Tracker application where users can register, log in, and manage their daily expenses. Each user can only see their own dashboard and

## Features
- User registration and login (saves session in localStorage)
- Add new expenses with amount, category, and date
- Filter expenses by category on the dashboard
- View total spent per category in a summary page
- Clean folder structure and API service separation

## Tech Stack
- **Frontend:** React (Vite), Context API, React-Bootstrap, CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)

---

## How to Run the Project Locally

### 1. Prerequisite
Make sure you have MongoDB installed and running on your local machine.
The default connection string used in the code is: `mongodb://localhost:27017/expenseTracker`

### 2. Start the Backend Server
Go to the `backend` folder, install the node packages, and start the server:
```bash
cd backend
npm install
node server.js
```
The backend server will start running on port `8000`.

### 3. Start the Frontend Application
Go to the `frontend` folder, install the packages, and run the development server:
```bash
cd frontend
npm install
npm run dev
```
Open your browser and go to the local host URL shown in your terminal (usually `http://localhost:5173`).

---

## Folder Structure Notes
- All API calls are kept separate inside `src/services/expenseService.js`.
- Reusable UI elements (like buttons, navigation bar) are in `src/components/`.
- Page views (like Login, Signup, Dashboard) are in `src/pages/`.

## How to use this Web App After Running
- Sign up with your dummy account now hard/strcit checking
- Login with your same credentials
- Click on Expense and Strat adding up your expenses


## Functionality
- Add Expense Under Various categories 
- See total expense and total expense/Category
- Delete any Expense
- Edit option will be Updated Soon

## Future Improvement
- JWT authentication
- Ai Summary Provider
- Category in which Spent a lot
- 

