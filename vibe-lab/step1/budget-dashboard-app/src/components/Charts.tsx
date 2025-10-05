import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts';
import { Transaction, Budget } from '../App';
import './Charts.css';

interface ChartsProps {
  transactions: Transaction[];
  budgets: Budget[];
}

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8',
  '#82CA9D', '#FFC658', '#FF7C7C', '#8DD1E1', '#D084D0',
  '#87D068', '#FFB366', '#95A5A6', '#F39C12', '#E74C3C'
];

const Charts: React.FC<ChartsProps> = ({ transactions, budgets }) => {
  const chartData = useMemo(() => {
    const categoryTotals = transactions.reduce((acc, transaction) => {
      const category = transaction.category;
      acc[category] = (acc[category] || 0) + transaction.amount;
      return acc;
    }, {} as { [key: string]: number });

    return budgets.map((budget) => {
      const actualSpent = categoryTotals[budget.category] || 0;
      return {
        category: budget.category,
        budget: budget.budgetAmount,
        actual: actualSpent,
        difference: budget.budgetAmount - actualSpent,
        percentage: ((actualSpent / budget.budgetAmount) * 100).toFixed(1)
      };
    });
  }, [transactions, budgets]);

  const pieData = useMemo(() => {
    const categoryTotals = transactions.reduce((acc, transaction) => {
      const category = transaction.category;
      acc[category] = (acc[category] || 0) + transaction.amount;
      return acc;
    }, {} as { [key: string]: number });

    return Object.entries(categoryTotals).map(([category, amount]) => ({
      name: category,
      value: amount
    }));
  }, [transactions]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey}: ${formatCurrency(entry.value)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{data.name}</p>
          <p style={{ color: data.color }}>
            {formatCurrency(data.value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="charts-container">
      <figure className="chart-section" role="group" aria-labelledby="bar-chart-title">
        <h3 id="bar-chart-title">Budget vs Actual Spending</h3>
        <div className="budget-summary">
          {chartData.map((item) => (
            <div key={item.category} className="budget-item">
              <span className="category-name">{item.category}</span>
              <span className={`percentage ${parseFloat(item.percentage) > 100 ? 'over-budget' : 'under-budget'}`}>
                {item.percentage}% of budget
              </span>
            </div>
          ))}
        </div>
        <div role="img" aria-labelledby="bar-chart-title" aria-describedby="bar-chart-desc" tabIndex={0}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="category"
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={12}
              />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="budget" fill="#8884d8" name="Budget" />
              <Bar dataKey="actual" fill="#82ca9d" name="Actual Spending" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p id="bar-chart-desc" className="visually-hidden">Bar chart comparing budget versus actual spending for each category in US dollars.</p>
        <table className="visually-hidden" aria-labelledby="bar-chart-title">
          <caption>Data for Budget vs Actual Spending</caption>
          <thead>
            <tr>
              <th scope="col">Category</th>
              <th scope="col">Budget</th>
              <th scope="col">Actual</th>
              <th scope="col">Difference</th>
              <th scope="col">Percent of budget</th>
            </tr>
          </thead>
          <tbody>
            {chartData.map((item) => (
              <tr key={item.category}>
                <th scope="row">{item.category}</th>
                <td>{formatCurrency(item.budget)}</td>
                <td>{formatCurrency(item.actual)}</td>
                <td>{formatCurrency(item.difference)}</td>
                <td>{item.percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </figure>

      <figure className="chart-section" role="group" aria-labelledby="pie-chart-title">
        <h3 id="pie-chart-title">Spending Distribution</h3>
        <div role="img" aria-labelledby="pie-chart-title" aria-describedby="pie-chart-desc" tabIndex={0}>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <p id="pie-chart-desc" className="visually-hidden">Pie chart showing spending distribution by category as percentages of total spending.</p>
        <table className="visually-hidden" aria-labelledby="pie-chart-title">
          <caption>Data for Spending Distribution</caption>
          <thead>
            <tr>
              <th scope="col">Category</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            {pieData.map((item) => (
              <tr key={item.name}>
                <th scope="row">{item.name}</th>
                <td>{formatCurrency(item.value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </figure>
    </div>
  );
};

export default Charts;
