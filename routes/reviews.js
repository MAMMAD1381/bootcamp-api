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



router
    .route('/')
    .get(getReviews)
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
