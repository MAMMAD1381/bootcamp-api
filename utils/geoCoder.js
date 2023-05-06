const NodeGeoCoder = require('node-geocoder')

const options = {
    provider: process.env.GEO_CODER_PROVIDER,
    httpAdapter: 'https',
    apiKey: process.env.GEO_CODER_API_KEY,
    formatter: null
}

const geoCoder = NodeGeoCoder(options)

module.exports = geoCoder