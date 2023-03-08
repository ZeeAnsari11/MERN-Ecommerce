//  create and send token and save in the http only cookie

export const sendToken  = (user, statusCode , res)=>{
    // create JWt Token
    const token =  user.getJwtToken();

    // Options for the Cookie
    const options =  {
        expires : new Date( Date.now() + process.env.COOKIE__EXPIRES_TIME *24* 60* 60* 1000),
        httpOnly: true
    }

    res.status(statusCode).cookie('token', token , options).json({
        success : true,
        token,
        user
    })

} 