const Email = require('./src/utils/email');

const token = 'ABC123';
const name = 'Raden Rizki';
const email = 'rizkiraden616@gmail.com';

(async () => {
    await Email.sendConfirmationEmail(token, name, email);
    console.log('Email sent successfully');
})();