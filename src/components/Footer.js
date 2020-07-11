import React from "react";
import { Typography } from "@material-ui/core";

export default function Footer() {
  return (
    <section className="footer">
      <div className="footer-content ">
        <div className="footer-1">
          <ul>
            <Typography variant="h6">Feedback</Typography>
            <Typography variant="subtitle1">Contact Us</Typography>
            <Typography variant="subtitle1">Donate</Typography>
          </ul>
        </div>
        <div className="footer-2">
          <ul>
            <Typography variant="h6">Social</Typography>
            <li>
              <Typography variant="subtitle1">Facebook</Typography>
            </li>
            <li>
              <Typography variant="subtitle1">Twitter</Typography>
            </li>
          </ul>
        </div>
        <div className="footer-3">
          <ul>
            <Typography variant="subtitle1">
              &copy; 2020 GoodGames.com
            </Typography>
            <Typography variant="subtitle1">
              Privacy Policy &amp; Cookies
            </Typography>
            <Typography variant="subtitle1">
              Powered By Thunder, Built with Hunger
            </Typography>
          </ul>
        </div>
      </div>
    </section>
  );
}
