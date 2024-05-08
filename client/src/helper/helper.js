import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

// axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN
// axios.defaults.baseURL = import.meta.env.REACT_APP_SERVER_DOMAIN

/** Make API Requests */

/** To get username from token */
export async function getUsername() {
    const token = localStorage.getItem('token')
    if (!token) return Promise.reject('Cannot find token')
    const decodedJwt = jwtDecode(token)
    return decodedJwt
}

/** Authenticate Function */
export async function authenticate(username) {
    try {
        return await axios.post(`/api/authenticate`, { username })
    } catch (error) {
        return { error: "Username doesn't exist." }
    }
}

/** Get User Details */
export async function getUser({ username }) {
    try {
        const { data } = await axios.get(`/api/user/${username}`)
        return { data }
    } catch (error) {
        return { error: "Password doesn't match." }
    }
}

/** Register User Function */
export async function registerUser(credentials) {
    try {
        const { data: { msg }, status } = await axios.post(`/api/register`, credentials)
        let { username, email } = credentials

        /** Send Email to Registered User */
        if (status === 201) {
            await axios.post('/api/registerMail', { username, userEmail: email, text: msg })
        }
        return Promise.resolve(msg)
    } catch (error) {
        Promise.reject({ error })
    }
}

/** Login Function */
export async function verifyPassword({ username, password }) {
    try {
        if (username) {
            const { data } = await axios.post('/api/login', { username, password })
            return Promise.resolve({ data })
        }
    } catch (error) {
        return Promise.reject({ error: "Password doesn't match." })
    }
}

/** Update User Profile Function */
export async function updateUser(response) {
    try {
        const token = localStorage.getItem('token')
        const data = await axios.put(`/api/updateUser`, response, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error: "Couldn't update profile." })
    }
}

/** Generate OTP */
export async function generateOTP(username) {
    try {
        const { data: { code }, status } = await axios.get('/api/generateOTP', { params: { username } })

        // send mail with the generated OTP
        if (status === 201) {
            let { data: { email } } = await getUser(username)
            let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`
            await axios.post(`/api/registerMail`, { username, userEmail: email, text, subject: "Password Recovery OTP" })
        }
        return Promise.resolve(code)
    } catch (error) {
        return Promise.reject({ error })
    }
}

/** Verify OTP */
export async function verifyOTP({ username, code }) {
    try {
        const { data, status } = await axios.get(`/api/verifyOTP`, { params: { username, code } })
        return { data, status }
    } catch (error) {
        return Promise.reject(error)
    }
}

/** Reset Password */
export async function resetPassword({ username, password }) {
    try {
        const { data, status } = await axios.put(`/api/resetPassword`, { username, password })
        return Promise.resolve({ data, status })
    } catch (error) {
        return Promise.reject({ error })
    }
}