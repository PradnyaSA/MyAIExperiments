# Vibe Lab - Budget Dashboard

## Project Overview

This project is a simple budget dashboard web application built with React and TypeScript. It allows users to track their expenses, set budgets for different spending categories, and visualize their spending through charts. The application uses a sample dataset of credit card transactions.

The main technologies used are:

*   **React:** A JavaScript library for building user interfaces.
*   **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
*   **Recharts:** A composable charting library built on React components.
*   **Create React App:** A tool for creating single-page React applications.

The application is structured as follows:

*   `src/App.tsx`: The main application component that manages the state of the application.
*   `src/components/`: A directory containing the React components for the application.
    *   `TransactionsTable.tsx`: Displays a table of transactions.
    *   `BudgetSettings.tsx`: Allows users to set budgets for different spending categories.
    *   `Charts.tsx`: Displays a bar chart of budget vs. actual spending and a pie chart of the user's overall spending.
*   `src/data/sampleTransactions.json`: A sample dataset of credit card transactions.

## Building and Running

To build and run the project, you will need to have Node.js and npm installed.

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Run the application in development mode:**

    ```bash
    npm start
    ```

    This will open the application in your browser at `http://localhost:3000`.

3.  **Build the application for production:**

    ```bash
    npm run build
    ```

    This will create a `build` directory with the production-ready files.

## Development Conventions

*   **Coding Style:** The project uses the default coding style for Create React App.
*   **Testing:** The project uses the default testing framework for Create React App. You can run the tests with the following command:

    ```bash
    npm test
    ```
