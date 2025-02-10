const express = require('express');
const { createPolicyholder, getAllPolicyholders, getPolicyholderById } = require('../controllers/policyholderController');

const router = express.Router();


router.post('/policyholders', createPolicyholder);


router.get('/policyholders', getAllPolicyholders);


router.get('/policyholders/:id', getPolicyholderById);

module.exports = router;