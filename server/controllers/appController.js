

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
    res.status(200).json('User Register')
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