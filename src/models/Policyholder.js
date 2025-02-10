const mongoose = require('mongoose');

const policyholderSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  contactDetails: {
    phone: String,
    email: String,
    address: String
  },
  policies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Policy' }]
});

module.exports = mongoose.model('Policyholder', policyholderSchema);
