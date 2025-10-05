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
  const [liveMessage, setLiveMessage] = useState<string>('');

  const toSlug = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');

  const handleEditStart = (category: string, currentAmount: number) => {
    setEditingCategory(category);
    setEditValue(currentAmount.toString());
    setLiveMessage(`Editing budget for ${category}.`);
  };

  const handleEditSave = (category: string) => {
    const amount = parseFloat(editValue);
    if (!isNaN(amount) && amount >= 0) {
      onUpdateBudget(category, amount);
      const amountFormatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
      setLiveMessage(`Saved budget for ${category} as ${amountFormatted}.`);
    }
    setEditingCategory(null);
    setEditValue('');
    // Return focus to the Edit button for the same category
    const slug = toSlug(category);
    setTimeout(() => {
      const btn = document.getElementById(`edit-btn-${slug}`) as HTMLButtonElement | null;
      btn?.focus();
    }, 0);
  };

  const handleEditCancel = () => {
    const prev = editingCategory;
    setEditingCategory(null);
    setEditValue('');
    if (prev) {
      setLiveMessage(`Canceled editing budget for ${prev}.`);
      const slug = toSlug(prev);
      setTimeout(() => {
        const btn = document.getElementById(`edit-btn-${slug}`) as HTMLButtonElement | null;
        btn?.focus();
      }, 0);
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="budget-settings">
      <div aria-live="polite" role="status" className="visually-hidden">{liveMessage}</div>
      <div className="budget-grid">
        {budgets.map((budget) => (
          <div key={budget.category} className="budget-card" role="group" aria-labelledby={`budget-cat-${toSlug(budget.category)}`}>
            <div className="budget-category">
              <span id={`budget-cat-${toSlug(budget.category)}`} className={`category-badge category-${toSlug(budget.category)}`}>
                {budget.category}
              </span>
            </div>
            <div className="budget-amount">
              {editingCategory === budget.category ? (
                <div className="budget-edit">
                  <label htmlFor={`budget-input-${toSlug(budget.category)}`} className="visually-hidden">
                    Budget amount for {budget.category}
                  </label>
                  <input
                    type="number"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="budget-input"
                    min="0"
                    step="0.01"
                    id={`budget-input-${toSlug(budget.category)}`}
                    aria-describedby={`budget-help-${toSlug(budget.category)}${editValue !== '' && (isNaN(parseFloat(editValue)) || parseFloat(editValue) < 0) ? ` budget-error-${toSlug(budget.category)}` : ''}`}
                    aria-invalid={editValue !== '' && (isNaN(parseFloat(editValue)) || parseFloat(editValue) < 0)}
                    autoFocus
                  />
                  <span id={`budget-help-${toSlug(budget.category)}`} className="visually-hidden">Enter amount in US dollars.</span>
                  {editValue !== '' && (isNaN(parseFloat(editValue)) || parseFloat(editValue) < 0) && (
                    <span id={`budget-error-${toSlug(budget.category)}`} className="visually-hidden">Amount must be zero or a positive number.</span>
                  )}
                  <div className="budget-actions">
                    <button
                      type="button"
                      onClick={() => handleEditSave(budget.category)}
                      className="btn btn-save"
                      aria-label={`Save budget for ${budget.category}`}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={handleEditCancel}
                      className="btn btn-cancel"
                      aria-label={`Cancel editing budget for ${budget.category}`}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="budget-display">
                  <span className="amount-value">{formatAmount(budget.budgetAmount)}</span>
                  <button
                    type="button"
                    onClick={() => handleEditStart(budget.category, budget.budgetAmount)}
                    className="btn btn-edit"
                    id={`edit-btn-${toSlug(budget.category)}`}
                    aria-label={`Edit budget for ${budget.category}`}
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
