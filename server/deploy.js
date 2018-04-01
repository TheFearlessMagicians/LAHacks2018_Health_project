const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
	'defense tiny cotton way bamboo tumble also tube disorder surge ask visual',
	"https://rinkeby.infura.io/5EV30OwgXAK4IhOe667x" 
);


const web3 = new Web3(provider);

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();
	console.log('Attempting to deploy from account', accounts[0])
    let exercise = await new web3.eth.Contract(JSON.parse(interface)).deploy({ data: bytecode, arguments: [4, 400, 604800] }).send({ from: accounts[0], gas: '6000000' });
    console.log(exercise.options.address);
    console.log(interface);
};

deploy();