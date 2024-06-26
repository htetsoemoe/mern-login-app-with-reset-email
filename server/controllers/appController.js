import UserModel from "../models/User.model.js"
import bcrypt from "bcrypt"
import errorHandler from "../utils/errorHandler.js"
import jwt from 'jsonwebtoken'
import otpGenerator from 'otp-generator'

/** Middleware fo verify user */
export async function verifyUser(req, res, next) {
    try {
        const { username } = req.method === 'GET' ? req.query : req.body
        // Check User exist
        let exist = await UserModel.findOne({ username })
        if (!exist) return res.status(404).json("Can't find user!")
        next()
    } catch (error) {
        return res.status(404).json('Authentication Error: Wrong Username')
    }
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
        if (existedUser) {
            return next(errorHandler(404, 'Already existed username'))
        }
        if (existedEmail) {
            return next(errorHandler(404, 'Already existed email'))
        }

        const hashedPassword = bcrypt.hashSync(password, 10)
        const newUser = new UserModel({
            username,
            password: hashedPassword,
            email,
            profile: profile || ''
        })
        await newUser.save()
        res.status(201).json({ msg: 'User registration successfully' })
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
    const { username, password } = req.body

    if (!username || !password || username === '' || password === '') {
        return next(errorHandler(400, "All fields are required!"))
    }

    try {
        const validUser = await UserModel.findOne({ username })
        if (!validUser) {
            return next(errorHandler(404, 'User not found: Wrong username'))
        }

        const validPassword = bcrypt.compareSync(password, validUser.password)
        if (!validPassword) {
            return next(errorHandler(400, 'Wrong Password'))
        }

        // Generate JWT Token
        const token = jwt.sign({
            userId: validUser._id,
            username: validUser.username
        }, process.env.JWT_SECRET)

        res.status(200)
            .json({
                msg: "Login Successful",
                username: validUser.username,
                token
            })
    } catch (error) {
        next(error)
    }
}

/** GET: http://localhost:3500/api/user/example123 */
export async function getUser(req, res, next) {
    try {
        const user = await UserModel.findOne({ username: req.params.username })
        if (!user) {
            return next(errorHandler(404, 'User not found'))
        }
        // remove password from found user
        const { password, ...rest } = user._doc
        res.status(201).json(rest)
    } catch (error) {
        next(error)
    }
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
    // const id = req.query.id
    const { userId } = req.user // userId and username
    if (!userId) {
        return next(errorHandler(401, 'Unauthorized User!'))
    }

    let hashedPassword = null
    if (req.body.password) {
        hashedPassword = bcrypt.hashSync(req.body.password, 10)
    }

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            { _id: userId },
            {...req.body, password: hashedPassword},
            { new: true }
        )

        const { password: pass, ...rest } = updatedUser._doc
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

/** GET: http://localhost:3500/api/generateOTP */
export async function generateOTP(req, res, next) {
    req.app.locals.OTP = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
    })
    res.status(201).json({ code: req.app.locals.OTP })
}

/** GET: http://localhost:3500/api/verifyOTP */
export async function verifyOTP(req, res, next) {
    const { code } = req.query
    if (parseInt(req.app.locals.OTP) === parseInt(code)) {
        req.app.locals.OTP = null // reset the OTP code
        req.app.locals.resetSession = true // start session for reset password
        return res.status(201).json({ msg: "Verify Successfully!" })
    }
    return res.status(400).json({ error: "Invalid OTP" })
}

// successfully redirect user when OTP is valid
/** GET: http://localhost:3500/api/createResetSession */
export async function createResetSession(req, res, next) {
    if (req.app.locals.resetSession) {  // req.app.locals.resetSession = true
        return res.status(201).json({ flag: req.app.locals.resetSession })
    }
    return res.status(404).json({ error: "Session expired!" })
}

// update the password when we have valid session
/** PUT: http://localhost:3500/api/resetPassword */
export async function resetPassword(req, res, next) {
    if (!req.app.locals.resetSession) {
        return res.status(404).json({ error: "Session expired!" })
    }

    const { username, password } = req.body

    try {
        const foundUser = await UserModel.findOne({ username })
        if (!foundUser) {
            return next(errorHandler(404, 'User not found'))
        }

        const hashedPassword = bcrypt.hashSync(password, 10)
        const updatedUserPassword = await UserModel.findByIdAndUpdate(
            { _id: foundUser._id },
            { password: hashedPassword },
            { new: true }
        )
        // const { password: pass, ...rest } = updatedUserPassword._doc
        req.app.locals.resetSession = false // reset session 
        return res.status(201).json({
            // updatedUserPassword: rest,
            msg: "Updated Password Successful!"
        })

    } catch (error) {
        next(error)
    }
}