import React from 'react';
import { Transaction } from '../App';
import './TransactionsTable.css';

interface TransactionsTableProps {
  transactions: Transaction[];
  caption?: string;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions, caption = 'Transactions' }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="transactions-table-container">
      <table className="transactions-table">
        <caption className="visually-hidden">{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{formatDate(transaction.date)}</td>
              <th scope="row">{transaction.description}</th>
              <td>
                <span className={`category-badge category-${transaction.category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`}>
                  {transaction.category}
                </span>
              </td>
              <td className="amount">{formatAmount(transaction.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
