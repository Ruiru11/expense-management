import { TrendingUp, TrendingDown, DollarSign, PiggyBank } from 'lucide-react';
import { Contribution, Promise, Expense } from '../types';

interface SummaryProps {
  contributions: Contribution[];
  promises: Promise[];
  expenses: Expense[];
}

export default function Summary({ contributions, promises, expenses }: SummaryProps) {
  const totalContributions = contributions.reduce((sum, c) => sum + c.amount, 0);
  const totalPromises = promises.reduce((sum, p) => sum + p.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const netBalance = totalContributions - totalExpenses;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 border-l-4 border-green-500">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-600 font-medium text-sm md:text-base">Money Received</h3>
          <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-green-500" />
        </div>
        <p className="text-2xl md:text-3xl font-bold text-gray-800">{formatCurrency(totalContributions)}</p>
        <p className="text-xs md:text-sm text-gray-500 mt-1">{contributions.length} contribution(s)</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 border-l-4 border-blue-500">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-600 font-medium text-sm md:text-base">Promises</h3>
          <DollarSign className="w-6 h-6 md:w-8 md:h-8 text-blue-500" />
        </div>
        <p className="text-2xl md:text-3xl font-bold text-gray-800">{formatCurrency(totalPromises)}</p>
        <p className="text-xs md:text-sm text-gray-500 mt-1">{promises.length} promise(s)</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 border-l-4 border-red-500">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-600 font-medium text-sm md:text-base">Expenses Paid</h3>
          <TrendingDown className="w-6 h-6 md:w-8 md:h-8 text-red-500" />
        </div>
        <p className="text-2xl md:text-3xl font-bold text-gray-800">{formatCurrency(totalExpenses)}</p>
        <p className="text-xs md:text-sm text-gray-500 mt-1">{expenses.length} expense(s)</p>
      </div>

      <div className={`bg-white rounded-lg shadow-lg p-4 md:p-6 border-l-4 ${netBalance >= 0 ? 'border-indigo-500' : 'border-orange-500'}`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-600 font-medium text-sm md:text-base">Net Balance</h3>
          <PiggyBank className={`w-6 h-6 md:w-8 md:h-8 ${netBalance >= 0 ? 'text-indigo-500' : 'text-orange-500'}`} />
        </div>
        <p className={`text-2xl md:text-3xl font-bold ${netBalance >= 0 ? 'text-indigo-600' : 'text-orange-600'}`}>
          {formatCurrency(netBalance)}
        </p>
        <p className="text-xs md:text-sm text-gray-500 mt-1">
          {netBalance >= 0 ? 'Surplus' : 'Deficit'}
        </p>
      </div>
    </div>
  );
}
