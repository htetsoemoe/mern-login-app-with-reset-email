import { Router } from "express";
const router = Router()

/** Import all controllers */
import * as controller from '../controllers/appController.js'
import { registerMail } from "../controllers/mailer.js";
import Auth, { localVariables } from "../middlewares/auth.js";

/** POST Methods */
router.route('/register').post(controller.register) // register user
router.route('/registerMail').post(registerMail) // send the mail
router.route('/authenticate').post(controller.verifyUser, (req, res) => res.end()) // verify the user
router.route('/login').post(controller.verifyUser, controller.login) // login user

/** GET Methods */
router.route('/user/:username').get(controller.getUser) // get user with username
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP) // generate random OTP
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP) // verify generated OTP
router.route('/createResetSession').get(controller.createResetSession) // reset all the variables

/** PUT Methods */
router.route('/updateUser').put(Auth, controller.updateUser) // update the user's profile
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword) // reset password

export default router