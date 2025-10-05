# Vibe Lab - Excercise to build a Simple Budget Dashboard web app
## step 1 -  create a sub directory for your web app 
```
mkdir -p step1/budget-dashboard-app && cd $_
```
Now, launch claude from the directory
```
claude
```
now give a basic prompt to begin with
```
Create a React web application for a Budget Dashboard app based on credit card transactions. 
Analyze the input dataset from the user_credit_card_transactions.csv file, then generate a small sample dataset for the web app. The Sample dataset should contain 20 records; each record should have the user's expense category derived from the merchant category code (MCC), description, transaction date, and $ amount. The home page should display a table of categorized transactions. Never display raw MCC code. Add the ability to set a budget per expense category. Display a simple chart of budget vs actual expense and a pie chart of the user's overall spending.
```
