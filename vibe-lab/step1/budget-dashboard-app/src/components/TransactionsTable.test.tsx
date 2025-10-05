import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TransactionsTable from './TransactionsTable';

describe('TransactionsTable', () => {
  it('renders a transaction row with formatted values', () => {
    const transactions = [
      {
        id: 1,
        date: '2024-01-15',
        description: 'Test Merchant',
        amount: 12.34,
        category: 'Grocery',
        mcc: '5411',
      },
    ];

    render(<TransactionsTable transactions={transactions} />);

    // Table is present
    expect(screen.getByRole('table')).toBeInTheDocument();

    // Description and category
    expect(screen.getByText('Test Merchant')).toBeInTheDocument();
    expect(screen.getByText('Grocery')).toBeInTheDocument();

    // Amount formatted in USD
    expect(screen.getByText('$12.34')).toBeInTheDocument();

    // Date formatted en-US (match component logic to avoid TZ flakiness)
    const expectedDate = new Date('2024-01-15').toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    expect(screen.getByText(expectedDate)).toBeInTheDocument();
  });
});
