export const errorHandlerMiddleWare = (err, req, res, next) => {
// console.log(err); 
const ErrorMessage  =  err.err.message || err.err || "Internal Server Error"
    res.status(err.statusCode).json({
        succes: false,
        Message : process.env.NODE_ENV === "DEVELOPMENT" ? ErrorMessage : err.err.name !== "CastError" ? ErrorMessage  : `Invalid id ${err.err.path}`,
        stack : process.env.NODE_ENV === "DEVELOPMENT" ? err.err.stack : {},   
        EmailError : process.env.NODE_ENV === "PRODUCTION" ? err.err.name === "JsonWebTokenError" ? `Invalid JWT Token` : '' : ''

    })
}
