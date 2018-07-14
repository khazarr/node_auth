const express = require('express');
const router = require('express-promise-router')();

const UsersController = require('../controllers/users');
const {
    validateBody,
    schemas
} = require('../helpers/routeHelpers');

router.route('/signup')
    .post(validateBody(schemas.authSchema), UsersController.signUp);

router.route('/signin')
    .post(UsersController.signIn);

router.route('/secret')
    .get(UsersController.secret);


module.exports = router;