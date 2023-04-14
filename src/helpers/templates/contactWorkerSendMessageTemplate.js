

const contactWorkerSendMessageTemplate = (workerName, userName, phone, email, message, address) => {
    return `<p>
    <h2>Hey ${workerName}</h2>
    You have an enquiry from ${userName} for a work. Please Contact him on following details : <br />
    <ul>
    <li>Name : ${userName}</li>
    <li>Email : ${email}</li>
    <li>Phone : ${phone}</li>
    <li>Message : ${message}</li>
    <li>Address : ${address}</li>
    </ul>
  </p>`;
};

module.exports = contactWorkerSendMessageTemplate;
