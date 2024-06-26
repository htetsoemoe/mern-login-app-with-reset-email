import React from 'react'
import styles from '../styles/Username.module.css'
import { Toaster } from 'react-hot-toast'

const Recovery = () => {
  return (
    <div className='container mx-auto'>
      <Toaster position='top-right' reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>

          <div className="title flex flex-col items-center gap-2">
            <h4 className="text-5xl font-bold">Recovery</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter OTP to recover password.
            </span>
          </div>

          <form
            className='py-1'
          >
            <div className="textbox flex flex-col items-center gap-6">
              <span className="mt-5 text-sm text-left text-gray-500">
                Enter 6 digits OTP sent to your email address.
              </span>
              <input type="text" className={styles.textbox} placeholder='OTP' />
              <button className={styles.btn} type='submit'>Recover</button>
            </div>
          </form>

          <div className="text-center py-4">
            <span className="text-gray-500">
              Can't get OTP?
              <button className="text-red-500 ml-5">Resend</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recovery
