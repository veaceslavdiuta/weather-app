import classes from "./Information.module.css";

function Information(props) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = new Date(props.data.list[0].dt * 1000);
    const monthNumber = date.getMonth();
    const dayOfMonth = date.getDate();
    const monthName = months[monthNumber];
    const dayNumber = date.getDay();
    const dayName = daysOfWeek[dayNumber];

    const hour = date.getHours();
    const minutes = date.getMinutes();
    const formattedHour = (hour < 10) ? '0' + hour : hour;
    const formattedMinutes = (minutes < 10) ? '0' + minutes : minutes;

    return (
        <div className={classes.information}>
            <h4>{props.data.city.name}</h4>

            <h3>{formattedHour}:{formattedMinutes}</h3>

            <p>{dayName}, {dayOfMonth} {monthName}</p>
        </div>
    )
};

export default Information;