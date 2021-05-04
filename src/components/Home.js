import React from 'react';
import Filter from './Filter'
import Movie from './Movie';

const OMDBAPI = 'http://www.omdbapi.com/?apikey=5dd5b153';

function Home() {
    const [nominations, setNominations] = React.useState([]);
    const [results, setResults] = React.useState([]);

    async function filter(input){
        if (input.trim().length === 0) {
            setResults([{Title: "", Error: true}]);
            return;
        }
        const res = await fetch(OMDBAPI + '&s=' + input);
        const json = await res.json();

        console.log(json)

        if (json.Response === "False") {
            setResults([{Title: "Too Many Results. Please Try Again", Error: true}]);
        }
        else {
            setResults(json.Search);
        }
    }

    function nominate(movie) {
        if (nominations.length === 5) {
            alert("You have already selected 5 movies");
            return;
        }
        const newNominations = [...nominations];
        newNominations.push(movie);
        setNominations(newNominations);
        if (newNominations.length === 5) {
            alert("You have selected 5 movies");
            return;
        }
    }

    function deleteNominated(movie) {
        const newNominations = nominations.filter((m) => { 
            return m.imdbID !== movie.imdbID
        });
        setNominations(newNominations);
    }

    function addNomination(movie, isDisabled) {
        return <button id = "add-btn" type= "button" aria-labelledby = "add-btn results" disabled = {isDisabled} onClick = {() => {nominate(movie)}}>Nominate</button>
    }

    function deleteNomination(movie, isDisabled) {
        return <button id = "delete-btn" type= "button" aria-labelledby = "delete-btn nominations" disabled = {isDisabled} onClick = {() => {deleteNominated(movie)}}>Remove</button>
    }

    return (
      <main>
        <Filter filter = {filter}></Filter>
        <div style = {{backgroundColor: "grey"}}>
            <h1 id = "nominations">Nominations</h1>
            {
            nominations.map((movie) => {
                return <Movie key = {movie.imdbID} result = {movie} render = {deleteNomination} isDisabled = {false}/>;
                
            })}            
        </div>
        <div>
            <h1 id = "results">Movies</h1>
            {
            results.map((movie) => {
                let isDisabled = nominations.includes(movie);
                if (movie.Error != null) {
                    return <div key = {movie.imdbID}>{movie.Title}</div>
                }
                return (
                    <Movie key = {movie.imdbID} isDisabled = {isDisabled} render = {addNomination}  result = {movie}/>
                );
            })}
        </div>
      </main>
    );
  }
  
  export default Home;
  