import classes from "./HourlyForecast.module.css";
import imgNavigation1 from "../../media/navigation 1.png";

function HourlyForecast(props) {
    const firstBackground = 'linear-gradient(168deg,#443d64 -19.21%,rgba(101, 130, 198, 0)158.48%)';
    const secondBackground = 'linear-gradient(169deg,#f88508 -15.98%,rgba(246, 250, 217, 0)150.58%)';

    const selectedIndex = [
        { index: 0 },
        { index: 1 },
        { index: 2 },
        { index: 3 },
        { index: 4 },
    ];

    return (
        <div className={classes.hourlyForecast}>
            <h3>Hourly Forecast</h3>

            <div className={classes.hoursContainer}>
                {selectedIndex.map((item, index) => {
                    const data = props.data.list[item.index];
                    const date = new Date(data.dt * 1000);
                    const hour = date.getHours();
                    const minutes = date.getMinutes();
                    const formattedHour = (hour < 10) ? '0' + hour : hour;
                    const formattedMinutes = (minutes < 10) ? '0' + minutes : minutes;
                    const temp = Math.round(data.main.temp);
                    const windSpeed = Math.round(data.wind.speed);
                    const imgSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

                    return (
                        <div className={classes.hours} key={index} style={{background: formattedHour >= 6 && formattedHour <= 20 ? secondBackground : firstBackground}}>
                            <p>{formattedHour}:{formattedMinutes}</p>
                            <img className={classes.firstImg} src={imgSrc} alt="" />
                            <p>{temp}°C</p>
                            <img className={classes.secondImg} src={imgNavigation1} alt="imgNavigation1" />
                            <p>{windSpeed}km/h</p>
                        </div>
                    );
                })}
            </div>
        </div>
    )
};

export default HourlyForecast;

