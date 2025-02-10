const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
  claimId: String,
  policyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Policy' },
  claimAmount: Number,
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  description: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Claim', claimSchema);
