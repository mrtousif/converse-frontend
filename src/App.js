import React, { useState } from "react";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
// import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
// import Login from "./Login";
// import Signup from "./Signup";
import NavBar from "./components/NavBar";
import UserProvider from "./contexts/UserProvider";

const queryCache = new QueryCache();

function App() {
    const [totalComments, setTotalComments] = useState(0);
    const [sortBy, setSortBy] = useState(null);

    const sortComments = (key) => {
        switch (key) {
            case "likes":
                setSortBy("likes");
                break;
            case "newest":
                setSortBy("createdAt");
                break;

            default:
                break;
        }
    };

    return (
        <React.Fragment>
            <UserProvider>
                <NavBar
                    totalComments={totalComments}
                    sortComments={sortComments}
                />
                {/* <BrowserRouter>
               
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                </Switch>
            </BrowserRouter> */}
                <ReactQueryCacheProvider queryCache={queryCache}>
                    <LandingPage
                        totalComments={totalComments}
                        setTotalComments={setTotalComments}
                        sortBy={sortBy}
                    />
                </ReactQueryCacheProvider>
            </UserProvider>
        </React.Fragment>
    );
}

export default App;
