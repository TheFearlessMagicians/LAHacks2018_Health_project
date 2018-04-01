let express = require('express');
let router = express.Router({ mergeParams: true });

//Mongoose
let mongoose = require('mongoose');

//Models
let Contract = require('../models/contract');

let Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');
const mnemonic = 'defense tiny cotton way bamboo tumble also tube disorder surge ask visual';
const {interface, bytecode} = require('../compile');

router.get("/contracts", (req, res) => {
    Contract.find({ active: true }).lean().exec((error, contracts) => {
        if (error) {
            res.json({
                "message": "Error Contract not found."
            });
        } else {
            res.json(contracts);
        }
    });
});

router.get("/contract/:address", (req, res) => {
    if (req.params.address != null) {
        Contract.findById(req.params.address).lean().exec((error, contract) => {
            if (error || contract == null) {
                res.send({
                    "message": "Error Contract not found."
                });
            } else {
                res.json(contract);
            }
        });
    } else {
        res.send({
            "message": "Error Contract not found."
        });
    }
});

router.post("/contract", (req, res) => {
    const address = req.body.address;
    const description = req.body.description;
    const goal = req.body.goal;
    const endDate = req.body.endDate;
    if (address) {
        Contract.find({
            address: address
        }).lean().exec((error, foundContracts) => {
            if (error) {
                res.json({
                    "message": "Error contract creation failed."
                });
            } else {
                if (foundContracts.length == 0) {
                    Contract.create({
                        address: address,
                        description: description,
                        goal: goal,
                        endDate: endDate
                    }, err => {
                        if (err) {
                            res.json({
                                "message": "Error contract creation failed."
                            });
                        } else {
                            res.json({ "message": "Contract created succesfully." });
                        }
                    });
                } else {
                    res.json({ "message": "Contract with this address already exists." });
                }
            }
        });
    } else {
        res.json({ "message": "Error address is undefined." })
    }
});


router.post ("/deploy", async (req,res)=>{
    const index = Number(req.body.index)%2;

    const description = req.body.description;
    const goal = req.body.goal;
    const endDate = req.body.endDate;

    const frequency = req.body.frequency;
    const calorieTarget = req.body.caloriesPerWorkout;

    const provider = new HDWalletProvider(mnemonic,"https://rinkeby.infura.io/orDImgKRzwNrVCDrAk5Q"/*,index,2*/);
    const web3 = new Web3(provider);

    const accounts =  await web3.eth.getAccounts();;
    const account = accounts[0];

    let exercise = await new web3.eth.Contract(JSON.parse(interface)).deploy({ data: bytecode, arguments: [frequency, calorieTarget, endDate] }).send({ from: account, gas: '5000000' });
    const address = exercise.options.address;

    console.log(description, goal, endDate, frequency, calorieTarget);
    Contract.create({
        address: address,
        description: description,
        goal: goal,
        endDate: endDate
    }, (error, contractCreated)=>{
        if(error){
            res.json({"message": "Contract creation failed"});
        } else {
            res.json({
                "message": "Contract creation succeeded",
                "address": address
            });
        }
    });
    console.log(`Contract deployed from ${account} on ${address}`);
});

router.put("/contract/:address", (req, res) => {
    Contract.findOne({ address: req.params.address }).lean().exec((error, contract) => {
        if (error) {
            console.log(error);
            res.json({
                "message": "Error contract updation failed."
            });
        } else {
            if (!contract) {
                res.json(contractError);
            } else {
                contract.active = false;
                contract.save(error => {
                    if (error) {
                        res.json({
                            "message": "Error contract updation failed."
                        });
                    } else {
                        res.json({ "message": "Contract updated succesfully." });
                    }
                });
            }
        }
    });
});


module.exports = router;
