import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {editExpense, removeExpense} from '../actions/expenses';

const EditExpensePage = (props) => {
  console.log('props passed down to EditExpensePage:')
  console.log(props);
  return (
  <div>
    {typeof props.expense !== 'undefined'?
    <div>
    <ExpenseForm
      existingExpense = {props.expense}
      onSubmit = {(expense) => {
        console.log('updated',expense);
        // we then dispatch to edit expense page.
        props.dispatch(editExpense(props.expense.id,expense));
        props.history.push('/');
      }}
    />
  <button 
    onClick = {(e) => {
      props.dispatch(removeExpense({id:props.expense.id}));
      alert('Expense deleted.');
      props.history.push('/');
    }}
  > 
    remove this expense 
  </button>
</div>
    :
    <p> undefined. No such expense</p>
  }
</div>
  );
}
const mapStateToProps = (state,props) => {
  return {
    expense: state.expenses.find((expense)=>  expense.id === props.match.params.id)
  };
};

export default connect(mapStateToProps)(EditExpensePage);
