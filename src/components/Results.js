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
    console.log(term);
    const data = await axios.get(`/search?title=${term}`);
    console.log(data.data);
    setResults(data.data);
  };

  return (
    <div className="main">
      {/* <h2>Results for: {props.Search}</h2> */}
      <Table results={results} Search={term} />
      {/* <ul>
        {results.map((item) => (
          <li key={item.title}>{item.title}</li>
        ))}
      </ul> */}
    </div>
  );
}
