import UserModel from "../models/User.model.js"
import bcrypt from "bcrypt"
import errorHandler from "../utils/errorHandler.js"

/** Middleware fo verify user */
export async function verifyUser(req, res, next) {
    res.status(200).json('Verify User')
}

/** POST: http://localhost:3500/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/
export async function register(req, res, next) {
    const { username, email, password, profile } = req.body

    if (
        !username ||
        !password ||
        !email
    ) {
        return next(errorHandler(400, 'username, password, email are required'))
    }

    try {
        // check existedUser or existedEmail
        const existedUser = await UserModel.findOne({ username: username })
        const existedEmail = await UserModel.findOne({ email: email })
        if (existedUser || existedEmail) {
            return next(errorHandler(404, 'Already existed username or email'))
        }

        const hashedPassword = bcrypt.hashSync(password, 10)
        const newUser = new UserModel({
            username,
            password: hashedPassword,
            email,
            profile: profile || ''
        })
        await newUser.save()
        res.status(201).json('User created successfully')
    } catch (error) {
        next(error)
    }
}

/** POST: http://localhost:3500/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/
export async function login(req, res, next) {
    res.status(200).json('Login')
}

/** GET: http://localhost:3500/api/user/example123 */
export async function getUser(req, res, next) {
    res.status(200).json('Get user')
}

/** PUT: http://localhost:3500/api/updateuser 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
export async function updateUser(req, res, next) {
    res.status(200).json('Update user')
}

/** GET: http://localhost:3500/api/generateOTP */
export async function generateOTP(req, res, next) {
    res.status(200).json('Generate OTP')
}

/** GET: http://localhost:3500/api/verifyOTP */
export async function verifyOTP(req, res, next) {
    res.status(200).json('Verify OTP')
}

// successfully redirect user when OTP is valid
/** GET: http://localhost:3500/api/createResetSession */
export async function createResetSession(req, res, next) {
    res.status(200).json('createResetSession')
}

// update the password when we have valid session
/** PUT: http://localhost:3500/api/resetPassword */
export async function resetPassword(req, res, next) {
    res.status(200).json('resetPassword')
}