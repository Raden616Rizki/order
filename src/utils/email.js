const sgMail = require('@sendgrid/mail');
const format = require('string-template');

const { SENDGRID_API_KEY, SENDGRID_NOREPLY_EMAIL } = require('../../config');

// Set the sendgrid API Key
sgMail.setApiKey(SENDGRID_API_KEY);

const email = `Hello {userName} <br/><br/>
    Welcome to the Online Book Order App. Please use the below token to confirm your email address<br/>
    <h3 style="color: black; font-weight: bold;">{token}</h3><br/><br/>
    <p style="font-size:15px; color: red;">N.B: Please don't reply to this email</p>`;

exports.sendConfirmationEmail = (token, userName, userEmail) => {
    // Create the email message
    const msg = {
        to: userEmail,
        from: SENDGRID_NOREPLY_EMAIL,
        subject: 'Confirm Your Email Address For Registration in Online Book Order App',
        html: format(email, {
        userName,
        token,
        }),
    };

    // Send the email
    return sgMail.send(msg);
};