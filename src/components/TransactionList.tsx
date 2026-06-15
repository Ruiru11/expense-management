import { Trash2, Calendar, FileText, Edit } from 'lucide-react';
import { format } from 'date-fns';
import { Contribution, Promise, Expense, BudgetItem, TransactionType } from '../types';

interface TransactionListProps {
  items: Contribution[] | Promise[] | Expense[] | BudgetItem[];
  type: TransactionType;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export default function TransactionList({ items, type, onDelete, onEdit }: TransactionListProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">No {type}s recorded yet.</p>
        <p className="text-sm mt-2">Add your first {type} using the form above.</p>
      </div>
    );
  }

  const getColorClasses = () => {
    switch (type) {
      case 'contribution':
        return 'border-green-200 bg-green-50';
      case 'promise':
        return 'border-blue-200 bg-blue-50';
      case 'expense':
        return 'border-red-200 bg-red-50';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(amount);
  };

  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-gray-700 mb-3">
        {type === 'contribution' && 'Contributions Received'}
        {type === 'promise' && 'Promises Made'}
        {type === 'expense' && 'Expenses Paid'}
      </h4>
      {items.map((item) => (
        <div
          key={item.id}
          className={`border-2 rounded-lg p-4 ${getColorClasses()} transition-all hover:shadow-md`}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h5 className="font-semibold text-gray-800">
                  {'name' in item ? item.name : item.description}
                </h5>
                <span className="text-lg font-bold text-gray-900">
                  {formatCurrency(item.amount)}
                </span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                {'date' in item && item.date && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{format(new Date(item.date), 'MMM dd, yyyy')}</span>
                  </div>
                )}
                {type === 'promise' && 'dueDate' in item && item.dueDate && (
                  <div className="flex items-center gap-1 text-blue-700">
                    <Calendar className="w-4 h-4" />
                    <span>Due: {format(new Date(item.dueDate), 'MMM dd, yyyy')}</span>
                  </div>
                )}
                {(type === 'expense' || type === 'budgetItem') && 'category' in item && item.category && (
                  <div className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    <span>{item.category}</span>
                  </div>
                )}
              </div>
              {type === 'budgetItem' && 'amountPaid' in item && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">Paid:</span>
                      <span className="ml-2 font-semibold text-green-600">{formatCurrency(item.amountPaid)}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Balance:</span>
                      <span className="ml-2 font-semibold text-red-600">{formatCurrency(item.amount - item.amountPaid)}</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Payment Progress</span>
                      <span>{((item.amountPaid / item.amount) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          item.amountPaid >= item.amount ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${Math.min((item.amountPaid / item.amount) * 100, 100)}%` }}
                      />
                    </div>
                    {item.amountPaid >= item.amount && (
                      <p className="mt-1 text-xs font-semibold text-green-600">✓ Fully Paid</p>
                    )}
                  </div>
                </div>
              )}
              {item.notes && (
                <p className="mt-2 text-sm text-gray-600 italic">{item.notes}</p>
              )}
            </div>
            <div className="flex gap-2 md:ml-4">
              <button
                onClick={() => onEdit(item.id)}
                className="p-2 md:p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors touch-manipulation"
                title="Edit"
              >
                <Edit className="w-5 h-5 md:w-5 md:h-5" />
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="p-2 md:p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors touch-manipulation"
                title="Delete"
              >
                <Trash2 className="w-5 h-5 md:w-5 md:h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
