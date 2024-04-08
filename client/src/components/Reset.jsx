import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/Username.module.css'
import { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { resetPasswordValidate } from '../helper/validate'
import { useNavigate } from 'react-router-dom'

const Reset = () => {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_pwd: "",
    },
    validate: resetPasswordValidate, // Validation function. Must return an error object or promise that throws an error object where that object keys map to corresponding value.
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values)
      navigate('/password')
    }
  })

  return (
    <div className='container mx-auto'>
      <Toaster position='top-right' reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>

          <div className="title flex flex-col items-center gap-2">
            <h4 className="text-5xl font-bold">Reset</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter new password.
            </span>
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className='py-1'
          >
            <div className="textbox flex flex-col items-center gap-6">
              <input {...formik.getFieldProps('password')} type="text" className={styles.textbox} placeholder='Password' />
              <input {...formik.getFieldProps('confirm_pwd')} type="text" className={styles.textbox} placeholder='Confirm Password' />
              <button className={styles.btn} type='submit'>Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Reset
