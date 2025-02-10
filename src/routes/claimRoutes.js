const express = require('express');
const { createClaim, getAllClaims, getClaimById, updateClaimStatus, deleteClaim } = require('../controllers/claimController');

const router = express.Router();


router.post('/claims', createClaim);


router.get('/claims', getAllClaims);


router.get('/claims/:id', getClaimById);


router.put('/claims/:id/status', updateClaimStatus);


router.delete('/claims/:id', deleteClaim);

module.exports = router;