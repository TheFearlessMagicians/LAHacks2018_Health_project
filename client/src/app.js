import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routes/AppRouter';
import './styles/styles.scss'; // import styles.css to our whole app
import 'normalize.css/normalize.css'; // every import not starting with
//import Background from './photos/sustaining-motivation.jpg';
// redux tings:
import configureStore from './store/configureStore';
import { addChallenge } from './actions/challenges';
import { Provider } from 'react-redux';
import moment from 'moment';
import uuid from 'uuid';
import web3 from './blockchain/web3';
import getAccounts from './blockchain/accounts';
import getContract from './blockchain/contract';

import axios from 'axios';
const SERVERURL = "http://localhost:8000";
const store = configureStore();
//seed data
store.dispatch(addChallenge({
    startDate: moment() - 1000000000,
    endDate: moment() + 400000000,
    description: 'going to jump rope 4 times a week',
    goal: '2000 double unders in 30 mins',
    frequency: 4,
    userBet: 200,
    caloriesPerWorkout: 400,
    // skipping current bets, and progress as it is defaulted.
    userId: uuid(),
    challengeId: uuid()
}));
store.dispatch(addChallenge({
    startDate: moment() - 10000000,
    endDate: moment() + 200000000,
    description: '30 push ups every day',
    goal: '30 push ups every day without fail',
    caloriesPerWorkout: 100,
    frequency: 7,
    userBet: 8000,
    // skipping current bets, and progress,  as it is defaulted.
    userId: uuid(),
    challengeId: uuid()
}));

// Getting data from blockchain:
console.log('getting accounts......');
console.log('got accounts. Getting addresses from mongo db...');
axios.get(`${SERVERURL}/contracts`)
    .then( async (response) => {
            const accounts = await web3.eth.getAccounts();
            const account = accounts[0];
            console.log('response:');
            console.log(response);
            response.data.forEach(async(obj) => {
                    //TODO : what is accounts?
                    const contract = await getContract(obj.address);
                    // const a = async () => {
                    // const contract = await getContract('0x4D2D24899c0B115a1fce8637FCa610Fe02f1909e');
                    //const contract = await getContract('0x4D2D24899c0B115a1fce8627FCa610Fe02f1901b');

                    console.log('contract:');
                    console.log(contract);
                    store.dispatch(addChallenge({
                            startDate: await contract.methods.start().call(),
                            endDate: obj.endDate,
                            frequency: await contract.methods.frequency().call(),
                            description: obj.description,
                            goal: obj.goal,
                            userBet: Number (web3.utils.fromWei(await web3.eth.getBalance(obj.address),'ether')) - Number((web3.utils.fromWei(await contract.methods.totalBetAgainst().call(),'ether'))),
                            betAgainst: Number(web3.utils.fromWei(await contract.methods.totalBetAgainst().call(), 'ether')),
                            workoutsCompleted: Number(await contract.methods.workoutCount().call()),
                            userId: await contract.methods.owner().call(),
                            challengeId: obj.address
                        })
                    );
            })
        })
        .catch((error) => {
            console.log('AXIOS ERROR');
            console.log(error);
        });

        const app = (
            <Provider store = { store }>
                <AppRouter style = { { backgroundImage: `url(sustaining-motivation.jpg)` } }/>
            </Provider>
            );

        ReactDOM.render(app, document.getElementById('app'));
