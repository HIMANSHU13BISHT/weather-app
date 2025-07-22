import React from 'react'
import warning from '../../public/assets/warning.png'

const NotFound = () => {
  return (
    <div className='text-center mt-8'>
        <img src={warning || null} alt="Not Found" 
        className='w-60 mx-auto'/>
        <p className='text-red-600 text-lg mt-4'>City not found. Try again!</p>
    </div>
  )
}

export default NotFound