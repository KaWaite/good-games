import React from "react";
import { Link } from "react-router-dom";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

function createData(title, release_date, user_rating) {
  return { title, release_date, user_rating };
}

const rows = [
  createData("The Last of Us", 1969, 6.0),
  createData("The Last Guardian", 1237, 9.0),
  createData("The Last Airbender", 1262, 16.0),
  createData("The Last of Us", 1591, 6.0),
  createData("The Last Guardian", 2237, 9.0),
  createData("The Last Airbender", 1262, 16.0),
];

export default function ResultsTable(props) {
  return (
    <TableContainer component={Paper} className="table">
      <Table className="table" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Release Date</TableCell>
            <TableCell align="right">User Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow className="table-row" component={Link} key={row.title}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.release_date}</TableCell>
              <TableCell align="right">{row.user_rating}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
