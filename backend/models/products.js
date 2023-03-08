import mongoose from "mongoose";

const  productSchema = mongoose.Schema({
    name :{
        type: String,
        required : [true, "Please Enter Name of Product"],
        maxlength : [100 , "Product Name Can't Exceed 100 Characters"],
        trim :  true
    },
    sex:{
        type:String
    },
    price :{
        type: Number,
        required : [true, "Please Enter Price of Product"],
        maxlength : [5 , "Product Price Can't Exceed 5 Characters"],
        default : 0.0
    },
    description :{
        type: String,
        required : [true, "Please Enter Product Description"],
        maxlength : [100 , "Product Name Can't Exceed 100 Characters"]
    },
    weight:{
        type: Number
    },
    ratings :{
        type: Number,
        default: 0
    },
    images :[
        {
            public_id : {
                type : String,
                required : true
            },
            url : {
                type : String,
                required : true
            }
        }
    ],
    category : {
        type : String,
        required : [true , "Please Select Category for the Product "],
        enum:{
            values : [
                'Electronics',
                'Cameras',
                'Laptop',
                'Accessories',
                'Headpones',
                'Food',
                'Books',
                'Cloths/Shoes',
                'Beauty/Heath',
                'Spots',
                'OutDoor',
                'Home'
            ],
            messsage : 'Please Slecet Correct category for this product'
        }
    },
    seller:{
        type: String,
        required : [true , 'Please Enter the Product Seller']
    },
    stock:{
        type: Number,
        required : [true , 'Please Enter the Product Stock'],
        maxlength : [5, 'Product can\'t exceed 5 cheracters ']
    },
    numOfReviews:{
        type: Number,
        default : 0
    },
    reviews : [
        {
            name:{
                type: String,
                required : true
            },
            rating : {
                type: Number,
                required : true
            },
            comment : {
                type : String,
                required : true
            },
            user : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'UserModel',
                required :true
            },
        }
    ],
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'UserModel',
        required :true
    },
    createdAt : {
        type :Date,
        default : Date.now
    }

})

export const  ProductModel = mongoose.model('ProductModel' ,productSchema, "Product Collection")