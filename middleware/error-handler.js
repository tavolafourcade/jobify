import { StatusCodes } from "http-status-codes"
const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err.message)
    const defaultError = {
        statusCode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong, try again later'
    }
    if (err.name === 'ValidationError') {
        defaultError.statusCode = StatusCodes.BAD_REQUEST
        //defaultError.msg = err.message
        defaultError.msg = Object.values(err.errors)
        .map(item => item.message)
        .join(',')
    }
    // If an error exist and the value for the code property is 11000
    if (err.code && err.code === 11000){
        // The statusCode should be 400
        defaultError.statusCode = StatusCodes.BAD_REQUEST

        // Setting up the message
        defaultError.msg = `${Object.keys(err.keyValue)} Field has to be unique`
    }
        // res.status(defaultError.statusCode).json({msg:err})
        res.status(defaultError.statusCode).json({msg: defaultError.msg})

}

export default errorHandlerMiddleware