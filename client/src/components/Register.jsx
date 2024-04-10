import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import avatar from '../assets/profile.png'
import styles from '../styles/Username.module.css'
import { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { registerFormValidation } from '../helper/validate'
import { useNavigate } from 'react-router-dom'
import convertToBase64 from '../helper/convert'

const Register = () => {
  const navigate = useNavigate()
  const [file, setFile] = useState()

  const formik = useFormik({
    initialValues: {
      email: 'name@gmail.com',
      username: 'admin@coco',
      password: "admin@123"
    },
    validate: registerFormValidation, // Validation function. Must return an error object or promise that throws an error object where that object keys map to corresponding value.
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      //Copy the values of all of the enumerable own properties from one or more source objects to a target object. Returns the target object.
      values = Object.assign(values, { profile: file || '' })
      console.log(values)

    }
  })

  /** formik dose not support file upload so we need to create this handler */
  const onUpload = async (event) => {
    const base64 = await convertToBase64(event.target.files[0]) // don't forget 'await'
    setFile(base64)
  }

  return (
    <div className='container mx-auto'>
      <Toaster position='top-right' reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass_for_register}>

          <div className="title flex flex-col items-center gap-2">
            <h4 className="text-5xl font-bold">Hello Again!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Happy to join you!
            </span>
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className='py-1'
          >
            <div className="profile flex justify-center py-4">
              <label htmlFor='profile'>
                <img src={file || avatar} alt="avatar" className={styles.profile_img} />
              </label>
              <input
                type="file"
                onChange={onUpload}
                name="profile" id="profile"
              />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input {...formik.getFieldProps('email')} type="text" className={styles.textbox} placeholder='Email*' />
              <input {...formik.getFieldProps('username')} type="text" className={styles.textbox} placeholder='Username*' />
              <input {...formik.getFieldProps('password')} type="text" className={styles.textbox} placeholder='Password*' />
              <button className={styles.btn} type='submit'>Register</button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Already Register?
                <Link to={'/'} className='text-red-500 ml-3 hover:underline'>Login</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
