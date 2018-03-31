import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {addExpense} from '../actions/expenses';
const AddExpensePage = (props) => (
  <div> 

    <h1>Add Expense page </h1>
    <ExpenseForm
      onSubmit={(expense) => {
        console.log('got expense: ');
        console.log(expense);
        // add new expense to redux store.
        props.dispatch(addExpense(expense));
        props.history.push('/'); // CLIENTSIDE REDIRECTION BY REACT ROUTER.
        // I am redirecting to dashboard.
      }}
    />
  </div>);
export default connect()(AddExpensePage);
