import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Try to import config, fallback to environment variable
let ADMIN_PASSWORD;
try {
  const config = await import('./config.js');
  ADMIN_PASSWORD = config.ADMIN_PASSWORD;
} catch {
  ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
// Use persistent disk in production, local directory in development
const DATA_FILE = process.env.NODE_ENV === 'production' 
  ? '/data/data.json' 
  : path.join(__dirname, 'data.json');

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

const verifyPassword = (req, res, next) => {
  const password = req.headers['x-admin-password'];
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized: Invalid password' });
  }
  next();
};

const initializeDataFile = async () => {
  try {
    await fs.access(DATA_FILE);
  } catch {
    const initialData = {
      contributions: [],
      promises: [],
      expenses: []
    };
    await fs.writeFile(DATA_FILE, JSON.stringify(initialData, null, 2));
  }
};

const readData = async () => {
  const data = await fs.readFile(DATA_FILE, 'utf-8');
  return JSON.parse(data);
};

const writeData = async (data) => {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
};

app.get('/api/data', async (req, res) => {
  try {
    const data = await readData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read data' });
  }
});

app.post('/api/contributions', async (req, res) => {
  try {
    const data = await readData();
    const newContribution = {
      id: Date.now().toString(),
      ...req.body
    };
    data.contributions.push(newContribution);
    await writeData(data);
    res.json(newContribution);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add contribution' });
  }
});

app.put('/api/contributions/:id', verifyPassword, async (req, res) => {
  try {
    const data = await readData();
    const index = data.contributions.findIndex(c => c.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Contribution not found' });
    }
    data.contributions[index] = { ...data.contributions[index], ...req.body, id: req.params.id };
    await writeData(data);
    res.json(data.contributions[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update contribution' });
  }
});

app.delete('/api/contributions/:id', verifyPassword, async (req, res) => {
  try {
    const data = await readData();
    data.contributions = data.contributions.filter(c => c.id !== req.params.id);
    await writeData(data);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contribution' });
  }
});

app.post('/api/promises', async (req, res) => {
  try {
    const data = await readData();
    const newPromise = {
      id: Date.now().toString(),
      ...req.body
    };
    data.promises.push(newPromise);
    await writeData(data);
    res.json(newPromise);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add promise' });
  }
});

app.put('/api/promises/:id', verifyPassword, async (req, res) => {
  try {
    const data = await readData();
    const index = data.promises.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Promise not found' });
    }
    data.promises[index] = { ...data.promises[index], ...req.body, id: req.params.id };
    await writeData(data);
    res.json(data.promises[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update promise' });
  }
});

app.delete('/api/promises/:id', verifyPassword, async (req, res) => {
  try {
    const data = await readData();
    data.promises = data.promises.filter(p => p.id !== req.params.id);
    await writeData(data);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete promise' });
  }
});

app.post('/api/expenses', async (req, res) => {
  try {
    const data = await readData();
    const newExpense = {
      id: Date.now().toString(),
      ...req.body
    };
    data.expenses.push(newExpense);
    await writeData(data);
    res.json(newExpense);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add expense' });
  }
});

app.put('/api/expenses/:id', verifyPassword, async (req, res) => {
  try {
    const data = await readData();
    const index = data.expenses.findIndex(e => e.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    data.expenses[index] = { ...data.expenses[index], ...req.body, id: req.params.id };
    await writeData(data);
    res.json(data.expenses[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update expense' });
  }
});

app.delete('/api/expenses/:id', verifyPassword, async (req, res) => {
  try {
    const data = await readData();
    data.expenses = data.expenses.filter(e => e.id !== req.params.id);
    await writeData(data);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete expense' });
  }
});

initializeDataFile().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
