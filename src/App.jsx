import classes from "./App.module.css";
import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import Information from "./components/Information/Information";
import WeatherDetails from "./components/WeatherDetails/WeatherDetails";
import FiveDaysForecast from "./components/FiveDaysForecast/FiveDaysForecast";
import HourlyForecast from "./components/HourlyForecast/HourlyForecast";

function App() {
    // State variables to manage input value, weather data, error messages, and geolocation errors
    const [inputValue, setInputValue] = useState('');
    const [data, setData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [geolocationError, setGeolocationError] = useState('');
    // Endpoint for fetching weather data
    const endpoint = `https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=b1e067f341373632bff23482cd3b953f&q=${inputValue}`;

    // Function to fetch weather data from API
    const fetchData = async () => {
        setErrorMessage('');
        try {
            const response = await fetch(endpoint);
            if (!response.ok) {
                setErrorMessage('City not found or invalid request');
            } else {
                const data = await response.json();
                setData(data);
            }
        } catch (error) {
            setErrorMessage(error);
        }
    };

    // Effect hook to fetch weather data based on geolocation 
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetch(`https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=b1e067f341373632bff23482cd3b953f&&lat=${latitude}&lon=${longitude}`)
                        .then((response) => response.json())
                        .then((data) => {
                            setData(data);
                        })
                        .catch((error) => {
                            setGeolocationError('Invalid API key!', error);
                        });
                },
                (error) => {
                    setGeolocationError(error.message);
                }
            );
        } else {
            setGeolocationError("Geolocation not available in this browser.");
        }
    }, []);

    // Function to handle search form submission
    const handleSearch = (e) => {
        e.preventDefault();
        fetchData();
        setInputValue('');
    };

    return (
        <div className={classes.weatherApp}>
            {geolocationError && <h5 className={classes.geolocationError}>{geolocationError}</h5>}
            {data !== null
                ? (
                    <div className={classes.weatherAppContainer}>
                        <SearchBar setInputValue={setInputValue}
                            handleSearch={handleSearch}
                            errorMessage={errorMessage} />

                        <div className={classes.firstSide}>
                            <Information data={data} />
                            <WeatherDetails data={data} />
                        </div>

                        <div className={classes.secondSide}>
                            <FiveDaysForecast data={data} />
                            <HourlyForecast data={data} />
                        </div>
                    </div>
                ) : (<p className={classes.message}>This app need to access your location!</p>)}
        </div>
    )
};

export default App;
