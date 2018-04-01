# Before everything
## Install Metamask on Chrome and google rinkeby-faucet and give yourself max tokens
## There are some imports so you have to require a lot of these things


# Deploying A contract
```js
//See deploy.js same thing
```

# Start and end
```js
let start = await exercise.methods.start().call({
    from: accounts[0]
});
let end = await exercise.methods.end().call({
    from: accounts[0]
}); //obviously this is fake for testing purposes
```

# Log a workout 
```js
await exercise.methods.logWorkOut(<calories>).call({
    from: accounts[0]
});
```

# Workouts and frequency
```js
let workouts = await exercise.methods.getWorkoutCount().call({
    from: accounts[0],
});

let frequency = await exercise.methods.frequency().call({
    from: accounts[0],
});
```

# Submit a bet
```
await exercise.methods.submitBet().send({
    from: accounts[1],
    value: web3.utils.toWei('0.02', 'ether'),
    gas: 3000000
});
```

# Number of bets
```js
let numBets = await exercise.methods.getNumBets().call({
    from: accounts[0],
});
```

# Money on contract
```js
balance = await exercise.methods.getBalance().call({
    from: accounts[0],
});
```

# Processing Returns
```js
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

let data = processReturn([
    [accounts[0], 0.02], //there will be more for you this is dynamic!
    [accounts[1], 0.04]
]);

let workouts = await exercise.methods.getWorkoutCount().call({
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
```

There is a more, ask me and i will luk
