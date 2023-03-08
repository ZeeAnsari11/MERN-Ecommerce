import express  from "express";
import { createUser, loginUser, logOutUser, forgotPassword , resetPassword, getUserProfile, updatePassword, allUsers, getUserDetails, updateProfile, updateUserByAdmin, deleteUserByAdmin} from "../controllers/userAuthController.js";
import { isUserAuthenticated , authorizedRole} from "../middlewares/auth.js";

 const userAuthRouter = express.Router();

userAuthRouter.route('/register').post(createUser);
userAuthRouter.route('/login').post(loginUser);
userAuthRouter.route('/logout').get(logOutUser);
userAuthRouter.route('/password/forgot').post(forgotPassword);
userAuthRouter.route('/password/reset/:token').put(resetPassword);
userAuthRouter.route('/me').get(isUserAuthenticated, getUserProfile);
userAuthRouter.route('/me/update').put(isUserAuthenticated, updateProfile);
userAuthRouter.route('/password/update').put(isUserAuthenticated, updatePassword);

// admin Routes
userAuthRouter.route('/admin/allusers').get(isUserAuthenticated, authorizedRole("admin"), allUsers);
userAuthRouter.route('/admin/user/:id')
.get(isUserAuthenticated, authorizedRole("admin"), getUserDetails)
.put(isUserAuthenticated, authorizedRole("admin"), updateUserByAdmin)
.delete(isUserAuthenticated, authorizedRole("admin"), deleteUserByAdmin);






export {userAuthRouter};