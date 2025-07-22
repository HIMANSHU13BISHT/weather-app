import React from 'react'
import {LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts'

// 🎨 Background style based on weather
const getBackground = (type) => {
  switch (type.toLowerCase()) {
    case "clear":
      return "bg-gradient-to-r from-blue-400 to-yellow-300";
    case "clouds":
      return "bg-gradient-to-r from-gray-400 to-gray-700";
    case "rain":
    case "drizzle":
      return "bg-gradient-to-r from-blue-600 to-gray-500";
    case "thunderstorm":
      return "bg-gradient-to-r from-indigo-700 to-gray-900";
    case "snow":
      return "bg-gradient-to-r from-white to-blue-100 text-gray-800";
    default:
      return "bg-gradient-to-r from-slate-300 to-slate-500";
  }
};

const WeatherCard = ({ data, hourlyData }) => {
  const { name, weather, main, wind, sys } = data;
  const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  const bgClass = getBackground(weather[0].main);

  const formattedChartData = hourlyData?.slice(0, 12).map(hour => ({
    time: new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    temp:   Math.round(hour.main?.temp || 0)
  })) || [];

  return (
    <div className={`text-white p-6 rounded-2xl shadow-xl w-full max-w-xl mx-auto mt-6 transition-all duration-300 ${bgClass}`}>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-3xl font-bold">{name}</h2>
          <p className="text-lg capitalize text-white/90">{weather[0].description}</p>
        </div>
        <img src={icon} alt="Weather icon" className="w-16 h-16" />
      </div>

      {/* Temperature */}
      <p className="text-5xl font-extrabold my-4">{Math.round(main.temp)}°C</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 text-base mt-6">
        <div className="flex items-center gap-2">
          <span className="text-xl">💧</span>
          <span>Humidity: <strong>{main.humidity}%</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl">🌬️</span>
          <span>Wind: <strong>{wind.speed} km/h</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl">🌡️</span>
          <span>Feels like: <strong>{Math.round(main.feels_like)}°C</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl">🔁</span>
          <span>Pressure: <strong>{main.pressure} hPa</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl">🌄</span>
          <span>Sunrise: <strong>
            {new Date(sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </strong></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl">🌇</span>
          <span>Sunset: <strong>
            {new Date(sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </strong></span>
        </div>
      </div>

      {/* Line Chart */}
      {formattedChartData.length > 0 && (
        <div className="mt-8 bg-white rounded-xl p-4 text-gray-800 shadow-md">
          <h3 className="text-lg font-semibold mb-3 text-blue-700">Hourly Temperature</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={formattedChartData}>
              <XAxis dataKey="time" />
              <YAxis unit="°C" />
              <Tooltip />
              <Line type="monotone" dataKey="temp" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
export default WeatherCard;
