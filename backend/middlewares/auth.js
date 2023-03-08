import JsonWebToken from "jsonwebtoken";
import { UserModel } from "../models/user.js";

//  checks if user is authenticated or not 

export const isUserAuthenticated = (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            throw "Login First to Access the Resoucres"
        }
        const decoded = JsonWebToken.verify(token, process.env.JWT_SECRETE);
        UserModel.findById(decoded.id)
            .then((user) => {
                // console.log("============user=========", user);
                req.user = user;
                // console.log("================req.user.id", req.user.id);
                next();
            });
    }
    catch (error) {
        next({ err: error, statusCode: 401 });
    }

}

export const authorizedRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next({ err: `${req.user.role} not allowed to access this resource`, statusCode: 403 });
        }
        next();
    }
}
