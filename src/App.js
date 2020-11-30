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

function App() {
    // const theme = React.useMemo(
    //     () =>
    //         createMuiTheme({
    //             palette: {
    //                 type: prefersDarkMode ? "dark" : "light",
    //             },
    //         }),
    //     [prefersDarkMode]
    // );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ApolloProvider>
                <UserProvider>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/" component={Home} />
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
