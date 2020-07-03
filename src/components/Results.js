import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Table";

export default function Results(props) {
  const [results, setResults] = useState([]);
  let term = props.Search;

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    const data = await axios.get(`/search?title=${term}`);
    setResults(data.data);
  };

  return (
    <div className="main">
      <Table results={results} Search={term} />
    </div>
  );
}
