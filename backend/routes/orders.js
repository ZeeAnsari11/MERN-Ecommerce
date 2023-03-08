import  express from "express";
import { isUserAuthenticated,  authorizedRole} from "../middlewares/auth.js";
import { newOrder , getSingleOrder, getMyOrders, getAllOrders, updateOrder, deleteOrder} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.route("/order/new").post(isUserAuthenticated, newOrder)
orderRouter.route("/order/:id").get(isUserAuthenticated, getSingleOrder)
orderRouter.route("/orders/me").get(isUserAuthenticated, getMyOrders)

// Admin Routes
orderRouter.route("/admin/orders/all").get(isUserAuthenticated,authorizedRole('admin'), getAllOrders)
orderRouter.route("/admin/order/:id").put(isUserAuthenticated,authorizedRole('admin'), updateOrder)
                                     .delete(isUserAuthenticated ,authorizedRole('admin'), deleteOrder)





export {orderRouter}; 