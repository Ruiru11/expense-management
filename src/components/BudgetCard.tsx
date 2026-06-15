import { Target, Edit2 } from 'lucide-react';

interface BudgetCardProps {
  budgetAmount: number;
  totalContributions: number;
  onEditClick: () => void;
}

export default function BudgetCard({ budgetAmount, totalContributions, onEditClick }: BudgetCardProps) {
  const deficit = totalContributions - budgetAmount;
  const isOverBudget = deficit < 0;
  const percentageCollected = budgetAmount > 0 ? (totalContributions / budgetAmount) * 100 : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(amount);
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg shadow-lg p-4 md:p-6 border-l-4 border-purple-500">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Target className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />
          <h3 className="text-gray-700 font-semibold text-sm md:text-base">Budget Estimate</h3>
        </div>
        <button
          onClick={onEditClick}
          className="p-1.5 hover:bg-purple-100 rounded-lg transition-colors"
          title="Edit Budget"
        >
          <Edit2 className="w-4 h-4 text-purple-600" />
        </button>
      </div>

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
    </div>
  );
}
