import React from 'react';

function Filter({filter}) {
    return (
      <div>
            <h1> Search</h1>
            <input type="search"
            key="filter"
            aria-label = "search for a movie"
            placeholder={"e.g. Finding Nemo"}
            onChange={(e) => filter(e.target.value)}
            />
      </div>
    );
  }
  
  export default Filter;
  