const createModelHelper = require('../helpers/model_helper')
const bcrypt = require('bcrypt');

const name = 'User';
const tableName = 'users';

// Password will not be included
const selectableProps = [
    'id',
    'email',
    'first_name',
    'last_name',
    'role',
    'created_at',
]

// Bcrypt function used for hashing passwords
const SALT_ROUND = 10;
const hashPassword = (password) => bcrypt.hash(password, SALT_ROUND);

// Verify password
const verifyPassword = (password, hash) => bcrypt.compare(password, hash);

// This includes always hashing
// The password field prior to writing so it is never saves in plain text
const beforeSave = (user) => {
    if (!user.password) return Promise.resolve(user);

    return hashPassword(user.password)
        .then((hash) => ({ ...user, password: hash }))
        .catch((err) => `Error in hashing password: ${err}`);
}

module.exports = (knex) => {
    const userHelper = createModelHelper({
        knex,
        name,
        tableName,
        selectableProps
    });

    const create = (props) => beforeSave(props)
        .then((user) => userHelper.create(user));

    return {
        name,
        ...userHelper,
        create,
    }
}