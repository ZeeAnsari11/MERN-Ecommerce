import express from "express"
import {getProducts , newProduct, getSignleProduct, updateProductById, deleteProductById} from "../controllers/productController.js"
import {isUserAuthenticated, authorizedRole} from "../middlewares/auth.js";

const productRouter = express.Router();

productRouter.route('/product/:id').get(getSignleProduct);
productRouter.route('/products').get(getProducts);


// admin Routes For Products
productRouter.route('/admin/product/new').post(isUserAuthenticated,authorizedRole("admin"), newProduct);
productRouter.route('/admin/product/:id').put(isUserAuthenticated,authorizedRole("admin"),updateProductById).delete(isUserAuthenticated,authorizedRole("admin"),deleteProductById);


export {productRouter}