import React from 'react';

function Movie({className, result, render, isDisabled}) {
    let year = "";
    if (result.Year != null && result.Year !== "") {
        year = ` (` + result.Year + `)`;
    }
    return (
    <div className = {className}>
        <div className = "mdl-grid movie-card">
            <div className = "mdl-cell mdl-cell--12-col">
                <img height = '150em' width = "100em" alt = "" aria-hidden = "true" src= {result.Poster}/>
            </div>
            <div className = "mdl-cell mdl-cell--12-col">
                {result.Title + year}
            </div>
            <div className = "mdl-cell mdl-cell--12-col">
                {render(result, isDisabled)}
            </div>
        </div>
    </div>

    );
  }
  
  export default Movie;
  