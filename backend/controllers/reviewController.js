import { ProductModel } from "../models/products.js";


// Create Pdocuct review and if loggedIn user already posted the review then update the existing one        api/v1/review
export const createProductReview = (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    ProductModel.findById(productId)
        .then((product) => {
            const isReviewed = product.reviews.find((review) => {
                return review.user.toString() === req.user.id
            })
            if (isReviewed) {
                product.reviews.forEach((review) => {
                    if (review.user.toString() === req.user._id.toString()) {
                        review.comment = comment;
                        review.rating = rating;
                    }
                })
            }
            else {
                product.reviews.push(review);
                product.numOfReviews = product.reviews.length;
            }
            product.ratings = product.reviews.reduce((totalRating, review) => {
                return totalRating += review.rating;
            }, 0) / product.reviews.length

            product.save()
                .then((result) => {
                    res.status(200).json({
                        success: true,
                        Average_Rating: product.ratings,
                        Message: "Review Details"
                    })
                })
                .catch((error) => {
                    throw error
                })
        })
        .catch((error) => {
            next({ err: error, statusCode: 401 })
        })

}

// getProductReview by Product id         api/v1/product/reviews/:P_id
export const getProductReviews = (req, res, next) => {
    ProductModel.findById(req.params.P_id)
        .then((product) => {
            if (!product) {
                throw "Product Not Exist"
            }
            res.status(200).json({
                success: true,
                Product_Review: product.reviews
            })
        })
        .catch((error) => {
            next({ err: error, statusCode: 404 })
        })
}


//  Delete ProductReview by Product_id and Review_id        api/v1/product/reviews?p_id & r_id
export const deleteProductReviews = (req, res, next) => {
    ProductModel.findById(req.query.p_id)
        .then((product) => {
            if (!product) {
                throw "Product Not Exist"
            }
            product.reviews = product.reviews.filter((review) => {
                return review._id.toString() !== req.query.r_id.toString()
            })

            product.ratings = product.reviews.reduce((totalRating, review) => {
                return totalRating += review.rating;
            }, 0) / product.reviews.length

            product.numOfReviews = product.reviews.length;

            product.save()
                .then((result) => {
                    res.status(200).json({
                        success: true,
                        Average_Rating: product.ratings,
                        Message: "Review Deleted"
                    })
                })
                .catch((error) => {
                    throw error
                })

        })
        .catch((error) => {
            console.log("============error", error);
            next({ err: error, statusCode: 404 })
        })
}