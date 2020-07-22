import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactLoading from "react-loading";

import ResultsOrNot from "./ResultsOrNot";

import "./styles.scss";

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
    // eslint-disable-next-line
  }, [term]);

  // functions
  const fetchResults = async () => {
    try {
      const data = (
        await axios.get(
          `${process.env.REACT_APP_API_URL}/game/search?lookup=${term}`
        )
      ).data;
      setResults(data);
    } catch (err) {
      console.log(err);
    }
    setIsDone(true);
  };

  const fetchGames = async () => {
    try {
      const data = (
        await axios.get(`${process.env.REACT_APP_API_URL}/game/all`)
      ).data;
      setResults(data);
    } catch (err) {
      console.log(err);
      term = "Something went wrong";
    }
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
