import { TrendingUp, TrendingDown, DollarSign, Target, AlertCircle, CheckCircle } from 'lucide-react';
import { BudgetItem, Contribution, Expense } from '../types';

interface BudgetOverviewProps {
  budgetItems: BudgetItem[];
  contributions: Contribution[];
  expenses: Expense[];
}

export default function BudgetOverview({ budgetItems, contributions, expenses }: BudgetOverviewProps) {
  // Budget Items Calculations
  const totalBudgetItems = budgetItems.reduce((sum, item) => sum + (item.amount || 0), 0);
  const totalPaid = budgetItems.reduce((sum, item) => sum + (item.amountPaid || 0), 0);
  const budgetBalance = totalBudgetItems - totalPaid;

  // Financial Position
  const moneyIn = contributions.reduce((sum, c) => sum + c.amount, 0);
  const moneyOut = expenses.reduce((sum, e) => sum + e.amount, 0);
  const netBalance = moneyIn - moneyOut;

  // Coverage & Ultimate Position
  const coverage = budgetBalance > 0 ? Math.min((netBalance / budgetBalance) * 100, 100) : (netBalance >= 0 ? 100 : 0);
  const ultimatePosition = netBalance - budgetBalance;
  const isDeficit = ultimatePosition < 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Target className="w-8 h-8" />
          Budget Overview & Financial Position
        </h2>
        <p className="text-purple-100">Complete analysis of our budget and financial health</p>
      </div>

      {/* Budget Items Summary */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-purple-600" />
          Budget Items Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
            <p className="text-sm text-gray-600 mb-1">Total Budget Items</p>
            <p className="text-2xl font-bold text-purple-700">{formatCurrency(totalBudgetItems)}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
            <p className="text-sm text-gray-600 mb-1">Amount Paid</p>
            <p className="text-2xl font-bold text-green-700">{formatCurrency(totalPaid)}</p>
            <p className="text-xs text-gray-500 mt-1">
              {totalBudgetItems > 0 ? ((totalPaid / totalBudgetItems) * 100).toFixed(1) : '0.0'}% paid
            </p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
            <p className="text-sm text-gray-600 mb-1">Budget Balance Remaining</p>
            <p className="text-2xl font-bold text-orange-700">{formatCurrency(budgetBalance)}</p>
          </div>
        </div>

        {/* Payment Progress */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Budget Payment Progress</span>
            <span>{totalBudgetItems > 0 ? ((totalPaid / totalBudgetItems) * 100).toFixed(1) : '0.0'}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-purple-500 to-green-500 h-3 rounded-full transition-all"
              style={{ width: `${Math.min(totalBudgetItems > 0 ? (totalPaid / totalBudgetItems) * 100 : 0, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Financial Position */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          Financial Position
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
            <p className="text-sm text-gray-600 mb-1">Money In (Contributions)</p>
            <p className="text-2xl font-bold text-green-700">{formatCurrency(moneyIn)}</p>
          </div>
          <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
            <p className="text-sm text-gray-600 mb-1">Money Out (Expenses)</p>
            <p className="text-2xl font-bold text-red-700">{formatCurrency(moneyOut)}</p>
          </div>
          <div className={`rounded-lg p-4 border-l-4 ${netBalance >= 0 ? 'bg-blue-50 border-blue-500' : 'bg-red-50 border-red-500'}`}>
            <p className="text-sm text-gray-600 mb-1">Net Balance</p>
            <p className={`text-2xl font-bold ${netBalance >= 0 ? 'text-blue-700' : 'text-red-700'}`}>
              {formatCurrency(netBalance)}
            </p>
          </div>
        </div>
      </div>

      {/* Coverage Analysis */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Target className="w-6 h-6 text-indigo-600" />
          Budget Coverage Analysis
        </h3>
        <div className="space-y-4">
          <div className="bg-indigo-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-2">
              Net Balance Coverage of Budget Balance
            </p>
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold text-indigo-700">
                {formatCurrency(netBalance)} can cover {formatCurrency(Math.min(netBalance, budgetBalance))} of {formatCurrency(budgetBalance)}
              </span>
              <span className="text-2xl font-bold text-indigo-600">{coverage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className={`h-4 rounded-full transition-all ${
                  coverage >= 100 ? 'bg-green-500' : coverage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${Math.min(coverage, 100)}%` }}
              />
            </div>
          </div>

          {/* Visual Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-700 mb-3">Available Funds</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Net Balance:</span>
                  <span className="font-bold text-blue-600">{formatCurrency(netBalance)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Budget Needed:</span>
                  <span className="font-bold text-orange-600">{formatCurrency(budgetBalance)}</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-700 mb-3">Coverage Status</p>
              <div className="space-y-2">
                {coverage >= 100 ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Fully Covered!</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-orange-600">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-semibold">Partial Coverage</span>
                  </div>
                )}
                <p className="text-xs text-gray-600">
                  {coverage >= 100 
                    ? 'We have enough funds to cover all budget items'
                    : `We  can cover ${coverage.toFixed(1)}% of remaining budget items`
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ultimate Position */}
      <div className={`rounded-lg shadow-lg p-6 ${isDeficit ? 'bg-gradient-to-br from-red-50 to-orange-50' : 'bg-gradient-to-br from-green-50 to-emerald-50'}`}>
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          {isDeficit ? (
            <>
              <TrendingDown className="w-6 h-6 text-red-600" />
              Ultimate Financial Position: DEFICIT
            </>
          ) : (
            <>
              <TrendingUp className="w-6 h-6 text-green-600" />
              Ultimate Financial Position: SURPLUS
            </>
          )}
        </h3>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600 mb-2">
              After covering all budget items with net balance:
            </p>
            <p className={`text-5xl font-bold ${isDeficit ? 'text-red-600' : 'text-green-600'}`}>
              {formatCurrency(Math.abs(ultimatePosition))}
            </p>
            <p className="text-lg font-semibold text-gray-700 mt-2">
              {isDeficit ? 'DEFICIT - Additional funds needed' : 'SURPLUS - Extra funds available'}
            </p>
          </div>

          <div className="border-t pt-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-gray-500 mb-1">Net Balance</p>
                <p className="text-lg font-bold text-blue-600">{formatCurrency(netBalance)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Budget Balance</p>
                <p className="text-lg font-bold text-orange-600">{formatCurrency(budgetBalance)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Difference</p>
                <p className={`text-lg font-bold ${isDeficit ? 'text-red-600' : 'text-green-600'}`}>
                  {formatCurrency(ultimatePosition)}
                </p>
              </div>
            </div>
          </div>

          {isDeficit && (
            <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-800">Action Required</p>
                  <p className="text-sm text-red-700 mt-1">
                    We need an additional {formatCurrency(Math.abs(ultimatePosition))} to cover all budget items after expenses.
                  </p>
                </div>
              </div>
            </div>
          )}

          {!isDeficit && ultimatePosition > 0 && (
            <div className="mt-4 bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-green-800">Great News!</p>
                  <p className="text-sm text-green-700 mt-1">
                    After covering all budget items and expenses, you'll have {formatCurrency(ultimatePosition)} remaining.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
