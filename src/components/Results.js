import React from "react";
import ResultsTable from "./ResultsTable";

export default function Results(props) {
  return (
    <div className="main">
      <h2>Results for: {props.Search}</h2>
      <ResultsTable Search={props.Search} />
    </div>
  );
}
