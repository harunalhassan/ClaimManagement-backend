const swaggerJSDoc = require('swagger-jsdoc');
const Claim = require('../models/Claim');
const Policy = require('../models/Policy');
const { validateClaimAmount, isPolicyValid } = require('../utils/validations');



async function createClaim(req, res) {
    const { policyId, claimAmount, description } = req.body;

    try {
        // Check if the policy exists
        const policy = await Policy.findById(policyId);
        if (!policy) return res.status(404).json({ error: "Policy not found" });

        // Validate policy status and claim amount
        if (!isPolicyValid(policy)) return res.status(400).json({ error: "Policy is expired" });
        if (!validateClaimAmount(claimAmount, policy)) return res.status(400).json({ error: "Claim amount exceeds policy limit" });

        // Generate a unique claim ID
        const claimId = `CLM${Date.now()}`;

        // Create and save claim
        const claim = new Claim({ claimId, policyId, claimAmount, description });
        await claim.save();

        res.status(201).json(claim);
    } catch (error) {
        console.error("Error creating claim:", error);
        res.status(500).json({ error: "Failed to create claim" });
    }
}

async function getAllClaims(req, res) {
    try {
        const claims = await Claim.find().populate('policyId');
        res.json(claims);
    } catch (error) {
        console.error("Error fetching claims:", error);
        res.status(500).json({ error: "Failed to fetch claims" });
    }
}

async function getClaimById(req, res) {
    try {
        const claim = await Claim.findById(req.params.id).populate('policyId');
        if (!claim) return res.status(404).json({ error: "Claim not found" });
        res.json(claim);
    } catch (error) {
        console.error("Error fetching claim:", error);
        res.status(500).json({ error: "Failed to fetch claim" });
    }
}

async function updateClaimStatus(req, res) {
    try {
        const { status } = req.body;
        if (!["Pending", "Approved", "Rejected"].includes(status)) {
            return res.status(400).json({ error: "Invalid status update" });
        }

        const claim = await Claim.findByIdAndUpdate(
            req.params.id, 
            { status, updatedAt: new Date() },  // Explicitly update 'updatedAt'
            { new: true } // Return the updated document
        );

        if (!claim) return res.status(404).json({ error: "Claim not found" });

        res.json(claim);
    } catch (error) {
        console.error("Error updating claim status:", error);
        res.status(500).json({ error: "Failed to update claim status" });
    }
}

async function deleteClaim(req, res) {
    try {
        const claim = await Claim.findByIdAndDelete(req.params.id);
        if (!claim) return res.status(404).json({ error: "Claim not found" });

        res.status(204).send();
    } catch (error) {
        console.error("Error deleting claim:", error);
        res.status(500).json({ error: "Failed to delete claim" });
    }
}

module.exports = { createClaim, getAllClaims, getClaimById, updateClaimStatus, deleteClaim };
