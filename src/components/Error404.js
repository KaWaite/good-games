import React from "react";
import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <div>
      <h1>
        I am sorry the page was not found. Please try another page or go back{" "}
        <Link className="link" to="/">
          home
        </Link>
        .
      </h1>
    </div>
  );
}
