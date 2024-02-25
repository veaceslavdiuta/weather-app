import classes from "./WeatherDetails.module.css";
import imgHumedityIcon from "../../media/humidity 1.png";
import imgWindSpeedIcon from "../../media/wind 1.png";
import imgPressureIcon from "../../media/pressure-white 1.png";
import imgUvIcon from "../../media/uv-white 1.png";
import imgSunrise from "../../media/sunrise-white 1.png";
import imgSunset from "../../media/sunset-white 1.png";


function WeatherDetails(props) {
    const temp = Math.round(props.data.list[0].main.temp);
    const feelsLike = Math.round(props.data.list[0].main.feels_like);

    const sunrise = new Date(props.data.city.sunrise * 1000);
    const sunriseHours = sunrise.getHours();
    const sunriseMinutes = sunrise.getMinutes();

    const sunset = new Date(props.data.city.sunset * 1000);
    const sunsetHours = sunset.getHours();
    const sunsetMinutes = sunset.getMinutes();

    return (
        <div className={classes.weatherDetails}>
            <div className={classes.mainDetails}>
                    <h4>{temp}°C</h4>

                    <p>Feels like: <span>{feelsLike}°C</span></p>

                <div className={classes.sunsetSunrise}>
                    <img src={imgSunrise} alt="imgSunrise" />

                    <div className={classes.textTime}>
                        <h5>Sunrise</h5>
                        <p>{sunriseHours}:{sunriseMinutes}</p>
                    </div>
                </div>

                <div className={classes.sunsetSunrise}>
                    <img src={imgSunset} alt="imgSunset" />

                    <div className={classes.textTime}>
                        <h5>Sunset</h5>
                        <p>{sunsetHours}:{sunsetMinutes}</p>
                    </div>
                </div>
            </div>

            <div className={classes.weatherIcon}>
                <img src={`https://openweathermap.org/img/wn/${props.data.list[0].weather[0].icon}@4x.png`} alt="imgWeatherIcon" />

                <h4>{props.data.list[0].weather[0].main}</h4>
            </div>

            <div className={classes.extraDetails}>
                <div className={classes.details}>
                    <img src={imgHumedityIcon} alt="imgHumedityIcon" />
                    <p>{props.data.list[0].main.humidity}%</p>
                    <h5>Humidity</h5>
                </div>

                <div className={classes.details}>
                    <img src={imgWindSpeedIcon} alt="imgWindSpeedIcon" />
                    <p>{props.data.list[0].wind.speed}km/h</p>
                    <h5>Wind</h5>
                </div>

                <div className={classes.details}>
                    <img src={imgPressureIcon} alt="imgPressureIcon" />
                    <p>{props.data.list[0].main.pressure}hPa</p>
                    <h5>Pressure</h5>
                </div>

                <div className={classes.details}>
                    <img src={imgUvIcon} alt="imgUvIcon" />
                    <p>{props.data.list[0].pop}</p>
                    <h5>UV</h5>
                </div>
            </div>
        </div>
    )
};

export default WeatherDetails;