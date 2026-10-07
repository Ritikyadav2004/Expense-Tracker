import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/expenseTracker';

let isMongoConnected = false;
mongoose.set('bufferCommands', false);
mongoose.connect(mongoURI)
  .then(() => {
    isMongoConnected = true;
    console.log("MongoDB Connected Successfully!");
  })
  .catch((err) => {
    isMongoConnected = false;
    console.warn("DB Connection Warning (falling back to in-memory store):", err.message);
  });

// In-memory fallback data store for offline database runtime
interface UserRecord {
  id: string;
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

interface ExpenseRecord {
  id: string;
  _id: string;
  category: string;
  amount: number;
  date: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}

const memoryUsers: UserRecord[] = [
  {
    id: "user-demo-1",
    _id: "user-demo-1",
    name: "Ritik Yadav",
    email: "ritik@example.com",
    password: "password123",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const memoryExpenses: ExpenseRecord[] = [
  {
    id: "exp-1",
    _id: "exp-1",
    category: "Food",
    amount: 450,
    date: new Date(Date.now() - 86400000 * 1).toISOString(),
    user: "user-demo-1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "exp-2",
    _id: "exp-2",
    category: "Travel",
    amount: 1200,
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    user: "user-demo-1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "exp-3",
    _id: "exp-3",
    category: "Shopping",
    amount: 2800,
    date: new Date(Date.now() - 86400000 * 3).toISOString(),
    user: "user-demo-1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "exp-4",
    _id: "exp-4",
    category: "Bills",
    amount: 950,
    date: new Date(Date.now() - 86400000 * 4).toISOString(),
    user: "user-demo-1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "exp-5",
    _id: "exp-5",
    category: "Entertainment",
    amount: 650,
    date: new Date(Date.now() - 86400000 * 5).toISOString(),
    user: "user-demo-1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Helper to get Mongoose models conditionally
let UserModel: any = null;
let ExpenseModel: any = null;
try {
  const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 }
  }, { timestamps: true });

  const expenseSchema = new mongoose.Schema({
    category: { type: String, required: true, enum: ['Food', 'Travel', 'Shopping', 'Entertainment', 'Health', 'Bills', 'Education', 'Other'], trim: true },
    amount: { type: Number, required: true, min: 0 },
    date: { type: Date, required: true, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  }, { timestamps: true });

  UserModel = mongoose.models.User || mongoose.model('User', userSchema);
  ExpenseModel = mongoose.models.Expense || mongoose.model('Expense', expenseSchema);
} catch (e) {
  console.warn("Schema initialization warning:", e);
}

/**
 * @route POST /api/register
 */
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required!" });
    }

    if (isMongoConnected && UserModel) {
      const userExists = await UserModel.findOne({ email });
      if (userExists) {
        return res.status(400).json({ error: "Email is already registered!" });
      }
      const newUser = new UserModel({ name, email, password });
      await newUser.save();
      return res.status(201).json({ message: "Registration successful!" });
    }

    // In-memory fallback
    const existing = memoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(400).json({ error: "Email is already registered!" });
    }

    const newId = `user-${Date.now()}`;
    const newUser: UserRecord = {
      id: newId,
      _id: newId,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    memoryUsers.push(newUser);
    return res.status(201).json({ message: "Registration successful!" });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors || {}).map((err: any) => err.message);
      return res.status(400).json({ error: messages.join(', ') });
    }
    return res.status(500).json({ error: "Server Error during registration!" });
  }
});

/**
 * @route POST /api/login
 */
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required!" });
    }

    if (isMongoConnected && UserModel) {
      const user = await UserModel.findOne({ email: email.toLowerCase() });
      if (!user) {
        return res.status(400).json({ error: "User does not exist!" });
      }
      if (user.password !== password) {
        return res.status(400).json({ error: "Invalid password!" });
      }
      return res.status(200).json({
        message: "Login successful!",
        user: { id: user._id.toString(), name: user.name, email: user.email }
      });
    }

    // In-memory fallback
    const user = memoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(400).json({ error: "User does not exist!" });
    }
    if (user.password !== password) {
      return res.status(400).json({ error: "Invalid password!" });
    }
    return res.status(200).json({
      message: "Login successful!",
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    return res.status(500).json({ error: "Server Error during login!" });
  }
});

/**
 * @route GET /api/expenses
 */
app.get('/api/expenses', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required!" });
    }

    if (isMongoConnected && ExpenseModel) {
      const expenses = await ExpenseModel.find({ user: userId }).sort({ date: -1 });
      return res.status(200).json(expenses);
    }

    // In-memory fallback
    const userExpenses = memoryExpenses
      .filter(e => String(e.user) === String(userId))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return res.status(200).json(userExpenses);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch expenses!" });
  }
});

/**
 * @route POST /api/expenses
 */
app.post('/api/expenses', async (req, res) => {
  try {
    const { category, amount, date, userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required to add expense!" });
    }

    if (isMongoConnected && ExpenseModel) {
      const newExpense = new ExpenseModel({ category, amount, date, user: userId });
      await newExpense.save();
      return res.status(201).json(newExpense);
    }

    // In-memory fallback
    const newId = `exp-${Date.now()}`;
    const newExpense: ExpenseRecord = {
      id: newId,
      _id: newId,
      category,
      amount: Number(amount),
      date: date ? new Date(date).toISOString() : new Date().toISOString(),
      user: String(userId),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    memoryExpenses.push(newExpense);
    return res.status(201).json(newExpense);
  } catch (error) {
    return res.status(500).json({ error: "Failed to add expense!" });
  }
});

/**
 * @route DELETE /api/expenses/:id
 */
app.delete('/api/expenses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (isMongoConnected && ExpenseModel) {
      await ExpenseModel.findByIdAndDelete(id);
      return res.status(200).json({ message: "Expense deleted successfully" });
    }

    // In-memory fallback
    const idx = memoryExpenses.findIndex(e => e._id === id || e.id === id);
    if (idx !== -1) {
      memoryExpenses.splice(idx, 1);
    }
    return res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete expense!" });
  }
});

// Production static file serving or Dev Vite middleware
const isProd = process.env.NODE_ENV === 'production';
if (isProd) {
  const distDir = path.resolve(__dirname, 'dist');
  app.use(express.static(distDir));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(distDir, 'index.html'));
  });
} else {
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'spa'
  });
  app.use(vite.middlewares);
}

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on http://0.0.0.0:${port}`);
});
