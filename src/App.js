import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserProvider from "./contexts/UserProvider";
import ApolloProvider from "./ApolloProvider";
import { CssBaseline } from "@material-ui/core"; //useMediaQuery,
import { ThemeProvider } from "@material-ui/core/styles"; //createMuiTheme,
import theme from "./theme";
// import "./app.css";
// import blue from "@material-ui/core/colors/blue";
// import orange from '@material-ui/core/colors/orange';

function App(props) {
    const hostData = props.hostData;
    // if (WEBSITE_ID) console.log(WEBSITE_ID);

    // const theme = React.useMemo(
    //     () =>
    //         createMuiTheme({
    //             palette: {
    //                 type: hostData.darkOrLight || "light",
    //                 background: {
    //                     default: hostData.backgroundColor || "#fff",
    //                 },
    //                 primary: {
    //                     main: blue[700],
    //                 },
    //             },
    //         }),
    //     [hostData]
    // );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ApolloProvider>
                <UserProvider>
                    <BrowserRouter>
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={(props) => (
                                    <Home {...props} hostData={hostData} />
                                )}
                            />

                            <Route exact path="/login" component={Login} />
                            <Route exact path="/signup" component={Signup} />
                        </Switch>
                    </BrowserRouter>
                    {/* <Home
                        totalComments={totalComments}
                        setTotalComments={setTotalComments}
                        sortBy={sortBy}
                    /> */}
                </UserProvider>
            </ApolloProvider>
        </ThemeProvider>
    );
}

export default App;
