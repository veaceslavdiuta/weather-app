import classes from "./App.module.css";
import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import Information from "./components/Information/Information";
import WeatherDetails from "./components/WeatherDetails/WeatherDetails";
import FiveDaysForecast from "./components/FiveDaysForecast/FiveDaysForecast";
import HourlyForecast from "./components/HourlyForecast/HourlyForecast";

function App() {
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState(null);
  const endpoint = `https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=b1e067f341373632bff23482cd3b953f&q=${inputValue}`;

  const fetchData = async () => {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const endpoint = `https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=b1e067f341373632bff23482cd3b953f&lat=${latitude}&lon=${longitude}`;

          fetch(endpoint)
            .then((response) => response.json())
            .then((data) => {
              setData(data);
              console.log(data);
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    } else {
      console.error("Geolocation not available in this browser.");
    }
  }, [])

  const handleSearch = () => {
    fetchData();
    setInputValue('');
  };


  return (
    <div className={classes.weatherApp}>
      {data !== null ? (
        <div className={classes.weatherAppContainer}>
          <SearchBar setInputValue={setInputValue} handleSearch={handleSearch} />

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
