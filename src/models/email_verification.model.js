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

    return {
        name,
        ...EmailVerificationHelper,
        create
    }
}