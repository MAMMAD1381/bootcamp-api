const errorMessage = require('../utils/ErrorMessage')
function errorHandler(error, req, res, next){
    console.log(error)


    //cast error on mongoose
    if(error.name === 'CastError'){
        error = new errorMessage(`requested resource with id: ${error.value} doesn't exists`, 404)
    }

    //duplicate key error on mongoose
    if(error.code === 11000){
        error = new errorMessage(`duplicate resource is being added`, 400)
    }


    res.status(error.statusCode || 500).send({
        success: false,
        error: error.message || 'server error'
    })
}

module.exports = errorHandler