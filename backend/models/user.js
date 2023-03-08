import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'
import  JsonWebToken from "jsonwebtoken";
import crypto from 'crypto';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxlength: [30, "User Name Can't Exceed 30 Characters"],
        trim: true
    },
    email: {
        type: String,
        require: [true, "Please Enter You Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter Valide Email Address"]
    },
    password: {
        type: String,
        require: [true, "Please Enter You Password"],
        minlength: [6, "Your Password Must be Longer than 6"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }

    },
    role: {
        type: String,
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    resertPasswordToken: {
        type: String
    },
    resertPasswordExpire: {
        type: Date
    }
})
//  Encrypt password before saveing user
userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();
    bcrypt.genSalt(10).then((salt) => bcrypt.hash(this.password, salt).then((password) => {
        this.password = password;
        next();
    }))

});

// compare user password
userSchema.methods.comparePassword = async function(enteresPassword){
    return await bcrypt.compare(enteresPassword , this.password);
        
}

// Return JWT
userSchema.methods.getJwtToken = function(){
    return JsonWebToken.sign({id : this._id,name: "jksahdjksahjdkha"}, process.env.JWT_SECRETE,{
        expiresIn : process.env.JWT_EXPIRES_TIME
    })
}

// Generate Password Reset Token
userSchema.methods.getResetPasswordToken = function(){
    // Generate Token
    const resetToken = crypto.randomBytes(20).toString('hex');  

    // hash and set to resertPasswordToken
    this.resertPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // set Token Expire Time

    this.resertPasswordExpire = Date.now() + 30 *60 *1000
    return resetToken;
}

export const UserModel = mongoose.model("UserModel", userSchema, 'User Collection')