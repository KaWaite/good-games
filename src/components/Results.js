import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Table";

export default function Results(props) {
  const [results, setResults] = useState([]);
  let term = props.Search;

  useEffect(() => {
    fetchResults();
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);

  const fetchResults = async () => {
    const data = await axios.post("/game/search", { term });
    setResults(data.data);
  };

  return (
    <div className="content">
      <Table results={results} Search={term} />
    </div>
  );
}
