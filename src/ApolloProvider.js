import React from "react";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    // ApolloLink
    createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_API_URL,
});

const authLink = setContext(() => {
    const token = localStorage.getItem("token");
    // if (token && token.length < 15) return;

    return {
        headers: {
            authorization: token ? `Bearer ${token}` : undefined,
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

function Provider(props) {
    return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}

export default Provider;
