import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Contribution } from '../types';

interface ContributionFormProps {
  onAdd: (contribution: Omit<Contribution, 'id'>) => void;
}

export default function ContributionForm({ onAdd }: ContributionFormProps) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount) return;

    onAdd({
      name,
      amount: parseFloat(amount),
      date,
      notes: notes || undefined,
    });

    setName('');
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-green-50 p-4 md:p-6 rounded-lg mb-4 md:mb-6">
      <h3 className="text-base md:text-lg font-semibold text-green-800 mb-3 md:mb-4">Add Money Received</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contributor Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="John Doe"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="0.00"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes (Optional)
          </label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Additional notes"
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-3 md:mt-4 w-full md:w-auto bg-green-600 text-white px-6 py-3 md:py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 font-medium text-sm md:text-base"
      >
        <Plus className="w-4 h-4 md:w-5 md:h-5" />
        Add Contribution
      </button>
    </form>
  );
}
