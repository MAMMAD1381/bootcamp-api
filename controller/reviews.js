const Review = require('../models/Review');
const errorMessage = require('../utils/ErrorMessage');
const asyncHandler = require('../middleware/async');
const Bootcamp = require('../models/Bootcamp');
require('dotenv');

// ? get all reviews of a bootcamp (or all reviews of all bootcamps for admin)
exports.getReviews = asyncHandler(async function (req, res, next) {
    if (!req.params.id)
        return next(new errorMessage('bootcamp id is required', 400));

    let bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp)
        return next(new errorMessage(`bootcamp doesn't exists`, 404));

    let reviews = await Review.find({ bootcamp: req.params.id });
    res.status(200).send({
        success: true,
        count: reviews.length,
        data: reviews,
    });
});

// ? get a single review
exports.getReview = asyncHandler(async function (req, res, next) {
    if (!req.params.id)
        return next(new errorMessage('review id is required', 400));
    let review = await Review.findOne({ _id: req.params.id });
    if (!review) return next(new errorMessage(`review doesn't exists`, 404));
    res.status(200).send({ success: true, data: review });
});

// ? create a review (user and admin)
exports.createReview = asyncHandler(async function (req, res, next) {
    if (!req.params.id)
        return next(new errorMessage('bootcamp id is required', 400));

    let bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp)
        return next(new errorMessage(`bootcamp doesn't exists`, 404));

    req.body.bootcamp = req.params.id;
    req.body.user = req.user.id;

    let review = await Review.create(req.body);
    res.status(201).send({ success: true, data: review });
});

// ? update review (owner and admin)
exports.updateReview = asyncHandler(async function (req, res, next) {
    if (!req.params.id)
        return next(new errorMessage('review id is required', 400));

    let review = await Review.findByIdAndUpdate(req.params.id, req.body, {runValidators:true, new:true})

    res.status(200).send({ success: true, data:  review});
});

// ? delete a review (owner and admin)
exports.deleteReview = asyncHandler(async function (req, res, next) {
    res.status(200).send({ success: true, data: 'review deleted' });
});
