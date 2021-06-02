import React, { useState } from "react";
import { ModuleData } from "./ModuleData";
import "./AutoCompleteSearch.css";

function AutoCompleteSearch(props) {
  const { setDisplayedModule } = props;
  const [searchText, setSearchText] = useState("");
  const [display, setDisplay] = useState(false);

  function handleSearchChange(event) {
    if (event.target.value.length === 0) {
      setDisplay(false);
    } else {
      setDisplay(true);
    }
    setSearchText(event.target.value);
  }
  return (
    <div>
      <input
        type="text"
        placeholder="Search for module"
        onChange={handleSearchChange}
        value={searchText}
        className="search-bar"
      />
      {display && (
        <SuggestionsList
          searchText={searchText}
          setSearchText={setSearchText}
          setDisplay={setDisplay}
          setDisplayedModule={setDisplayedModule}
        />
      )}
    </div>
  );
}

function SuggestionsList(props) {
  const { searchText, setSearchText, setDisplay, setDisplayedModule } = props;
  const filteredList = ModuleData.filter(
    (item) => item.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1
  );

  const handleSelectItem = (i) => {
    setSearchText("");
    setDisplay(false);
    setDisplayedModule(i);
  };

  return (
    <>
      <ul>
        {filteredList.length ? (
          filteredList.map((item, index) => {
            return (
              <li onClick={() => handleSelectItem(item)} key={index}>
                {item.title}
              </li>
            );
          })
        ) : (
          <p>Cannot find module "{searchText}"</p>
        )}
      </ul>
    </>
  );
}

export default AutoCompleteSearch;
