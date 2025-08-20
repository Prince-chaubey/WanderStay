class ExpressError extends Error {
    constructor(code, message) {
        super(message); 
        this.code = code; 
    }
}

module.exports = ExpressError;
