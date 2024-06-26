import React from 'react'
import { Link } from 'react-router-dom'
import avatar from '../assets/profile.png'
import styles from '../styles/Username.module.css'
import toast, { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { passwordValidate } from '../helper/validate'
import { useNavigate } from 'react-router-dom'
import useFetch from '../hooks/fetchHook'
import { useAuthStore } from '../store/store'
import { verifyPassword } from '../helper/helper'

const Password = () => {
    const navigate = useNavigate()

    // Get username from store
    const { username } = useAuthStore(state => state.auth)
    const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`)

    const formik = useFormik({
        initialValues: {
            password: ""
        },
        validate: passwordValidate, // Validation function. Must return an error object or promise that throws an error object where that object keys map to corresponding value.
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {

            let loginPromise = verifyPassword({ username, password: values.password })
            toast.promise(loginPromise, {
                loading: 'Checking...',
                success: <b>Login Successfully...!</b>,
                error: <b>Password Not Match!</b>
            })

            loginPromise.then(res => {
                let { token } = res.data
                localStorage.setItem('token', token)
                navigate('/profile')
            })
        }
    })

    if (isLoading) return <h1 className="text-2xl font-bold">Loading...</h1>
    if (serverError) return <h1 className="text-xl text-red-700">{serverError.message}</h1>

    return (
        <div className='container mx-auto'>
            <Toaster position='top-right' reverseOrder={false}></Toaster>

            <div className="flex justify-center items-center h-screen">
                <div className={styles.glass}>

                    <div className="title flex flex-col items-center gap-2">
                        <h4 className="text-5xl font-bold">Hello {apiData?.firstName || apiData?.username}</h4>
                        <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                            Explore More by Connecting with Us.
                        </span>
                    </div>

                    <form
                        onSubmit={formik.handleSubmit}
                        className='py-1'
                    >
                        <div className="profile flex justify-center py-4">
                            <img src={apiData?.profile || avatar} alt="avatar" className={styles.profile_img} />
                        </div>

                        <div className="textbox flex flex-col items-center gap-6">
                            <input {...formik.getFieldProps('password')} type="text" className={styles.textbox} placeholder='Password' />
                            <button className={styles.btn} type='submit'>Sign In</button>
                        </div>

                        <div className="text-center py-4">
                            <span className="text-gray-500">
                                Forget Password?
                                <Link to={'/recovery'} className='text-red-500 ml-3 hover:underline'>Recover Password</Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Password
