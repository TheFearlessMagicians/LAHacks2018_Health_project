// const HDWalletProvider = require('truffle-hdwallet-provider');
const ganache = require('ganache-cli');
const provider = ganache.provider();
const Web3 = require('web3');
const web3 = new Web3(provider);
const { interface, bytecode } = require('./compile');
const i = process.argv[2];
const axios = require('axios');
let j = (i==1) ? 0 : 1;

// const mnemonic = 'defense tiny cotton way bamboo tumble also tube disorder surge ask visual';
// const provider = new HDWalletProvider(mnemonic,"https://rinkeby.infura.io/5EV30OwgXAK4IhOe667x", i,2
// );

// const provider1 = new HDWalletProvider(mnemonic,"https://rinkeby.infura.io/5EV30OwgXAK4IhOe667x", j,2)

// const web3 = new Web3(provider);
// const web31 = new Web3(provider1);

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

const deploy = async() => {
    const accountArray = await web3.eth.getAccounts();
    // const account1Array = await web31.eth.getAccounts();
    const account = accountArray[0]; const account1 = accountArray[1];
    console.log('Attempting to deploy from account', account)
    let exercise = await new web3.eth.Contract(JSON.parse(interface)).deploy({ data: bytecode, arguments: [seedData[i].frequency, seedData[i].calorieTargetPerWorkout, seedData[i].endTimeFromStart] }).send({ from: account, gas: '5000000' });
    console.log(`Deploying at ${exercise.options.address}`);
    await exercise.methods.deposit().send({
    	value: web3.utils.toWei('0.02', 'ether'),
        from: account,
        gas: '5000000'
    });

    console.log('Attempting to bet from', account1);
    try {
	    await exercise.methods.submitBet().send({
	        from: account1,
	        value: web3.utils.toWei('0.02', 'ether'),
	        gas: "3000000"
	    });
    } catch (error){
    	console.log(error);
    }
    console.log('Set up completed for',i);
    
    axios.post('http://localhost:8000/contract',{
    	address: exercise.options.address,
    	goal: seedData[i].goal,
    	description: seedData[i].description
    }).then(response => console.log(response.data.message)).catch(error=>{console.log('AXIOS ERROR');console.log(error)});
}
deploy();