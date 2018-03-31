let express = require('express');
let router = express.Router({ mergeParams: true });

//Mongoose
let mongoose = require('mongoose');

//Models
let Contract = require('../models/contract');

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
        Contract.findById(req.params.address, (error, contract) => {
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
    let address = req.body.address;
    if (address) {
        Contract.find({
            address: address
        }, (error, foundContracts) => {
            if (error) {
                res.json({
                    "message": "Error contract creation failed."
                });
            } else {
                if (foundContracts.length == 0) {
                    Contract.create({
                        address: address
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

router.put("/contract/:address", (req, res) => {
    Contract.findOne({ address: req.params.address }, (error, contract) => {
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
                })
            }
        }
    });
});


module.exports = router;