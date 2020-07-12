import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactLoading from "react-loading";

import ResultsOrNot from "./ResultsOrNot";

export default function Results(props) {
  const [results, setResults] = useState([]);
  const [isDone, setIsDone] = useState(false);
  let term = props.searchedTerm;

  // useEffects
  useEffect(() => {
    setIsDone(false);
    if (term) {
      fetchResults();
      window.scrollTo(0, 0);
    } else if (window.location.pathname === "/game/all" || !term) {
      fetchGames();
      window.scrollTo(0, 0);
    }
  }, [term]);

  // functions
  const fetchResults = async () => {
    const data = await axios.get(`/game/search?lookup=${term}`);
    setResults(data.data);
    setIsDone(true);
  };

  const fetchGames = async () => {
    const data = await axios.get("/game/all");
    setResults(data.data);
    setIsDone(true);
  };

  return (
    <div className="results">
      <div className="results-container">
        {!isDone ? (
          <ReactLoading
            type={"cylon"}
            color="#f44336"
            height="auto"
            width="400px"
            className="loading"
          />
        ) : (
          <ResultsOrNot
            term={term}
            results={results}
            handleChange={props.handleChange}
            submitSearch={props.submitSearch}
          />
        )}
      </div>
    </div>
  );
}
