import { useState } from 'react'
import SearchBar from './components/SearchBar'
import Loader from './components/Loader';
import WeatherCard from './components/WeatherCard';
import NotFound from './components/NotFound';
import axios from 'axios'

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [hourlyData, setHourlyData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

const getBackgroundByWeather = (weatherType) => {
  switch (weatherType.toLowerCase()) {
    case 'clear':
      return 'bg-clear';
    case 'clouds':
      return 'bg-clouds';
    case 'rain':
    case 'drizzle':
      return 'bg-rain';
    case 'thunderstorm':
      return 'bg-thunder';
    case 'snow':
      return 'bg-snow';
    case 'mist':
    case 'haze':
    case 'fog':
      return 'bg-fog';
    default:
      return 'bg-default';
  }
};


  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(false);
    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );
      const weather = res.data;
      setWeatherData(weather);

      const { lat, lon } = weather.coord;
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      setHourlyData(forecastRes.data.list);

    } catch (error) {
      setError(true)
      setWeatherData(null)
      setHourlyData([])
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const bgClass = weatherData ? getBackgroundByWeather(weatherData.weather[0].main) : 'bg-blue-100';

  return (
    <div className={`relative min-h-screen bg-cover bg-center ${bgClass || 'bg-default'}`}>
      {/* dark overlay */}
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

      {/* main content */}
      <div className="relative z-10 flex flex-col items-center justify-start p-8">
        <h1 className='text-4xl font-bold mb-6 text-white'>Weather App</h1>
        <SearchBar fetchWeather={fetchWeather} />
        {loading && <Loader />}
        {error && <NotFound />}
        {weatherData && (
          <WeatherCard data={weatherData} hourlyData={hourlyData} />
        )}
      </div>
    </div>
  )
}

export default App
