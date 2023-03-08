import { ProductModel } from '../models/products.js';
import { search, filter, pagination } from "../utils/APIFeatures.js";

// Get All the Products from DB    api/v1/products
export const getProducts = (req, res, next) => {
    let name = req.query.name
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 11;

    delete req.query.name;
    delete req.query.page;
    delete req.query.limit;

    ProductModel.find()
        .then((products) => {
            if (name) {
                products = search(products, 'name', name);
                if (products.length === 0) {
                    throw (`Product Not Exist For This Keyword ${name}`)
                }
            }
            if (Object.keys(req.query).length) {
                products = filter(products, req.query)
            }
            if(page && limit){
               products = pagination(products, limit, page);
            }
        
            res.status(200).json({
                success: true,
                count: products.length,
                products
            })
        })

        .catch((error) => {
            next({ err: error, statusCode: 404 });
        })
}

// Create New Products in DB    /api/v1/admin/product/new

export const newProduct = (req, res, next) => {
    req.body.user = req.user.id;
    ProductModel.create(req.body)
        .then((response) => {
            res.status(200).json({
                success: true,
                response
            })
        })
        .catch((error) => {
            next({ err: error, statusCode: 404 });
        })
}


// Get Single Product from DB using id    /api/v1/product/:id

export const getSignleProduct = (req, res, next) => {
    ProductModel.findById(req.params.id)
        .then((product) => {
            if (!product) {
                throw ("Product Not Found");
            }
            else {
                res.status(200).json({
                    success: true,
                    product
                })
            }
        })
        .catch((error) => {
            next({ err: error, statusCode: 404 });

        })
}

// Update Product from DB using id   /api/v1/admin/product/:id

export const updateProductById = (req, res, next) => {
    ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((product) => {
            if (!product) {
                next({ err: error, statusCode: 404 });
            }
            else {
                res.status(200).json({
                    success: true,
                    product
                })
            }
        })
        .catch((error) => {
            next({ err: error, statusCode: 404 });
        })
}

export const deleteProductById = (req, res, next) => {
    ProductModel.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(200).json({
                success: true
            })
        })
        .catch((error) => {
            next({ err: error, statusCode: 404 });
        })
}