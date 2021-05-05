import React from 'react';

function Filter({className, filter}) {
    return (
      <div className = {className}>
            <i className="fas fa-search search-icon" aria-hidden="true" /> 
            <input className = "search-bar" type="text"
            key="filter"
            aria-label = "search for a movie"
            placeholder={" Enter a movie (e.g. The Lion King)"}
            onChange={(e) => filter(e.target.value)}
            />
      </div>
    );
  }
  
  export default Filter;
  