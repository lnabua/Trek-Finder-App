import React from 'react';

const SearchBar = (props) => {
  return (
    <div class="ui left aligned category search">
        <div class="ui icon input">
        <input 
            class="prompt" 
            type="text" 
            placeholder="Search trails..."
            value={props.searchTerm}
            onChange={(e) => props.handleSearchTermChange(e.target.value)}
            />
        <i class="search icon"></i>
        </div>
        <div class="results"></div>
    </div>
  );
}

export default SearchBar;