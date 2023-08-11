const mongoose = require('mongoose');
const Bootcamp = require('./Bootcamp')

const ReviewSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add a title for the review'],
        maxlength: 100
    },
    text: {
        type: String,
        required: [true, 'Please add some text']
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        required: [true, 'Please add a rating between 1 and 10']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    bootcamp: {
        type: mongoose.Schema.ObjectId,
        ref: 'Bootcamp',
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
});

ReviewSchema.post('save', {document: true}, async function(next){
    const Bootcamp = require('./Bootcamp')
    const Review = require('./Review')
    let bootcamp = await Bootcamp.findById(this.bootcamp)
    let reviews = await Review.find({bootcamp: bootcamp._id})
    console.log(this._id)

    let sum = 0, averageRating

    reviews.forEach(review => {
        sum = sum + parseInt(review.rating)
    });
    averageRating = sum/(reviews.length)
    await bootcamp.updateOne({averageRating}, {runValidators: false, new: true})
})

module.exports = mongoose.model('Review', ReviewSchema)