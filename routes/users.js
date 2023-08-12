const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
} = require('../controller/users');
const {
    authorization,
    roleAuthorization,
} = require('../middleware/authorization');
const advancedQueries = require('../middleware/advancedQueries');

router
    .route('/')
    .get(
        authorization,
        advancedQueries(User),
        roleAuthorization(['admin']),
        getAllUsers
    )
    .post(authorization, roleAuthorization(['admin']), createUser);

router
    .route('/:id')
    .get(authorization, roleAuthorization(['admin']), getUser)
    .delete(authorization, roleAuthorization(['admin']), deleteUser)
    .put(authorization, roleAuthorization(['admin']), updateUser);

module.exports = router;
