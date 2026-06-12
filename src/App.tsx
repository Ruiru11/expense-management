import { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { Contribution, Promise, Expense } from './types';
import ContributionForm from './components/ContributionForm';
import PromiseForm from './components/PromiseForm';
import ExpenseForm from './components/ExpenseForm';
import TransactionList from './components/TransactionList';
import Summary from './components/Summary';
import PasswordModal from './components/PasswordModal';
import EditModal from './components/EditModal';
import { api } from './api';

function App() {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [promises, setPromises] = useState<Promise[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [activeTab, setActiveTab] = useState<'contributions' | 'promises' | 'expenses'>('contributions');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [passwordModal, setPasswordModal] = useState<{
    isOpen: boolean;
    type: 'contribution' | 'promise' | 'expense' | null;
    id: string | null;
    itemName: string;
  }>({ isOpen: false, type: null, id: null, itemName: '' });
  const [editModal, setEditModal] = useState<{
    isOpen: boolean;
    type: 'contribution' | 'promise' | 'expense' | null;
    item: Contribution | Promise | Expense | null;
  }>({ isOpen: false, type: null, item: null });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await api.fetchData();
      setContributions(data.contributions);
      setPromises(data.promises);
      setExpenses(data.expenses);
      setError(null);
    } catch (err) {
      setError('Failed to load data. The backend server might be waking up (free tier). Please wait 30 seconds and refresh the page.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addContribution = async (contribution: Omit<Contribution, 'id'>) => {
    try {
      const newContribution = await api.addContribution(contribution);
      setContributions([...contributions, newContribution]);
    } catch (err) {
      setError('Failed to add contribution');
      console.error(err);
    }
  };

  const addPromise = async (promise: Omit<Promise, 'id'>) => {
    try {
      const newPromise = await api.addPromise(promise);
      setPromises([...promises, newPromise]);
    } catch (err) {
      setError('Failed to add promise');
      console.error(err);
    }
  };

  const addExpense = async (expense: Omit<Expense, 'id'>) => {
    try {
      const newExpense = await api.addExpense(expense);
      setExpenses([...expenses, newExpense]);
    } catch (err) {
      setError('Failed to add expense');
      console.error(err);
    }
  };

  const deleteContribution = (id: string) => {
    const item = contributions.find(c => c.id === id);
    setPasswordModal({
      isOpen: true,
      type: 'contribution',
      id,
      itemName: item?.name || 'this contribution'
    });
  };

  const deletePromise = (id: string) => {
    const item = promises.find(p => p.id === id);
    setPasswordModal({
      isOpen: true,
      type: 'promise',
      id,
      itemName: item?.name || 'this promise'
    });
  };

  const deleteExpense = (id: string) => {
    const item = expenses.find(e => e.id === id);
    setPasswordModal({
      isOpen: true,
      type: 'expense',
      id,
      itemName: item?.description || 'this expense'
    });
  };

  const handlePasswordConfirm = async (password: string) => {
    if (!passwordModal.id || !passwordModal.type) return;

    if (passwordModal.type === 'contribution') {
      await api.deleteContribution(passwordModal.id, password);
      setContributions(contributions.filter(c => c.id !== passwordModal.id));
      setSuccessMessage('Contribution deleted successfully!');
    } else if (passwordModal.type === 'promise') {
      await api.deletePromise(passwordModal.id, password);
      setPromises(promises.filter(p => p.id !== passwordModal.id));
      setSuccessMessage('Promise deleted successfully!');
    } else if (passwordModal.type === 'expense') {
      await api.deleteExpense(passwordModal.id, password);
      setExpenses(expenses.filter(e => e.id !== passwordModal.id));
      setSuccessMessage('Expense deleted successfully!');
    }
    setPasswordModal({ isOpen: false, type: null, id: null, itemName: '' });
    setError(null);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const editContribution = (id: string) => {
    const item = contributions.find(c => c.id === id);
    if (item) {
      setEditModal({ isOpen: true, type: 'contribution', item });
    }
  };

  const editPromise = (id: string) => {
    const item = promises.find(p => p.id === id);
    if (item) {
      setEditModal({ isOpen: true, type: 'promise', item });
    }
  };

  const editExpense = (id: string) => {
    const item = expenses.find(e => e.id === id);
    if (item) {
      setEditModal({ isOpen: true, type: 'expense', item });
    }
  };

  const handleEditSave = async (data: any, password: string) => {
    if (!editModal.item || !editModal.type) return;

    if (editModal.type === 'contribution') {
      const updated = await api.updateContribution(editModal.item.id, data, password);
      setContributions(contributions.map(c => c.id === updated.id ? updated : c));
      setSuccessMessage('Contribution updated successfully!');
    } else if (editModal.type === 'promise') {
      const updated = await api.updatePromise(editModal.item.id, data, password);
      setPromises(promises.map(p => p.id === updated.id ? updated : p));
      setSuccessMessage('Promise updated successfully!');
    } else if (editModal.type === 'expense') {
      const updated = await api.updateExpense(editModal.item.id, data, password);
      setExpenses(expenses.map(e => e.id === updated.id ? updated : e));
      setSuccessMessage('Expense updated successfully!');
    }
    setEditModal({ isOpen: false, type: null, item: null });
    setError(null);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-800 font-semibold mb-2">Loading your data...</p>
          <p className="text-sm text-gray-600 mb-4">
            If this is your first visit in a while, the server might be waking up. This can take up to 30 seconds.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <div className="animate-pulse">⚡</div>
            <span>Free tier backend starting up...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-6 md:mb-8">
          <div className="flex items-center gap-2 md:gap-3 mb-2">
            <Wallet className="w-8 h-8 md:w-10 md:h-10 text-indigo-600" />
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800">Contributions Tracker</h1>
          </div>
          <p className="text-sm md:text-base text-gray-600 ml-10 md:ml-13">Track money in, promises, and expenses</p>
        </header>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm text-red-700 mb-2">{error}</p>
                <button
                  onClick={() => {
                    setError(null);
                    loadData();
                  }}
                  className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                >
                  Retry Now
                </button>
              </div>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded animate-fade-in">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700 font-medium">{successMessage}</p>
              </div>
              <button
                onClick={() => setSuccessMessage(null)}
                className="ml-auto text-green-500 hover:text-green-700"
              >
                ×
              </button>
            </div>
          </div>
        )}

        <Summary 
          contributions={contributions}
          promises={promises}
          expenses={expenses}
        />

        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 mb-4 md:mb-6">
          <div className="flex gap-1 md:gap-2 mb-4 md:mb-6 border-b overflow-x-auto">
            <button
              onClick={() => setActiveTab('contributions')}
              className={`px-3 md:px-6 py-2 md:py-3 font-semibold transition-colors flex items-center gap-1 md:gap-2 text-sm md:text-base whitespace-nowrap ${
                activeTab === 'contributions'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />
              Money In
            </button>
            <button
              onClick={() => setActiveTab('promises')}
              className={`px-3 md:px-6 py-2 md:py-3 font-semibold transition-colors flex items-center gap-1 md:gap-2 text-sm md:text-base whitespace-nowrap ${
                activeTab === 'promises'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <DollarSign className="w-4 h-4 md:w-5 md:h-5" />
              Promises
            </button>
            <button
              onClick={() => setActiveTab('expenses')}
              className={`px-3 md:px-6 py-2 md:py-3 font-semibold transition-colors flex items-center gap-1 md:gap-2 text-sm md:text-base whitespace-nowrap ${
                activeTab === 'expenses'
                  ? 'text-red-600 border-b-2 border-red-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <TrendingDown className="w-4 h-4 md:w-5 md:h-5" />
              Expenses
            </button>
          </div>

          {activeTab === 'contributions' && (
            <div>
              <ContributionForm onAdd={addContribution} />
              <TransactionList
                items={contributions}
                type="contribution"
                onDelete={deleteContribution}
                onEdit={editContribution}
              />
            </div>
          )}

          {activeTab === 'promises' && (
            <div>
              <PromiseForm onAdd={addPromise} />
              <TransactionList
                items={promises}
                type="promise"
                onDelete={deletePromise}
                onEdit={editPromise}
              />
            </div>
          )}

          {activeTab === 'expenses' && (
            <div>
              <ExpenseForm onAdd={addExpense} />
              <TransactionList
                items={expenses}
                type="expense"
                onDelete={deleteExpense}
                onEdit={editExpense}
              />
            </div>
          )}
        </div>

        <PasswordModal
          isOpen={passwordModal.isOpen}
          onClose={() => setPasswordModal({ isOpen: false, type: null, id: null, itemName: '' })}
          onConfirm={handlePasswordConfirm}
          title="Delete Confirmation"
          message={`Are you sure you want to delete ${passwordModal.itemName}? This action cannot be undone.`}
        />

        <EditModal
          isOpen={editModal.isOpen}
          onClose={() => setEditModal({ isOpen: false, type: null, item: null })}
          onSave={handleEditSave}
          item={editModal.item}
          type={editModal.type || 'contribution'}
        />
      </div>
    </div>
  );
}

export default App;
