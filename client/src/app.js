import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routes/AppRouter';
import './styles/styles.scss'; // import styles.css to our whole app
import 'normalize.css/normalize.css'; // every import not starting with
// redux tings:
import configureStore from './store/configureStore';
import {addExpense} from './actions/expenses';
import {setTextFilter} from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import {Provider} from 'react-redux';
import moment from 'moment';
const store = configureStore();
store.dispatch(addExpense({description: 'water bill', amount: 10000,createdAt: moment() - 100}));
store.dispatch(addExpense({description: 'gas bill', amount: 1000,createdAt: moment() - 100000}));
store.dispatch(addExpense({description: 'Rent', amount: 109500}));
const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filter);
console.log('visible expenses:');
console.log(visibleExpenses);
/* We are providing a way for all our components to 
interact with redux. Create our store first, and pass it down as store. */
const app = (
<Provider store = {store}>   
  <AppRouter/>
</Provider>
)
ReactDOM.render(app, document.getElementById('app'));


