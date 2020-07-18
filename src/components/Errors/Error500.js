import React from "react";
import { Link } from "react-router-dom";

export default function Error500() {
  return (
    <div className="content">
      <h1>
        I am sorry something went wrong. Please try another page or go back{" "}
        <Link className="link" to="/">
          home
        </Link>
        .
      </h1>
    </div>
  );
}
