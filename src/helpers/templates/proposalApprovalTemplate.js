

const proposalApprovalTemplate = (workerName,phone,workHeading,workLocation) => {
    return `<p>
       .<br />
      Hello ${workerName} your proposal for this ${workHeading} has been approved you can start working as given rules and detail.
      </p>`;
  };
  
  module.exports = proposalApprovalTemplate;