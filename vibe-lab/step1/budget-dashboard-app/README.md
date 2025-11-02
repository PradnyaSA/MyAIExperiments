# Budget Dashboard App

## System Overview

```mermaid
graph TB
    subgraph SystemContext["Budget Dashboard - System Context (C4 Level 1)"]
        User[User<br/>Personal Finance Manager]

        subgraph BudgetDashboard["Budget Dashboard Application"]
            System[React Web Application<br/>TypeScript + Recharts]
        end

        DataSource[Transaction Data<br/>JSON File]
    end

    User -->|Views transactions<br/>and manages budgets| System
    System -.->|Displays insights<br/>and charts| User
    System -->|Reads transaction data| DataSource

%% OXDRAW LAYOUT START
%% {
%%   "nodes": {
%%     "System": {
%%       "x": 190.0,
%%       "y": 350.0
%%     },
%%     "DataSource": {
%%       "x": 190.0,
%%       "y": 530.0
%%     }
%%   },
%%   "edges": {},
%%   "node_styles": {
%%     "User": {
%%       "fill": "#6496c8"
%%     },
%%     "System": {
%%       "fill": "#64e68a"
%%     }
%%   },
%%   "edge_styles": {}
%% }
%% OXDRAW LAYOUT END


```

A React web application for tracking and managing budget expenses based on credit card transactions.

## Features

- **Transaction Table**: Displays categorized transactions with date, description, category, and amount
- **Budget Management**: Set budget amounts for each expense category
- **Budget vs Actual Chart**: Visual comparison between budgeted and actual spending using bar charts
- **Spending Distribution**: Pie chart showing overall spending breakdown by category
- **Category-based Organization**: Transactions automatically categorized based on Merchant Category Codes (MCC)

## Categories Supported

The app automatically categorizes transactions into the following categories:
- Grocery
- Gas & Fuel
- Department Store
- Fast Food
- Online Retail
- Coffee Shop
- Home Improvement
- Wholesale Club
- Entertainment
- Pharmacy
- Transportation
- Electronics
- Restaurant
- Health & Fitness

## Technology Stack

- **React 18** with TypeScript
- **Recharts** for data visualization
- **CSS3** for styling with responsive design
- **React Hooks** for state management

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd budget-dashboard-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and visit `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## Data Structure

The app uses a sample dataset with the following transaction structure:

```json
{
  "id": 1,
  "date": "2024-01-15",
  "description": "Walmart Supercenter",
  "amount": 134.09,
  "category": "Grocery",
  "mcc": "5411"
}
```

## Components

- **App.tsx**: Main application component with state management
- **TransactionsTable.tsx**: Displays transaction data in a responsive table
- **BudgetSettings.tsx**: Allows users to set and edit budget amounts per category
- **Charts.tsx**: Renders budget vs actual and pie charts using Recharts

## Features in Detail

### Transactions Table
- Responsive design that works on mobile and desktop
- Color-coded category badges
- Formatted currency display
- Sortable columns

### Budget Settings
- Inline editing for budget amounts
- Save/cancel functionality
- Visual feedback for budget status

### Charts
- Bar chart comparing budget vs actual spending
- Percentage indicators for budget usage
- Pie chart with spending distribution
- Interactive tooltips with formatted currency

## Sample Data

The application includes 20 sample transactions derived from the analysis of `user_credit_card_transactions.csv`. Each transaction includes:
- Transaction date
- Merchant description
- Expense category (derived from MCC codes)
- Transaction amount

## License

This project is for educational and demonstration purposes.
