const Policy = require('../models/Policy');


// Create a new policy and associate it with a policyholder
async function createPolicy(req, res) {
    const { policyName, coverageAmount, validityPeriod } = req.body;
    
    try {
        

        // Create a new policy
        const policy = new Policy({
            policyName,
            coverageAmount,
            validityPeriod
        });

        // Save the policy to the database
        await policy.save();

        

        res.status(201).json(policy);
    } catch (error) {
        console.error("Error creating policy:", error);
        res.status(500).json({ error: "Failed to create policy" });
    }
}

// Retrieve all policies from the database
async function getAllPolicies(req, res) {
    try {
        const policies = await Policy.find();
        res.json(policies);
    } catch (error) {
        console.error("Error fetching policies:", error);
        res.status(500).json({ error: "Failed to retrieve policies" });
    }
}

module.exports = { createPolicy, getAllPolicies };
