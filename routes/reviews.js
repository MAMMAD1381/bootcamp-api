const express = require('express');
const router = express.Router({ mergeParams: true });
const Review = require('../models/Review');

const {
    getReviews,
    getReview,
    createReview,
    updateReview,
    deleteReview,
} = require('../controller/reviews');

const {
    authorization,
    ownershipAuthorization,
    roleAuthorization,
} = require('../middleware/authorization');
const advancedQueries = require('../middleware/advancedQueries');

router
    .route('/')
    .get(
        authorization,
        roleAuthorization(['admin']),
        advancedQueries(
            Review,
            { paramsName: ['id'], paths: ['bootcamp'] },
            {
                path: 'user bootcamp',
                select: 'name',
            }
        ),
        getReviews
    )
    .post(authorization, roleAuthorization(['user', 'admin']), createReview);

router
    .route('/:id')
    .get(getReview)
    .put(
        authorization,
        roleAuthorization(['admin', 'user']),
        ownershipAuthorization(Review),
        updateReview
    )
    .delete(
        authorization,
        roleAuthorization(['admin', 'user']),
        ownershipAuthorization(Review),
        deleteReview
    );
module.exports = router;
