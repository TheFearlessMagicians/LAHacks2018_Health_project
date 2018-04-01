let mongoose = require('mongoose');

let ContractSchema = new mongoose.Schema({
	created: {
		type: Date,
		default: Date.now
	},
	address: String,
	description: String,
	goal: String,
	endDate: Number,
	active: {
		type: Boolean,
		default: true
	}
});

module.exports = mongoose.model('Contract', ContractSchema);