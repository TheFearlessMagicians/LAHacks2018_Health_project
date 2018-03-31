import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilter from './ExpenseListFilter';
import {connect} from 'react-redux'; // we use the 'connect' function
// for all downstream components.
const ExpenseDashboardPage = (props) => (
  <div>
    <h1>Expense dashboard page</h1>
    <ExpenseListFilter />
    <ExpenseList />
  </div>

  );
export default ExpenseDashboardPage;
