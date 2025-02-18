import React, {useState,useEffect} from "react";
import axios from "axios";
import moment from "moment";


const weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [history, setHistory] = useState([]);
}