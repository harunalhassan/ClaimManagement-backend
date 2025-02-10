function isPolicyValid(policy) {
  console.log("Checking Policy:", policy);
    console.log("Start Date:", policy.validityPeriod.startDate);
    console.log("End Date:", policy.validityPeriod.endDate);
  const today = new Date();
  return  today <= new Date(policy.validityPeriod.endDate);
}

function validateClaimAmount(claimAmount, policy) {
  return claimAmount <= policy.coverageAmount;
}

module.exports = { isPolicyValid, validateClaimAmount };
