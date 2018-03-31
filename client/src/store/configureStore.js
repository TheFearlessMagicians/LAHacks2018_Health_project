// setting up store configuration.
//
import {createStore, combineReducers} from 'redux';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';

export default () => {  // we're going to export the function that 
// creates our redux-store..
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filter: filtersReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    // ^ for react dev tools in chrome 
  );

  return store;
};

