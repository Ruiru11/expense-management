const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface ApiData {
  contributions: any[];
  promises: any[];
  expenses: any[];
  budget: { amount: number };
}

export const api = {
  async fetchData(): Promise<ApiData> {
    const response = await fetch(`${API_BASE_URL}/data`);
    if (!response.ok) throw new Error('Failed to fetch data');
    return response.json();
  },

  async addContribution(contribution: any) {
    const response = await fetch(`${API_BASE_URL}/contributions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contribution),
    });
    if (!response.ok) throw new Error('Failed to add contribution');
    return response.json();
  },

  async updateContribution(id: string, contribution: any, password: string) {
    const response = await fetch(`${API_BASE_URL}/contributions/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'x-admin-password': password 
      },
      body: JSON.stringify(contribution),
    });
    if (!response.ok) {
      if (response.status === 401) throw new Error('Invalid password');
      throw new Error('Failed to update contribution');
    }
    return response.json();
  },

  async deleteContribution(id: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/contributions/${id}`, {
      method: 'DELETE',
      headers: { 'x-admin-password': password },
    });
    if (!response.ok) {
      if (response.status === 401) throw new Error('Invalid password');
      throw new Error('Failed to delete contribution');
    }
    return response.json();
  },

  async addPromise(promise: any) {
    const response = await fetch(`${API_BASE_URL}/promises`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(promise),
    });
    if (!response.ok) throw new Error('Failed to add promise');
    return response.json();
  },

  async updatePromise(id: string, promise: any, password: string) {
    const response = await fetch(`${API_BASE_URL}/promises/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'x-admin-password': password 
      },
      body: JSON.stringify(promise),
    });
    if (!response.ok) {
      if (response.status === 401) throw new Error('Invalid password');
      throw new Error('Failed to update promise');
    }
    return response.json();
  },

  async deletePromise(id: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/promises/${id}`, {
      method: 'DELETE',
      headers: { 'x-admin-password': password },
    });
    if (!response.ok) {
      if (response.status === 401) throw new Error('Invalid password');
      throw new Error('Failed to delete promise');
    }
    return response.json();
  },

  async addExpense(expense: any) {
    const response = await fetch(`${API_BASE_URL}/expenses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expense),
    });
    if (!response.ok) throw new Error('Failed to add expense');
    return response.json();
  },

  async updateExpense(id: string, expense: any, password: string) {
    const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'x-admin-password': password 
      },
      body: JSON.stringify(expense),
    });
    if (!response.ok) {
      if (response.status === 401) throw new Error('Invalid password');
      throw new Error('Failed to update expense');
    }
    return response.json();
  },

  async deleteExpense(id: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
      method: 'DELETE',
      headers: { 'x-admin-password': password },
    });
    if (!response.ok) {
      if (response.status === 401) throw new Error('Invalid password');
      throw new Error('Failed to delete expense');
    }
    return response.json();
  },

  async updateBudget(amount: number, password: string) {
    const response = await fetch(`${API_BASE_URL}/budget`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'x-admin-password': password 
      },
      body: JSON.stringify({ amount }),
    });
    if (!response.ok) {
      if (response.status === 401) throw new Error('Invalid password');
      throw new Error('Failed to update budget');
    }
    return response.json();
  },
};
