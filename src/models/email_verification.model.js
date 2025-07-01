const { stat } = require('fs');
const createModelHelper = require('../helpers/model.helper');

const name = 'EmailVerification';
const tableName = 'email_verification';

const selectableProps = [
    'token',
    'email',
]

module.exports = (knex) => {
    const EmailVerificationHelper = createModelHelper({
        knex,
        name,
        tableName,
        selectableProps,
    });
    
    const create = (props) => EmailVerificationHelper.create(props);

    const verifyEmail = async (email, token) => {
        const emailVerification = await knex.select()
            .from(tableName)
            .where({ email })

        if (emailVerification.length > 0) {
            if (emailVerification[0].token === token) {
                await knex('users')
                    .update({
                        email_verification_status: 'VERIFIED',
                    }).where({ email });
                
                return {
                    status: true,
                    message: 'Email Verified successfully',
                }
            }
        } else {
            return null;
        }

        throw new Error('Invalid Token!');
    }

    return {
        name,
        ...EmailVerificationHelper,
        create,
        verifyEmail
    }
}