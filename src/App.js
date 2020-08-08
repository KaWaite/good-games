import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactLoading from "react-loading";
import "./css/main.scss";
import Routes from "./router/Routes";
import authHelper from "./utils/authHelper";
const { tokenCheck, fetchUserWithToken } = authHelper;

const TopBar = lazy(() => import("./components/TopBar"));
const Footer = lazy(() => import("./components/Footer"));

function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState(null);
  const [searchedTerm, setSearchedTerm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsAuthorized(tokenCheck());
  }, []);

  useEffect(() => {
    if (isAuthorized === true) {
      const fetchUserData = async () => {
        try {
          const userData = await fetchUserWithToken();
          setUser(userData);
        } catch (err) {
          console.log(err);
        }
      };
      fetchUserData();
    }
    setIsLoading(false);
  }, [isAuthorized]);

  return (
    <Suspense
      fallback={
        <ReactLoading
          type={"bars"}
          color="#f44336"
          height="auto"
          width="300px"
          className="loading"
        />
      }
    >
      <Router>
        <div className="App">
          <TopBar username={user && user.username} setUser={setUser} />
          <Routes
            searchedTerm={searchedTerm}
            setSearchedTerm={setSearchedTerm}
            isLoading={isLoading}
            user={user}
            setUser={setUser}
          />
          <Footer />
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
