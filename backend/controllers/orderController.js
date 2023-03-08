import { OrderModel } from "../models/orders.js";
import {ProductModel} from "../models/products.js"

//  create new Order            api/v1/order/new
export const newOrder = (req, res, next)=>{
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
    } = req.body;

    OrderModel.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt : Date.now(),
        user : req.user.id
    })
    .then((order)=>{
        res.status(200).json({
            success: true,
            order
        })
    })
}

//  Get Single Order            api/v1/order/:id
export const getSingleOrder = (req, res, next)=>{
    OrderModel.findById(req.params.id).populate('user', 'name email')
    .then((order)=>{
        if(!order){
            throw `No order Exist `
        }
        res.status(200).json({
            success: true,
            order
        })
    })
    .catch((error)=>{
        next({err:error , statusCode: 404});
    })
}

//  Get LoggedIn User's Order            api/v1/order/me
export const getMyOrders = (req, res, next)=>{
    OrderModel.find({user : req.user.id})
    .then((orders)=>{
        if(orders.length === 0 ){
            throw `No order has been placed by the user having email  ${req.user.email}`
        }
        res.status(200).json({
            success: true,
            orders
        })
    })
    .catch((error)=>{
        next({err:error , statusCode: 404});
    })
}

//  Get all Order            api/v1/admin/orders/all
export const getAllOrders = (req, res, next)=>{
    OrderModel.find()
    .then((orders)=>{
        if(orders.length === 0 ){
            throw `No order has been placed yet`
        }
        
        const totalAmount = orders.reduce(function(total, order) {
            return total + order.totalPrice;
          }, 0);

        res.status(200).json({
            success: true,
            TotalBill : totalAmount,
            orders
        })
    })
    .catch((error)=>{
        next({err:error , statusCode: 404});
    })
}


//  update process Order            api/v1/admin/orders/:id
export const updateOrder = (req, res, next)=>{
    OrderModel.findById(req.params.id)
    .then((order)=>{
        if(order.length === 0 ){
            throw `No order has been placed yet against orderNumber : ${req.params.id}`
        }

        if(order.orderStatus === 'Delivered'){
            throw "You have already Delivered this Order"
        }

        order.orderItems.forEach(item => {
            updateStock(item.product,  item.quantity);

                order.orderStatus = req.body.orderStatus,
                order.deliveredAt = Date.now();
                order.save();
        });

        res.status(200).json({
            success: true,
            order
        })
    })
    .catch((error)=>{
        next({err:error , statusCode: 404});
    })
}

const updateStock = (productId, ProductQuantity)=>{
    ProductModel.findById(productId)
    .then((product)=>{
        product.stock -= ProductQuantity
        console.log("==================save=========",product);
        product.save();
    })
    .catch((error)=>{
        next({err:error , statusCode: 404});
    })

}

//  Delte Order            api/v1/admin/order/:id
export const deleteOrder = (req, res, next)=>{
    OrderModel.findById(req.params.id)
    .then((order)=>{
        if(!order){
            throw `No order Exist `
        }
        order.delete()
        .then((result)=>{
            res.status(200).json({
                success: true,
                message : "Order Deleted Successfully"
            })
        })
        .catch((error)=>{
            throw error;
        })
       
    })
    .catch((error)=>{
        next({err:error , statusCode: 404});
    })
}