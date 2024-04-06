import React from 'react'
import { Link } from 'react-router-dom'
import avatar from '../assets/profile.png'
import styles from '../styles/Username.module.css'
import { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { usernameValidate } from '../helper/validate'
import { useNavigate } from 'react-router-dom'

const Username = () => {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      username: ""
    },
    validate: usernameValidate, // Validation function. Must return an error object or promise that throws an error object where that object keys map to corresponding value.
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
            <h4 className="text-5xl font-bold">Hello Again!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore More by Connecting with Us.
            </span>
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className='py-1'
          >
            <div className="profile flex justify-center py-4">
              <img src={avatar} alt="avatar" className={styles.profile_img} />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input {...formik.getFieldProps('username')} type="text" className={styles.textbox} placeholder='Username' />
              <button className={styles.btn} type='submit'>Let's Go</button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Not a Member
                <Link to={'/register'} className='text-red-500 ml-3 hover:underline'>Register Now</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Username
