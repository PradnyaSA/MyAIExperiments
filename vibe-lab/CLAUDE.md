# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains **Vibe Lab**, an experimental project for building a React-based Budget Dashboard web application. The main application is located in `step1/budget-dashboard-app/`.

### Tech Stack
- **React 18** with TypeScript
- **Recharts** for data visualization
- **Create React App** (react-scripts 5.0.1) for build tooling
- TypeScript with strict mode enabled

## Development Commands

All commands should be run from the `step1/budget-dashboard-app/` directory:

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:3000)
npm start

# Build for production
npm run build

# Run tests (launches test runner in interactive watch mode)
npm test
```

## Architecture & Code Structure

### Data Flow
- **State Management**: App-level state in `src/App.tsx` using React hooks (useState, useEffect)
- **Transaction Data**: Static sample data from `src/data/sampleTransactions.json` (20 records)
- **Budget Data**: Dynamically initialized from transaction categories with default $500 per category

### Core Components

**`src/App.tsx`** - Main application container
- Manages transactions and budgets state
- Initializes budgets based on unique transaction categories
- Provides `updateBudget` callback to child components
- Exports `Transaction` and `Budget` TypeScript interfaces

**`src/components/TransactionsTable.tsx`**
- Displays categorized transactions in table format
- Formats dates and currency
- Uses category badges (never shows raw MCC codes)

**`src/components/BudgetSettings.tsx`**
- Grid layout of budget cards by category
- Inline editing with save/cancel actions
- Input validation for budget amounts

**`src/components/Charts.tsx`**
- Bar chart: Budget vs Actual spending comparison with percentage indicators
- Pie chart: Overall spending distribution across categories
- Uses `useMemo` for performance optimization of chart data calculations
- Custom tooltips with currency formatting

### Key Data Structures

```typescript
interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  category: string;  // Derived from MCC, human-readable
  mcc: string;       // Stored but never displayed
}

interface Budget {
  category: string;
  budgetAmount: number;
}
```

### Transaction Categories
Categories are derived from MCC codes and include: Grocery, Gas & Fuel, Department Store, Fast Food, Online Retail, Coffee Shop, Home Improvement, Wholesale Club, Entertainment, Pharmacy, Transportation, Electronics, Restaurant, Health & Fitness.

### Styling Pattern
- Component-specific CSS files (e.g., `Charts.css`, `BudgetSettings.css`)
- Category badges with dynamic class generation: `category-${category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`
- Responsive containers for charts using Recharts' ResponsiveContainer

## Source Dataset
The root directory contains `user_credit_card_transactions.csv` which was used to generate the sample data. The sample dataset in `src/data/sampleTransactions.json` contains 20 curated records with MCC-to-category mappings.

## TypeScript Configuration
- Target: ES2015
- Strict mode enabled
- React JSX transform (react-jsx)
- JSON module resolution enabled
