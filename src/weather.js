import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import './App.css';

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [history, setHistory] = useState([]);
    const [error, setErorr] = useState('');


    const fetchData = async (selectedCity) => {
        const cityName = selectedCity || city.trim();
        if (!cityName) return;

        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/weather?q=${cityName}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
            );

            setWeatherData(response.data);
            setHistory(prevHistory => [...new Set([...prevHistory, cityName])]);
            setErorr('');


        } catch (error) {
            setErorr('City not found, Please try again .');

        }
    };

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    return (
        <section >
            <h3 className="head">Weather Forecast</h3>
            <form onSubmit={handleSubmit} className="form-container">
                <input type="text" value={city} onChange={handleInputChange} placeholder="Enter your city" className="input-field"/>
                <button className="cover-button" type="submit">Get Weather</button>
            </form>

            <div className="city-buttons">
                {["Johannesburg", "Pretoria", "Cape-Town", "Durban", "Nelspruit", "Taung", "Maseru","Venda", "Free-State"].map((cityName) => (
                    <button key={cityName} onClick={() => fetchData(cityName)} className="city-button">{cityName} </button>
                ))}
            </div>

            {error && <p className="error"></p>}

            {weatherData && (
                <div className="weather-info">
                    <h2>{weatherData.name}</h2>
                    <p>{moment().format('ddd')}, {moment().format('LL')}</p>
                    <p>Temparature: {weatherData.main.temp}°C </p>
                    <p>Humidity: {weatherData.main.humidity} %</p>
                    <p>Condition: {weatherData.weather[0].description}</p>
                </div>
            )}

            {/* <h3 className="bar">Search History</h3> */}
            <ul>
                {history.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </section>
    );
};

export default WeatherApp;