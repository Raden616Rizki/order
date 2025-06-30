const router = require('express').Router();
const { postRegister, postLogin } = require('../controller/auth.controller');

router.route('/register')
    .post(postRegister);

router.route('/login')
    .post(postLogin);

module.exports = router;