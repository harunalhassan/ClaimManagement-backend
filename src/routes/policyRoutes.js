const express = require('express');
const { createPolicy, getAllPolicies } = require('../controllers/policyController');

const router = express.Router();


router.post('/policies', createPolicy);

router.get('/policies', getAllPolicies);

module.exports = router;