import React from 'react';
import Movie from './Movie';

function Results({results, onClick, render, nominations}) {
    return (
      <div>
        {
        results.map(result => {
            let isDisabled = nominations.includes(result);
            console.log(isDisabled);
            console.log(result)
            return (
            <div>
                <Movie isDisabled = {isDisabled} render = {render} imdbID = {result.imdbID} result = {result} onClick = {onClick}>

                </Movie>
            </div>
            );
        })}
      </div>
    );
  }
  
  export default Results;
  