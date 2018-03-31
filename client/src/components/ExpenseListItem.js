import React from 'react';
import {removeExpense} from '../actions/expenses';
import {NavLink} from 'react-router-dom';
const ExpenseListItem = ({text, description, amount, createdAt, id}) => (
   <div>
    <h1> {text}</h1>
    <h2> {description} </h2>
    <p> Amount: {amount}</p>
    <p> Created at:{createdAt}</p>
    <NavLink 
      to={`/edit/${id}`}
      activeClassName="is-active" 
      exact = {true}
    >
      edit
    </NavLink>
    <br/>
  </div>

);



export default ExpenseListItem;
