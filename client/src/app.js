import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routes/AppRouter';
import './styles/styles.scss'; // import styles.css to our whole app
import 'normalize.css/normalize.css'; // every import not starting with
// redux tings:
import configureStore from './store/configureStore';
import {addChallenge} from './actions/challenges';
import {Provider} from 'react-redux';
import moment from 'moment';
import uuid from 'uuid';
const store = configureStore();
//seed data
store.dispatch(addChallenge(
    {
        startDate: moment() + 10000,
        endDate: moment() + 4000000,
        description: 'going to jump rope 4 times a week',
        goal: '2000 double unders in 30 mins',
        frequency: 4,
        userBet: 200,
        // skipping current bets, and progress as it is defaulted.
        userId: uuid(),
        challengeId: uuid()
    }
));
store.dispatch(addChallenge(
    {
        startDate: moment() + 1000000,
        endDate: moment() + 40000000,
        description :'gonna get Marissa tonight',
        goal: 'getting Marissa',
        frequency: 1,
        userBet: 10000,
        // skipping current bets, and progress,  as it is defaulted.
        userId: uuid(),
        challengeId: uuid()
    }
));
store.dispatch(addChallenge(
    {
        startDate: moment() + 100000000,
        endDate: moment() + 40000000000,
        description :'Sketching a drawing 4 time sa week',
        goal: 'Becoming good at drawing',
        frequency: 4,
        userBet: 8000,
        // skipping current bets, and progress,  as it is defaulted.
        userId: uuid(),
        challengeId: uuid()
    }
));
/* We are providing a way for all our components to
interact with redux. Create our store first, and pass it down as store. */
const app = (
<Provider store = {store}>
  <AppRouter/>
</Provider>
)



ReactDOM.render( app, document.getElementById('app'));
