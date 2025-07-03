const crypto = require('crypto');
const { User, EmailVerification } = require('../models');
const Email = require('../utils/email')
const {
    createError,
    UNAUTHORIZED,
    BAD_REQUEST,
    NOT_FOUND,
    CONFLICT,
    GENERAL_ERROR,
} = require('../helpers/error.helper');

const confirmEmail = async (name, email) => {
    const token = crypto.randomBytes(8).toString('hex');
    EmailVerification.create({ token, email })
        .then(() => Email.sendConfirmationEmail(token, name, email));
}

const postRegister = async (req, res, next) => {
    const props = req.body.user;

    if (!props.email || !props.password || !props.first_name || !props.last_name || !props.role) {
        return next(createError({
            status: BAD_REQUEST,
            message: 'Email, password, first_name, last_name dan role are required',
        }));
    }

    if (!props.password && props.password.length < 6) {
        return next(createError({
            status: BAD_REQUEST,
            message: 'Password should be at least 6 characters long',
        }));
    }

    try {
        let user = await User.findOne({ email: props.email });
        
        if (user) {
            return next(createError({
                status: CONFLICT,
                message: 'Email already exists',
            }));
        }

        user = await User.create(props);
        await confirmEmail(`${props.first_name} ${props.last_name}`, props.email);

        res.json({
            ok: true,
            message: 'User registered successfully',
            user
        });
    } catch (e) {
        return next(createError({
            status: GENERAL_ERROR,
            message: 'Internal Server Error',
        }));
    }
}

const postLogin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(createError({
            status: BAD_REQUEST,
            message: 'Email and password are required',
        }));
    }

    try {
        const user = await User.verify(email.trim(), password.trim());

        if (!user) {
            return next(createError({
                status: NOT_FOUND,
                message: 'Email or password is not found',
            }));
        }

        return res.json({
            ok: true,
            message: 'Login successful',
            token: user.token,
            verified: user.email_verification_status === 'VERIFIED' ? true : false,
        })
    } catch (e) {
        return next(createError({
            status: UNAUTHORIZED,
            message: e,
        }));
    }
}

const verifyEmail = async (req, res, next) => {
    const { email, token } = req.body;

    if (!email || !token) {
        return next(createError({
            status: BAD_REQUEST,
            message: 'Email and token are required',
        }));
    }

    try {
        const verified = await EmailVerification.verifyEmail(email, token);
        if (!verified) {
            return next(createError({
                status: NOT_FOUND,
                message: 'Email verification failed',
            }));
        }
        return res.json(verified);
    } catch (e) {
        return next(createError({
            status: UNAUTHORIZED,
            message: e,
        }));
    }
}

module.exports = {
    postRegister,
    postLogin,
    verifyEmail
}