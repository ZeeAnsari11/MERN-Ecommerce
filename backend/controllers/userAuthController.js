import { UserModel } from "../models/user.js";
import { sendToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";



// Create New User   /api/v1/register

export const createUser = (req, res, next) => {
    const { name, email, password } = req.body;
    UserModel.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'AL5GRJW-WvsGUx5BHHjCAh-36VEasjVm2Ocp0yoRyP8e=s900-c-k-c0x00ffffff-no-rj',
            url: 'https://yt3.googleusercontent.com/ytc/AL5GRJW-WvsGUx5BHHjCAh-36VEasjVm2Ocp0yoRyP8e=s900-c-k-c0x00ffffff-no-rj'
        }
    }).then((user) => {
        sendToken(user, 200, res);
    })
        .catch((error) => {
            next({ err: error, statusCode: 404 });
        })
}

//  loginUser   /api/v1/login

export const loginUser = (req, res, next) => {
    try {
        const { email, password } = req.body;

        // checck If email and password enteres by user or not 

        if (!email || !password) {

            throw "Please Enter Email and Password"
        }

        //  Finding user in Database;
        UserModel.findOne({ email }).select('+password').then((user) => {
            if (!user) {
                throw "Invalid Email and Password / User Not Found"
            }
            // checks if password is correct or not
            user.comparePassword(password)
                .then((isPasswordMatched) => {
                    if (!isPasswordMatched) {
                        throw "Invalid Email and Password"
                    }
                    sendToken(user, 200, res)
                })
                .catch((error) => {
                    next({ err: error, statusCode: 401 });
                });
        })

    }
    catch (error) {
        next({ err: error, statusCode: 401 });
    }
}

// api/v1/logout
export const logOutUser = (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
}

// Forgot Password           api/v1/password/forgot
export const forgotPassword = (req, res, next) => {

    UserModel.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                throw `User Not Found for this email ${req.body.email}`
            }

            // get Reset Token
            const resetToken = user.getResetPasswordToken();

            user.save({ validateBeforeSave: false })
                .then((result) => {

                    //  create reset password Url
                    const url = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;
                    const message = `Your Password reset token is as follow : \n\n${url} \n\n If you have not requestes this , You can simply ignore it `

                    sendEmail({
                        email: user.email,
                        subject: "KhreedLo Password Recovery ",
                        message,

                    })
                        .then((result) => {
                            res.status(200).json({
                                success: true,
                                message: `Email sent to ${user.email}`
                            })
                        })
                        .catch((err) => {
                            throw err;
                        })

                })
                .catch(async (error) => {
                    user.resertPasswordToken = undefined;
                    user.resertPasswordExpire = undefined;
                    await user.save({ validatorBeforeSave: false });
                    next({ err: error, statusCode: 500 });
                })
        })
        .catch((error => {
            next({ err: error, statusCode: 404 });
        }))

}

// Reset Password           api/v1/password/reset/:token
export const resetPassword = (req, res, next) => {
    //  hash the URL token
    const resertPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    UserModel.findOne({
        resertPasswordToken,
        resertPasswordExpire: { $gt: Date.now() }
    })
    .then((user)=>{
        if (!user) {
            throw `Password Reset Token is Invalid or has been Expired`;
        }

        if(req.body.password !== req.body.confirmPassword){
            throw "Password Does Not Matched";
        }

        // setUp the new Password
        user.password = req.body.password;
        user.resertPasswordToken = undefined;
        user.resertPasswordExpire = undefined;

        user.save().then((user)=>{
            sendToken(user , 200 , res)
        })
    })
    .catch((error => {
        next({ err: error, statusCode: 400 });
    }))
}

// get Currently Logged In user Details         api/v1/me

export const getUserProfile = (req, res, next) => {
    UserModel.findById(req.user.id)
    .then((user)=>{
        res.status(200).json({
            success: true,
            user
        })
    })
}

// update user profile              api/v1/me/update

export const updateProfile = (req, res, next)=>{
    const newData = {
        name : req.body.name,
        email : req.body.email
    }

     UserModel.findByIdAndUpdate(req.user.id , newData, {
        new : true,
        runValidators : true
    }).then((user)=>{
        res.status(200).json({
            success: true,
            user
        })
    })
    .catch((error)=>{
        next({ err: error, statusCode: 400 });
    })

}


// Update and change password of currently loggedIn user         api/v1/password/update

export const  updatePassword = (req, res, next) => {

    UserModel.findById(req.user.id).select('+password')
    .then((user) => {
        if (!user) {
            throw "Invalid Email and Password / User Not Found"
        }
        // checks if password is correct or not
        user.comparePassword(req.body.oldPassword)
            .then((isPasswordMatched) => {
                if (!isPasswordMatched) {
                    throw "Old Password is Incorrect"
                }
                user.password = req.body.password;
                user.save();
                sendToken(user, 200, res);
            })
            .catch((error) => {
               throw error;
            });
        })
        .catch((error)=>{
            next({ err: error, statusCode: 401 });
        })
}

//  Admin Routes

// Get All users                api/v1/admin/users

export const allUsers = (req, res , next)=>{
    UserModel.find()
    .then((users)=>{
        res.status(200).json({
            success: true,
            users
        })
    })
}

//  Get specific User datails        api/v1/admin/user/:id

export const getUserDetails = (req, res , next)=>{
    UserModel.findById(req.params.id)
    .then((user)=>{
        res.status(200).json({
            success: true,
            user
        })
    })
}

// update user profile              api/v1/admin/user/:id
export const updateUserByAdmin = (req, res, next)=>{
    const newData = {
        name : req.body.name,
        email : req.body.email,
        role : (req.body.role) ? req.body.role : null
    }

     UserModel.findByIdAndUpdate(req.params.id , newData, {
        new : true,
        runValidators : true
    }).then((user)=>{
        res.status(200).json({
            success: true,
            user
        })
    })
    .catch((error)=>{
        next({ err: error, statusCode: 400 });
    })

}

// update user profile              api/v1/admin/user/:id
export const deleteUserByAdmin = (req, res, next)=>{

     UserModel.findById(req.params.id)
     .then((user)=>{
        if (!user) {
            throw `User Not Found `
        }
        user.remove()
        .then((result)=>{
            res.status(200).json({
                success: true,
                message : "user Deleted"
            })
        })
        .catch((error)=>{
            throw error
        })
        
    })
    .catch((error)=>{
        next({ err: error, statusCode: 400 });
    })

}