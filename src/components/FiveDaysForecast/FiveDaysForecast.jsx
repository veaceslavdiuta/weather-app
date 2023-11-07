import classes from "./FiveDaysForecast.module.css";


function FiveDaysForecast(props) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const selectedIndex = [6, 14, 22, 30, 38];

    return (
        <div className={classes.fiveDaysForecast}>
            <h3>5 Days Forecast:</h3>

            {selectedIndex.map((item) => {
                const data = props.data.list[item];
                const date = new Date(data.dt * 1000);
                const monthNumber = date.getMonth();
                const dayOfMonth = date.getDate();
                const monthName = months[monthNumber];
                const dayNumber = date.getDay();
                const dayName = daysOfWeek[dayNumber];
                const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
                const temp = Math.round(data.main.temp);

                return (
                    <div className={classes.days} key={item}>
                        <img src={iconSrc} alt="imgIcon" />
                        <h5>{temp}°C</h5>
                        <p>{dayName}, {dayOfMonth} {monthName}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default FiveDaysForecast;