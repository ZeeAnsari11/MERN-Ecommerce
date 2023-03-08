import mongoose from "mongoose";

const  orderSchema = mongoose.Schema({

    shippingInfo : {
        address : {
            type : String,
            required : true
        },
        city : {
            type : String,
            required : true
        },
        phoneNo : {
            type : String,
            required : true
        },
        postalCode : {
            type : String,
            required : true
        },
        country : {
            type : String,
            required : true
        },
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required :true,
        ref : 'UserModel'
    },
    orderItems:[
        {
            name:{
                type:String,
                required :true
            },
            quantity:{
                type:Number,
                required :true
            },
            image:{
                type:String,
                required :true
            },
            price:{
                type:Number,
                required :true
            },
            product : {
                type : mongoose.Schema.Types.ObjectId,
                required :true,
                ref : 'ProductModel'
            }      
        }
    ],
    paymentInfo : {
        id:{
            type: String,
            required : true
        },
        status: {
            type : String
        }
    },
    paidAt:{
        type : Date
    },
    itemsPrice :{
        type:Number,
        required :true,
        default : 0.0
    },
    taxPrice :{
        type:Number,
        required :true,
        default : 0.0
    },
    shippingPrice :{
        type:Number,
        required :true,
        default : 0.0
    },
    totalPrice :{
        type:Number,
        required :true,
        default : 0.0
    },
    orderStatus:{
        type: String,
        require : true,
        default : "processing"
    },
    deliveredAt : {
        type : Date
    },
    createdAt : {
        type :Date,
        default : Date.now
    }
    
})

export const OrderModel = mongoose.model('Orders' ,orderSchema, "Orders  Collection")

