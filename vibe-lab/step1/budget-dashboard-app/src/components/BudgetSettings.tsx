import React, { useState } from 'react';
import { Budget } from '../App';
import './BudgetSettings.css';

interface BudgetSettingsProps {
  budgets: Budget[];
  onUpdateBudget: (category: string, budgetAmount: number) => void;
}

const BudgetSettings: React.FC<BudgetSettingsProps> = ({ budgets, onUpdateBudget }) => {
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const handleEditStart = (category: string, currentAmount: number) => {
    setEditingCategory(category);
    setEditValue(currentAmount.toString());
  };

  const handleEditSave = (category: string) => {
    const amount = parseFloat(editValue);
    if (!isNaN(amount) && amount >= 0) {
      onUpdateBudget(category, amount);
    }
    setEditingCategory(null);
    setEditValue('');
  };

  const handleEditCancel = () => {
    setEditingCategory(null);
    setEditValue('');
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="budget-settings">
      <div className="budget-grid">
        {budgets.map((budget) => (
          <div key={budget.category} className="budget-card">
            <div className="budget-category">
              <span className={`category-badge category-${budget.category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`}>
                {budget.category}
              </span>
            </div>
            <div className="budget-amount">
              {editingCategory === budget.category ? (
                <div className="budget-edit">
                  <input
                    type="number"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="budget-input"
                    min="0"
                    step="0.01"
                    autoFocus
                  />
                  <div className="budget-actions">
                    <button
                      onClick={() => handleEditSave(budget.category)}
                      className="btn btn-save"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleEditCancel}
                      className="btn btn-cancel"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="budget-display">
                  <span className="amount-value">{formatAmount(budget.budgetAmount)}</span>
                  <button
                    onClick={() => handleEditStart(budget.category, budget.budgetAmount)}
                    className="btn btn-edit"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetSettings;