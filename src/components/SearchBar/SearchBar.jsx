import classes from "./SearchBar.module.css";

function SearchBar({ handleSearch, setInputValue, errorMessage }) {
    return (
        <form className={classes.form} onSubmit={(e) => handleSearch(e)}>
            <div className={classes.searchBar}>
                <input type="text"
                    style={{ border: errorMessage ? '1px solid red' : 'none' }}
                    placeholder="Search for your preffered city..."
                    onChange={(event) => setInputValue(event.target.value)} />
                <button type="submit">Search</button>
            </div>
            {errorMessage && <p className={classes.errorMessage}>{errorMessage}</p>}
        </form>
    )
}

export default SearchBar;