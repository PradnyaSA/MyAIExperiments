import React, { useState, useEffect } from 'react';
import './App.css';
import TransactionsTable from './components/TransactionsTable';
import BudgetSettings from './components/BudgetSettings';
import Charts from './components/Charts';
import sampleTransactions from './data/sampleTransactions.json';

export interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  category: string;
  mcc: string;
}

export interface Budget {
  category: string;
  budgetAmount: number;
}

function App() {
  const [transactions] = useState<Transaction[]>(sampleTransactions);
  const [budgets, setBudgets] = useState<Budget[]>([]);

  useEffect(() => {
    const categories = Array.from(new Set(transactions.map(t => t.category)));
    const initialBudgets = categories.map(category => ({
      category,
      budgetAmount: 500
    }));
    setBudgets(initialBudgets);
  }, [transactions]);

  const updateBudget = (category: string, budgetAmount: number) => {
    setBudgets(prev =>
      prev.map(budget =>
        budget.category === category
          ? { ...budget, budgetAmount }
          : budget
      )
    );
  };

  return (
    <div className="App">
      <div className="container">
        <header className="App-header">
          <h1>Budget Dashboard</h1>
          <p>Track your expenses and manage your budget</p>
        </header>

        <main>
          <section className="section">
            <h2>Recent Transactions</h2>
            <TransactionsTable transactions={transactions} />
          </section>

          <section className="section">
            <h2>Budget Settings</h2>
            <BudgetSettings
              budgets={budgets}
              onUpdateBudget={updateBudget}
            />
          </section>

          <section className="section">
            <h2>Spending Analysis</h2>
            <Charts
              transactions={transactions}
              budgets={budgets}
            />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;