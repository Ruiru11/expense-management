import { useState } from 'react';
import { Target } from 'lucide-react';
import { BudgetItem } from '../types';

interface BudgetItemFormProps {
  onSubmit: (budgetItem: Omit<BudgetItem, 'id'>) => void;
}

export default function BudgetItemForm({ onSubmit }: BudgetItemFormProps) {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    amountPaid: '',
    category: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      description: formData.description,
      amount: parseFloat(formData.amount),
      amountPaid: parseFloat(formData.amountPaid) || 0,
      category: formData.category || undefined,
      notes: formData.notes || undefined,
    });
    setFormData({ description: '', amount: '', amountPaid: '', category: '', notes: '' });
  };

  return (
    <div className="bg-purple-50 rounded-lg p-4 md:p-6 mb-4 md:mb-6">
      <h3 className="text-lg md:text-xl font-semibold text-purple-800 mb-3 md:mb-4 flex items-center gap-2">
        <Target className="w-5 h-5 md:w-6 md:h-6" />
        Add Budget Line Item
      </h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm md:text-base"
            placeholder="e.g., Venue rental"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount (KSh) *
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm md:text-base"
            placeholder="0.00"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount Paid (KSh)
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.amountPaid}
            onChange={(e) => setFormData({ ...formData, amountPaid: e.target.value })}
            className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm md:text-base"
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm md:text-base"
            placeholder="e.g., Logistics, Catering"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <input
            type="text"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm md:text-base"
            placeholder="Additional details"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full md:w-auto px-6 md:px-8 py-3 md:py-3 bg-purple-600 text-white text-sm md:text-base rounded-lg hover:bg-purple-700 transition-colors font-semibold shadow-md hover:shadow-lg"
          >
            + Add Budget Item
          </button>
        </div>
      </form>
    </div>
  );
}
