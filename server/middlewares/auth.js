import jwt from 'jsonwebtoken'

/** auth middleware */
export default async function Auth(req, res, next) {
    try {
        // access authorization header to validate request
        const token = req.headers.authorization.split(" ")[1]

        // retrieve the user details of the logged in user
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET) // {userId: '661e1c034b95e1d9d09a5087', username: 'kokohtet', iat: 1714102963}
        req.user = verifyToken  // set verifyToken in request for next middleware
        next()
    } catch (error) {
        res.status(401).json({ error: "Unauthorized User!" })
    }
}

/** 
 * The app.locals object is a JavaScript object, and its properties are local variables within the application.
 * Once set, the value of app.locals properties persist throughout the life of the application
 * 
 * Ref: https://stackoverflow.com/questions/35111143/express4-whats-the-difference-between-app-locals-res-locals-and-req-app-local
 */
export function localVariables(req, res, next) {
    req.app.locals = {
        OTP: null,
        resetSession: false,
    }
    next()
}