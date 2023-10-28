import classes from "./SearchBar.module.css";

function SearchBar(props) {
    return (
        <div className={classes.searchBar}>
            <input type="text" placeholder="Search for your preffered city..." onChange={(event) => props.setInputValue(event.target.value)} />

            <button onClick={() => props.handleSearch()}>Search</button>
        </div>
    )
}

export default SearchBar;