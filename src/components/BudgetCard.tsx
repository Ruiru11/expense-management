import { useState } from 'react';
import { Target, Edit2, X, Check } from 'lucide-react';

interface BudgetCardProps {
  budgetAmount: number;
  totalContributions: number;
  onUpdateBudget: (amount: number) => Promise<void>;
}

export default function BudgetCard({ budgetAmount, totalContributions, onUpdateBudget }: BudgetCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(budgetAmount.toString());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deficit = totalContributions - budgetAmount;
  const isOverBudget = deficit < 0;
  const percentageCollected = budgetAmount > 0 ? (totalContributions / budgetAmount) * 100 : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(amount);
  };

  const handleEdit = () => {
    setEditValue(budgetAmount.toString());
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditValue(budgetAmount.toString());
    setIsEditing(false);
  };

  const handleSave = async () => {
    const newAmount = parseFloat(editValue);
    if (isNaN(newAmount) || newAmount < 0) {
      alert('Please enter a valid budget amount');
      return;
    }

    setIsSubmitting(true);
    try {
      await onUpdateBudget(newAmount);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update budget:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg shadow-lg p-4 md:p-6 border-l-4 border-purple-500">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Target className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />
          <h3 className="text-gray-700 font-semibold text-sm md:text-base">Budget Estimate</h3>
        </div>
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="p-1.5 hover:bg-purple-100 rounded-lg transition-colors"
            title="Edit Budget"
          >
            <Edit2 className="w-4 h-4 text-purple-600" />
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <input
            type="number"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter budget amount"
            autoFocus
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={isSubmitting}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={handleCancel}
              disabled={isSubmitting}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-2xl md:text-3xl font-bold text-purple-700 mb-2">
            {formatCurrency(budgetAmount)}
          </p>

          <div className="space-y-2">
            <div className="flex justify-between text-xs md:text-sm text-gray-600">
              <span>Collected: {formatCurrency(totalContributions)}</span>
              <span>{percentageCollected.toFixed(1)}%</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  percentageCollected >= 100 ? 'bg-green-500' : 'bg-purple-500'
                }`}
                style={{ width: `${Math.min(percentageCollected, 100)}%` }}
              />
            </div>

            <div className={`text-sm md:text-base font-semibold ${
              isOverBudget ? 'text-red-600' : 'text-green-600'
            }`}>
              {isOverBudget ? 'Deficit' : 'Surplus'}: {formatCurrency(Math.abs(deficit))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
