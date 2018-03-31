// setting up store configuration.
//
import {createStore, combineReducers} from 'redux';
import challengesReducer from '../reducers/challenges';
import playerReducer from '../reducers/player';
import betsReducer from '../reducers/bets';
export default () => {  // we're going to export the function that
// creates our redux-store..
  const store = createStore(
    combineReducers({
        challenges: challengesReducer,
        player: playerReducer,
        bets: betsReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    // ^ for react dev tools in chrome
  );

  return store;
};
