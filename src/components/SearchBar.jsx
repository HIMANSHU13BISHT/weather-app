import React from 'react'

const SearchBar = ({fetchWeather}) => {

    const handleSubmit = (e)=>{ 
        e.preventDefault();
        const city = e.target.elements.city.value.trim();
        if(city){
            fetchWeather(city);
        }
        e.target.reset();
    }
  return (
    <form onSubmit={handleSubmit}
    className='flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center
    bg-white shadow-md p-4 rounded-2xl w-full max-w-xl mx-auto'>
        <input type="text" name='city' placeholder='Enter City...' 
        className='flex-1 w-full px-5 py-3 rounded-xl border border-gray-300 
        focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-sm text-black '/>   
        <button type='submit' 
        className='bg-gradient-to-r from-blue-500 to-blue-700 text-white 
        px-4 py-2 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-800 transition-all 
        duration-200 shadow-md'>🔍 Search</button>
    </form>
  )
}

export default SearchBar