import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { FormControl, InputLabel, Input } from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     flexWrap: "wrap",
//   },
//   margin: {
//     margin: theme.spacing(1),
//   },
//   withoutLabel: {
//     marginTop: theme.spacing(3),
//   },
//   textField: {
//     width: "25ch",
//   },
// }));

export default function Landing() {
  //   const classes = useStyles();
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  return (
    <div className="landing">
      <h1 className="header">GG</h1>
      <div className="inner">
        <h2>Search the Good Games database to get started.</h2>
        <FormControl fullWidth className="search">
          <InputLabel htmlFor="standard-adornment-amount">
            Search game...
          </InputLabel>
          <Input
            id="standard-adornment-amount"
            value={values.amount}
            onChange={handleChange("amount")}
            //   startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
      </div>
    </div>
  );
}
