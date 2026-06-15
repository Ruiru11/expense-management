import express from 'express';
import cors from 'cors';
import { ObjectId } from 'mongodb';
import { connectDB, getDB } from './db.js';

// Try to import config, fallback to environment variable
let ADMIN_PASSWORD;
try {
  const config = await import('./config.js');
  ADMIN_PASSWORD = config.ADMIN_PASSWORD;
} catch {
  ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
}

const app = express();
const PORT = process.env.PORT || 3001;

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

// Get all data
app.get('/api/data', async (req, res) => {
  try {
    const db = await getDB();
    const contributions = await db.collection('contributions').find().toArray();
    const promises = await db.collection('promises').find().toArray();
    const expenses = await db.collection('expenses').find().toArray();
    const budgetItems = await db.collection('budgetItems').find().toArray();
    
    // Get budget (single document)
    let budget = await db.collection('budget').findOne({});
    if (!budget) {
      // Initialize with default budget if not exists
      budget = { amount: 330766 };
      await db.collection('budget').insertOne(budget);
    }
    
    res.json({
      contributions: contributions.map(c => ({ ...c, id: c._id.toString(), _id: undefined })),
      promises: promises.map(p => ({ ...p, id: p._id.toString(), _id: undefined })),
      expenses: expenses.map(e => ({ ...e, id: e._id.toString(), _id: undefined })),
      budgetItems: budgetItems.map(b => ({ ...b, id: b._id.toString(), _id: undefined })),
      budget: { amount: budget.amount }
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to read data' });
  }
});

// Contributions endpoints
app.post('/api/contributions', async (req, res) => {
  try {
    const db = await getDB();
    const result = await db.collection('contributions').insertOne(req.body);
    const newContribution = { ...req.body, id: result.insertedId.toString() };
    res.json(newContribution);
  } catch (error) {
    console.error('Error adding contribution:', error);
    res.status(500).json({ error: 'Failed to add contribution' });
  }
});

app.put('/api/contributions/:id', verifyPassword, async (req, res) => {
  try {
    const db = await getDB();
    const { id, ...updateData } = req.body;
    const result = await db.collection('contributions').findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: updateData },
      { returnDocument: 'after' }
    );
    
    if (!result) {
      return res.status(404).json({ error: 'Contribution not found' });
    }
    
    res.json({ ...result, id: result._id.toString(), _id: undefined });
  } catch (error) {
    console.error('Error updating contribution:', error);
    res.status(500).json({ error: 'Failed to update contribution' });
  }
});

app.delete('/api/contributions/:id', verifyPassword, async (req, res) => {
  try {
    const db = await getDB();
    await db.collection('contributions').deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting contribution:', error);
    res.status(500).json({ error: 'Failed to delete contribution' });
  }
});

// Promises endpoints
app.post('/api/promises', async (req, res) => {
  try {
    const db = await getDB();
    const result = await db.collection('promises').insertOne(req.body);
    const newPromise = { ...req.body, id: result.insertedId.toString() };
    res.json(newPromise);
  } catch (error) {
    console.error('Error adding promise:', error);
    res.status(500).json({ error: 'Failed to add promise' });
  }
});

app.put('/api/promises/:id', verifyPassword, async (req, res) => {
  try {
    const db = await getDB();
    const { id, ...updateData } = req.body;
    const result = await db.collection('promises').findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: updateData },
      { returnDocument: 'after' }
    );
    
    if (!result) {
      return res.status(404).json({ error: 'Promise not found' });
    }
    
    res.json({ ...result, id: result._id.toString(), _id: undefined });
  } catch (error) {
    console.error('Error updating promise:', error);
    res.status(500).json({ error: 'Failed to update promise' });
  }
});

app.delete('/api/promises/:id', verifyPassword, async (req, res) => {
  try {
    const db = await getDB();
    await db.collection('promises').deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting promise:', error);
    res.status(500).json({ error: 'Failed to delete promise' });
  }
});

// Expenses endpoints
app.post('/api/expenses', async (req, res) => {
  try {
    const db = await getDB();
    const result = await db.collection('expenses').insertOne(req.body);
    const newExpense = { ...req.body, id: result.insertedId.toString() };
    res.json(newExpense);
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({ error: 'Failed to add expense' });
  }
});

app.put('/api/expenses/:id', verifyPassword, async (req, res) => {
  try {
    const db = await getDB();
    const { id, ...updateData } = req.body;
    const result = await db.collection('expenses').findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: updateData },
      { returnDocument: 'after' }
    );
    
    if (!result) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    
    res.json({ ...result, id: result._id.toString(), _id: undefined });
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).json({ error: 'Failed to update expense' });
  }
});

app.delete('/api/expenses/:id', verifyPassword, async (req, res) => {
  try {
    const db = await getDB();
    await db.collection('expenses').deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ error: 'Failed to delete expense' });
  }
});

// Budget endpoint
app.put('/api/budget', verifyPassword, async (req, res) => {
  try {
    const db = await getDB();
    const { amount } = req.body;
    
    const result = await db.collection('budget').findOneAndUpdate(
      {},
      { $set: { amount } },
      { upsert: true, returnDocument: 'after' }
    );
    
    res.json({ amount: result.amount || amount });
  } catch (error) {
    console.error('Error updating budget:', error);
    res.status(500).json({ error: 'Failed to update budget' });
  }
});

// Budget Items endpoints
app.post('/api/budget-items', async (req, res) => {
  try {
    const db = await getDB();
    const result = await db.collection('budgetItems').insertOne(req.body);
    const newBudgetItem = { ...req.body, id: result.insertedId.toString() };
    res.json(newBudgetItem);
  } catch (error) {
    console.error('Error adding budget item:', error);
    res.status(500).json({ error: 'Failed to add budget item' });
  }
});

app.put('/api/budget-items/:id', verifyPassword, async (req, res) => {
  try {
    const db = await getDB();
    const { id, ...updateData } = req.body;
    const result = await db.collection('budgetItems').findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: updateData },
      { returnDocument: 'after' }
    );
    
    if (!result) {
      return res.status(404).json({ error: 'Budget item not found' });
    }
    
    res.json({ ...result, id: result._id.toString(), _id: undefined });
  } catch (error) {
    console.error('Error updating budget item:', error);
    res.status(500).json({ error: 'Failed to update budget item' });
  }
});

app.delete('/api/budget-items/:id', verifyPassword, async (req, res) => {
  try {
    const db = await getDB();
    await db.collection('budgetItems').deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting budget item:', error);
    res.status(500).json({ error: 'Failed to delete budget item' });
  }
});

// Connect to MongoDB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`✅ MongoDB connected`);
  });
}).catch(error => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});
