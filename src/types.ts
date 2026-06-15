export interface Contribution {
  id: string;
  name: string;
  amount: number;
  date: string;
  notes?: string;
}

export interface Promise {
  id: string;
  name: string;
  amount: number;
  date: string;
  dueDate?: string;
  notes?: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  category?: string;
  notes?: string;
}

export interface Budget {
  amount: number;
}

export type TransactionType = 'contribution' | 'promise' | 'expense';
