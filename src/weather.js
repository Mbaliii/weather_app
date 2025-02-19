import React, {useState} from "react";
import axios from "axios";
import moment from "moment";
import './App.css';


const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [history, setHistory] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
            );
            setWeatherData(response.data);
            setHistory(prevHistory => [...prevHistory, city]);
            
        } catch (error) {
            console.log(error);
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
        <section>
            <form onSubmit={handleSubmit}>
                <input type="text" value={city} onChange={handleInputChange} placeholder="Enter your city"/>
                <button className="cover-button" type="Enter">Get Weather</button>
            </form>

            {weatherData &&  (
                <div>
                    <h2>{weatherData.name}</h2>
                    <p>{moment().format('dddd')}, {moment().format('LL')}</p>
                    <p>Temparature:{weatherData.main.temp} °C</p>
                    <p>Humidity: {weatherData.main.humidity} %</p>
                </div>
            )}

            <h3>Search History</h3>
            <ul>
                {history.map((item, index) =>(
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </section>
    )
};

export default WeatherApp;