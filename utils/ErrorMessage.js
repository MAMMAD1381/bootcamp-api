class errorMessage extends Error{
    constructor(msg = "server error", errCode = 500) {
        super(msg);
        this.statusCode = errCode
    }
}

module.exports = errorMessage