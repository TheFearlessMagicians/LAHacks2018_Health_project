// we will create a stateless functional component to show all our
// expenses.
import React from 'react';
import {connect} from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';
const ExpenseList = (props) => (
  <div> 
    <h1>Expense List: </h1>
    <ul>
      {props.expenses.map((expense)=> (
        <ExpenseListItem key= {expense.id} {...expense}/> 
       // <li key = {expense.id}> {expense.description}: ${expense.amount / 100}</li>
      ))}
  </ul>
  </div>
);

// for connect, we want to pass in a function that returns
// what stuff from the state we want the Expense List to have 
// access to. This is as an object.

// We call this function 'mapStateToProps'.
// as the store changes, this function below will be re-run to adapt to the
// changes..
const mapStateToProps = (state)=> ({
    expenses: selectExpenses(state.expenses,state.filter)
});
// The object's key value pairs are then passed as props to the second
// argument, which is in here, ExpenseList.
const ConnectedExpenseList = connect(mapStateToProps)(ExpenseList);

export default ConnectedExpenseList;
