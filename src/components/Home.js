import React from 'react';
import Filter from './Filter'
import Movie from './Movie';

const OMDBAPI = 'http://www.omdbapi.com/?apikey=5dd5b153';

function Home() {
    const [nominations, setNominations] = React.useState(JSON.parse(localStorage.getItem("nominations")) || []);
    const [results, setResults] = React.useState([]);

    async function filter(input){
        if (input.trim().length === 0) {
            setResults([{Title: "", Error: true}]);
            return;
        }
        const res = await fetch(OMDBAPI + '&s=' + input);
        const json = await res.json();

        console.log(json)

        if (json.Response === "False" && json.Error === "Too many results.") {
            setResults([{Title: "Too Many Results. Please Try Again", Error: true}]);
        } else if (json.Response === "False") {
            setResults([{Title: "", Error: true}]);
        }
        else {
            // issue with omdb API returning multiple instances
            let duplicatesRemoved = json.Search.filter(function(item, pos, ary) {
                return !pos || item.imdbID !== ary[pos - 1].imdbID;
            });
            setResults(duplicatesRemoved);
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
        }
        localStorage.setItem("nominations", JSON.stringify(newNominations));
    }

    function deleteNominated(movie) {
        const newNominations = nominations.filter((m) => { 
            return m.imdbID !== movie.imdbID
        });
        setNominations(newNominations);
        localStorage.setItem("nominations", JSON.stringify(newNominations));
    }

    function addNomination(movie, isDisabled) {
        return <button className = "button-radius" id = "add-btn" type= "button" aria-labelledby = "add-btn results" disabled = {isDisabled} onClick = {() => {nominate(movie)}}>Nominate</button>
    }

    function deleteNomination(movie, isDisabled) {
        return <button className = "button-radius" id = "delete-btn" type= "button" aria-labelledby = "delete-btn nominations" disabled = {isDisabled} onClick = {() => {deleteNominated(movie)}}>Remove</button>
    }
    return (
      <main className = "mdl-grid">
        <div className = "mdl-cell mdl-cell--12-col">
            <h1 className = "logo">Filmify</h1>
            <Filter filter = {filter}></Filter>
        </div>
        <div className = "mdl-cell mdl-cell--4-col mdl-cell--12-col-tablet">
            <div className = "mdl-grid">
                <h1 className = "mdl-cell mdl-cell--12-col"id = "nominations"> 
                    <i className="fas fa-trophy" aria-hidden="true" /> Nominations
                </h1>
                    {
                    nominations.map((movie) => {
                        return <Movie className = "mdl-cell mdl-cell--12-col mdl-cell--4-col-tablet" key = {movie.imdbID} result = {movie} render = {deleteNomination} isDisabled = {false}/>;
                        
                    })}       
            </div>
        </div>
        <div className = "mdl-cell mdl-cell--8-col mdl-cell--12-col-tablet">
            <div className = "mdl-grid">
                <h1 className = "mdl-cell mdl-cell--12-col" id = "results"> 
                    <i className="fas fa-film" aria-hidden="true" /> Films
                </h1>
                {results.map((movie) => {
                    let isDisabled = nominations.filter(m => m.imdbID === movie.imdbID).length > 0;
                    if (movie.Error != null) {
                        return <div className = "mdl-cell mdl-cell--12-col"  key = {movie.imdbID}>{movie.Title}</div>
                    }
                    return (
                        <Movie className = "mdl-cell mdl-cell--4-col" key = {movie.imdbID} isDisabled = {isDisabled} render = {addNomination}  result = {movie}/>
                    );
                })}                
            </div>
            
        </div>
      </main>
    );
  }
  
  export default Home;
  