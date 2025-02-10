const Policyholder = require('../models/Policyholder');

async function createPolicyholder(req, res) {
    const { name, dob, contactDetails } = req.body;
    
    try {
        const policyholder = new Policyholder({ name, dob, contactDetails });
        await policyholder.save();  // Save the new policyholder to the database
        res.status(201).json(policyholder);
    } catch (error) {
        res.status(500).json({ error: "Failed to create policyholder" });
    }
}

async function getAllPolicyholders(req, res) {
    try {
        const policyholders = await Policyholder.find();  // Retrieve all policyholders from the database
        res.json(policyholders);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch policyholders" });
    }
}

async function getPolicyholderById(req, res) {
    const { id } = req.params;
    
    try {
        const policyholder = await Policyholder.findById(id);  // Find policyholder by ID in the database
        if (!policyholder) return res.status(404).json({ error: "Policyholder not found" });
        res.json(policyholder);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch policyholder" });
    }
}

module.exports = { createPolicyholder, getAllPolicyholders, getPolicyholderById };
