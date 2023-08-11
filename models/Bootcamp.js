const mongoose = require('mongoose');
const slugify = require('slugify')
const geoCoder = require('../utils/geoCoder')
const Course =  require('./Course')
const Review = require('./Review')
require('colors')

const BootcampSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
            unique: true,
            trim: true,
            maxlength: [50, 'Name can not be more than 50 characters']
        },
        slug: String,
        description: {
            type: String,
            required: [true, 'Please add a description'],
            maxlength: [500, 'Description can not be more than 500 characters']
        },
        website: {
            type: String,
            match: [
                /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
                'Please use a valid URL with HTTP or HTTPS'
            ]
        },
        phone: {
            type: String,
            maxlength: [20, 'Phone number can not be longer than 20 characters']
        },
        email: {
            type: String,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email'
            ]
        },
        address: {
            type: String,
            required: [true, 'Please add an address']
        },
        location: {
            // GeoJSON Point
            type: {
                type: String,
                enum: ['Point']
            },
            coordinates: {
                type: [Number],
                index: '2dsphere'
            },
            formattedAddress: String,
            street: String,
            streetNumber: String,
            city: String,
            state: String,
            zipcode: String,
            country: String,
            countryCode: String
        },
        careers: {
            // Array of strings
            type: [String],
            required: true,
            enum: [
                'Web Development',
                'Mobile Development',
                'UI/UX',
                'Data Science',
                'Business',
                'Other'
            ]
        },
        averageRating: {
            type: Number,
            min: [1, 'Rating must be at least 1'],
            max: [10, 'Rating must can not be more than 10']
        },
        averageCost: Number,
        photo: {
            type: String,
            default: 'no-photo.jpg'
        },
        housing: {
            type: Boolean,
            default: false
        },
        jobAssistance: {
            type: Boolean,
            default: false
        },
        jobGuarantee: {
            type: Boolean,
            default: false
        },
        acceptGi: {
            type: Boolean,
            default: false
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// ? adding slug
BootcampSchema.pre('save', function (next){
    this.slug = slugify(this.name, {lower: true})
    next()
})

// ? geocoder
BootcampSchema.pre('save', async function (next) {
    let location = await geoCoder.geocode(this.address)
    this.location = {
        type: 'point',
        coordinates: [location[0].longitude, location[0].latitude],
        formattedAddress: location[0].formattedAddress,
        street: location[0].streetName,
        streetNumber: location[0].streetNumber,
        city: location[0].city,
        state: location[0].stateCode,
        zipcode: location[0].zipcode,
        country: location[0].country,
        countryCode: location[0].countryCode
    }
    this.address = undefined
    next()
})

BootcampSchema.pre('deleteOne', { document: true }, async function(next) {
    console.log(`Courses being removed from bootcamp ${this._id}`.red);
    await Course.deleteMany({ bootcamp: this._id });
    await Review.deleteMany({bootcamp: this._id})
    next();
});

BootcampSchema.virtual('courses', {ref: 'Course', localField: '_id', foreignField: 'bootcamp', justOne:false})

BootcampSchema.virtual('reviews', {ref: 'Review', localField: '_id', foreignField: 'bootcamp', justOne:false})

module.exports = mongoose.model('Bootcamp', BootcampSchema)