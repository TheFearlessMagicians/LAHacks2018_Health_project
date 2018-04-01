const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'detect aspect culture end focus jeans cinnamon kite yellow balcony toast easy',
    "https://rinkeby.infura.io/5EV30OwgXAK4IhOe667x",
    2,
    2
);


const web3 = new Web3(provider);

const seedData = [{
        frequency: 5,
        calorieTargetPerWorkout: 400,
        endTimeFromStart: 40000000,
        intialBetByPlayer: web3.utils.toWei('0.1', 'ether'),
        betAgainst: web3.utils.toWei('0.2', 'ether'),
        goal: "I want to kickstart my fitness jouney",
        description: "I am trying to workout 5 times a week and burn 400kcal per workout."
    },
    {
        frequency: 6,
        calorieTargetPerWorkout: 900,
        endTimeFromStart: 34000000,
        intialBetByPlayer: web3.utils.toWei('0.3', 'ether'),
        betAgainst: web3.utils.toWei('0.4', 'ether'),
        goal: "my wife and i want to kickstart our fitness jouney",
        description: "We trying to workout 5 times a week and burn 900kcal per workout."
    }
]







seedData.forEach( async (data, i) => {
    const accounts =  await web3.eth.getAccounts((err,res)=>{
        if (err)
            console.log(err);
        console.log('response');
        console.log(res);
    });
        console.log(accounts);
        console.log('Attempting to deploy from account', accounts[i])
        let exercise = await new web3.eth.Contract(JSON.parse(interface)).deploy({ data: bytecode, arguments: [data.frequency, data.calorieTargetPerWorkout, data.endTimeFromStart] }).send({ from: accounts[i], gas: '6000000' });
        console.log(exercise.options.address);

        if (i == 0) {
            await exercise.methods.deposit().send({
                from: accounts[0]
            });
            await exercise.methods.submitBid({
                from: accounts[1]
            });

        } else {
            await exercise.methods.deposit().send({
                from: accounts[1]
            });
            await exercise.methods.submitBid({
                from: accounts[0]
            });
        };
})
