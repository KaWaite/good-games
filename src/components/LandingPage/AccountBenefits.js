import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    // minWidth: "88%",
    padding: "50px 0",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
    color: "white",
  },
});

export default function AccountBenefits() {
  const classes = useStyles();

  return (
    <div className="account-benefit-container">
      <div className="container">
        <Card className={classes.root} id="account-benefit">
          <CardContent>
            {/* <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Word of the Day
        </Typography> */}
            <Typography variant="h5" component="h2">
              Create a GG account now!
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              You can:
            </Typography>
            <Typography variant="body2" component="p">
              Save games
              <br />
              Rank games
              <br />
              See play times
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              component={Link}
              to="/account/join-the-dark-side"
            >
              Create Account
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}
