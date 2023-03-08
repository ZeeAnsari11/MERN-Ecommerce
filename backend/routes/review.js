import express from "express";
import { createProductReview , getProductReviews, deleteProductReviews} from "../controllers/reviewController.js";
import { isUserAuthenticated, authorizedRole } from "../middlewares/auth.js";

export const reviewRouter = express.Router();

reviewRouter.route('/review').post(isUserAuthenticated, createProductReview)
reviewRouter.route('/product/reviews/:P_id').get(isUserAuthenticated, getProductReviews)
reviewRouter.route('/reviews').delete(isUserAuthenticated, deleteProductReviews)

