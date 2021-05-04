import React from 'react';

function Movie({result, render, isDisabled}) {
    let year = "";
    if (result.Year != null && result.Year !== "") {
        year = ` (` + result.Year + `)`;
    }
    return (
      <div>
        <img alt = "" aria-hidden = "true" src= {result.Poster}/>
        {result.Title + year}
        {render(result, isDisabled)}
      </div>
    );
  }
  
  export default Movie;
  