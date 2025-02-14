const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
  claimId: String,
  policyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Policy' },
  claimAmount: Number,
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }  // New field to track updates
});

// Middleware to update `updatedAt` on document update
claimSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Claim', claimSchema);
