const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
const { interface, bytecode } = require('../compile');

let accounts;
let lottery;

beforeEach(async() => {
    accounts = await web3.eth.getAccounts();
    exercise = await new web3.eth.Contract(JSON.parse(interface)).deploy({ data: bytecode, arguments: [4, 400, 604800] }).send({ from: accounts[0], gas: '1000000' });
    await exercise.methods.deposit().send({
        from: accounts[0],
        value: web3.utils.toWei('2', 'ether')
    })
});

const processReturn = (AccountsToEth) => {
    let sum = 0;
    let returnArray = [];
    for (let i = 0; i < AccountsToEth.length; i++) {
        sum += AccountsToEth[i][1];
        returnArray.push([AccountsToEth[i][0]])
    }
    for (let i = 0; i < returnArray.length; i++) {
        returnArray[i].push((AccountsToEth[i][1]) / sum);
    }
    return returnArray;
}

describe('Exercise', () => {
    it('deploys a contract', () => {
        assert.ok(exercise.options.address);
    });

    it('deploys a contract with passed in expiration of 7 days from creation', async() => {
        let start = await exercise.methods.start().call({
            from: accounts[0]
        });
        let end = await exercise.methods.end().call({
            from: accounts[0]
        });
        // assert (start-end,604800);
    });
    it('logs workouts', async() => {
        await exercise.methods.logWorkOut(450).call({
            from: accounts[0]
        });
    });
    it('doesn\'t allow workouts to be logged that don\'t meat calorie count', async() => {
        try {
            await exercise.methods.logWorkOut(100).call({
                from: accounts[0]
            });
        } catch (error) {
            assert(error);
        }
    });
    it('doesn\'t allow workouts to be logged from accounts that don\'t own the contract', async() => {
        try {
            await exercise.methods.logWorkOut(500).call({
                from: accounts[1]
            });
        } catch (error) {
            assert(error);
        }
    });
    //Dangerous
    it('doesn\'t allow for contracts to be created that have an active period of less than a day', async() => {
        try {
            let exercise2 = await new web3.eth.Contract(JSON.parse(interface)).deploy({ data: bytecode, arguments: [4, 400, 100] }).send({ from: accounts[0], gas: '1000000' });
        } catch (error) {
            assert(error);
        }
    });

    it('can\'t log workout if there is no deposit', async() => {
        try {
            let exercise2 = await new web3.eth.Contract(JSON.parse(interface)).deploy({ data: bytecode, arguments: [4, 400, 850000] }).send({ from: accounts[0], gas: '1000000' });
            await exercise2.methods.logWorkOut().call({
                from: accounts[0]
            });
        } catch (error) {
            assert(error);
        }
    });

    it('a bet can be placed from a person who did not create the contract', async() => {
        await exercise.methods.submitBet().send({
            from: accounts[1],
            value: web3.utils.toWei('0.02', 'ether'),
            gas: 3000000
        });

        let numBets = await exercise.methods.getNumBets().call({
            from: accounts[0],
        });
        for (let i = 0; i < numBets; i++) {
            let bet = await exercise.methods.getBet(i).call({
                from: accounts[0]
            });
            assert(bet[0], accounts[i + 1]);
            assert(bet[1], web3.utils.toWei('20', 'gwei'))
        }
    });

    it('pays out', async() => {
        await exercise.methods.submitBet().send({
            from: accounts[1],
            value: web3.utils.toWei('1', 'ether'),
            gas: 3000000
        });
        await exercise.methods.submitBet().send({
            from: accounts[2],
            value: web3.utils.toWei('2', 'ether'),
            gas: 3000000
        });


        let data = processReturn([
            [accounts[0], 0.02],
            [accounts[1], 0.04]
        ]);

        let workouts = await exercise.methods.workoutCount().call({
            from: accounts[0],
        });

        let frequency = await exercise.methods.frequency().call({
            from: accounts[0],
        });

        let balance = await exercise.methods.getBalance().call({
            from: accounts[0],
        });

        await exercise.methods.pay(accounts[0], balance * workouts / frequency).send({
            from: accounts[0],
            gas: 3000000
        });

        balance = await exercise.methods.getBalance().call({
            from: accounts[0],
        });


        for (let i = 0; i < data.length; i++) {
            await exercise.methods.pay(data[i][0], balance * data[i][1]).send({
                from: accounts[0],
                gas: 3000000
            });
        }
        balance = await exercise.methods.getBalance().call({
            from: accounts[0],
        });
        assert(balance,0);
    });
});