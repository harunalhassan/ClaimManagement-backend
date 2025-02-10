const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
  policyName: String,
  coverageAmount: Number,
  validityPeriod: {
    startDate: Date,
    endDate: Date
  }
});

module.exports = mongoose.model('Policy', policySchema);
