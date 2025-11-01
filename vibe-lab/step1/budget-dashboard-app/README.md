# Budget Dashboard App

[![CI](https://github.com/OWNER/REPO/actions/workflows/ci.yml/badge.svg)](https://github.com/OWNER/REPO/actions/workflows/ci.yml)
<!-- Replace OWNER/REPO above with your GitHub org/repo slug to enable the badge. -->

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

## Application Flow Diagram

```mermaid
graph TB
    %% ===== DATA INITIALIZATION =====
    Start([Application Start]) --> LoadJSON["Load sampleTransactions.json<br/>20 transaction records"]
    LoadJSON --> AppInit[App.tsx Initialization]

    AppInit --> StateInit{Initialize State}
    StateInit -->|useState| TransState["transactions: Transaction[]"]
    StateInit -->|useState| BudgetState["budgets: Budget[]"]

    TransState --> LoadTrans["Load 20 transactions<br/>with categories from MCC"]
    LoadTrans --> ExtractCat[Extract unique categories]
    ExtractCat --> InitBudget["Initialize budgets<br/>$500 per category"]
    InitBudget --> BudgetState

    %% ===== COMPONENT RENDERING =====
    BudgetState --> Render[Render UI Components]
    Render --> Table[TransactionsTable]
    Render --> Settings[BudgetSettings]
    Render --> Charts[Charts]

    %% ===== TRANSACTIONS TABLE =====
    Table --> TableProps["Props: transactions"]
    TableProps --> TableRender[Render Table Rows]
    TableRender --> TableFormat["Format:<br/>• Date formatting<br/>• Currency formatting<br/>• Category badges<br/>• Hide MCC codes"]

    %% ===== BUDGET SETTINGS =====
    Settings --> SettingsProps["Props:<br/>• budgets<br/>• updateBudget callback"]
    SettingsProps --> BudgetCards["Render Budget Cards<br/>Grid Layout"]
    BudgetCards --> UserClick{User clicks Edit?}

    UserClick -->|No| Idle[Idle State]
    UserClick -->|Yes| EditMode[Edit Mode]
    EditMode --> InputField["Show input field<br/>with current budget"]
    InputField --> UserAction{User action?}

    UserAction -->|Cancel| CancelEdit[Restore original value]
    UserAction -->|Save| Validate{Validate input?}
    Validate -->|Invalid| ShowError[Show error message]
    ShowError --> InputField
    Validate -->|Valid| CallUpdate["Call updateBudget<br/>with new amount"]

    CallUpdate --> UpdateBudgets["Update budgets state<br/>in App.tsx"]
    UpdateBudgets --> Rerender[Trigger re-render]
    CancelEdit --> FocusReturn["Return focus<br/>to Edit button"]

    %% ===== CHARTS COMPONENT =====
    Charts --> ChartsProps["Props: transactions, budgets"]
    ChartsProps --> UseMemo1["useMemo: Calculate<br/>spending by category"]
    UseMemo1 --> Aggregate["Aggregate transaction amounts<br/>by category"]
    Aggregate --> ChartData[Chart Data Structure]

    ChartData --> BarChart["Bar Chart:<br/>Budget vs Actual<br/>+ Percentage Indicator"]
    ChartData --> PieChart["Pie Chart:<br/>Spending Distribution<br/>by Category"]

    BarChart --> CustomTooltip["Custom Tooltips<br/>Currency Formatting"]
    PieChart --> CustomTooltip

    %% ===== DATA FLOW ON UPDATE =====
    Rerender --> UpdateCharts[Re-calculate Chart Data]
    UpdateCharts --> NewChartData["useMemo re-runs<br/>with new budgets"]
    NewChartData --> UpdateVisuals["Update Bar Chart<br/>with new percentages"]
    UpdateVisuals --> AriaLive["Announce update<br/>via aria-live region"]
    AriaLive --> FocusReturn

    %% ===== ACCESSIBILITY =====
    FocusReturn --> A11y[Accessibility Features]
    TableFormat --> A11y
    CustomTooltip --> A11y

    A11y --> Feature1["Semantic HTML<br/>table, figure, landmarks"]
    A11y --> Feature2["ARIA Labels<br/>on all interactions"]
    A11y --> Feature3["Screen Reader Support<br/>hidden data tables"]
    A11y --> Feature4["Keyboard Navigation<br/>full keyboard support"]
    A11y --> Feature5["Skip Links<br/>skip to main content"]

    %% ===== CONTINUOUS INTERACTION =====
    Idle --> Continue{User continues?}
    FocusReturn --> Continue
    Continue -->|Yes| UserClick
    Continue -->|No| End([Session End])

    %% ===== STYLING =====
    classDef initStyle fill:#e1f5e1,stroke:#4a9d4a,stroke-width:2px
    classDef stateStyle fill:#e1f0ff,stroke:#4a7fbf,stroke-width:2px
    classDef compStyle fill:#fff4e1,stroke:#d9a84a,stroke-width:2px
    classDef dataStyle fill:#f0e1ff,stroke:#9d4adb,stroke-width:2px
    classDef a11yStyle fill:#ffe1f0,stroke:#db4a9d,stroke-width:2px
    classDef endStyle fill:#ffe1e1,stroke:#db4a4a,stroke-width:2px

    class Start,LoadJSON,AppInit initStyle
    class StateInit,TransState,BudgetState,UpdateBudgets,Rerender stateStyle
    class Table,Settings,Charts,TableRender,BudgetCards,BarChart,PieChart compStyle
    class ChartData,Aggregate,UseMemo1,NewChartData dataStyle
    class A11y,Feature1,Feature2,Feature3,Feature4,Feature5,AriaLive a11yStyle
    class End endStyle

    %% ===== KEY INTERFACES =====
    subgraph Types[" TypeScript Interfaces "]
        direction LR
        TInterface["Transaction {<br/>  id: number<br/>  date: string<br/>  description: string<br/>  amount: number<br/>  category: string<br/>  mcc: string<br/>}"]
        BInterface["Budget {<br/>  category: string<br/>  budgetAmount: number<br/>}"]
    end

    subgraph DataFlow[" Data Flow Summary "]
        direction LR
        Flow["JSON → useState → Props → useMemo → Charts"]
        Update["User Edit → updateBudget → setState → Re-render → Charts"]
    end

```
