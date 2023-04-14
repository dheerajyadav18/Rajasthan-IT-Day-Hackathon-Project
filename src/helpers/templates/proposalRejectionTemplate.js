

const proposalRejectionTemplate = (name,workHeading) => {
  return `<p>
    Sorry for ignoring the work .<br />
    Hello I am ${name} not able to do work ${workHeading}
    </p>`;
};

module.exports = proposalRejectionTemplate;