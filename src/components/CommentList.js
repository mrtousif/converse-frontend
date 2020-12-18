import React from "react";
import Comment from "./Comment";
import { Grid } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { GET_COMMENTS } from "../graphql/graphql";
import Loading from "./Loading";
// import UserProvider from "../contexts/UserProvider";

function CommentList(props) {
    const { postId } = props;

    //: "5fb3dc259f33b144981e2d4f"
    const { loading, error, data } = useQuery(GET_COMMENTS, {
        variables: {
            postId: "5fb3dc259f33b144981e2d4f",
        },
    });

    if (loading) return <Loading />;
    if (error) {
        console.error(error);
        return <p>Error :(</p>;
    }

    // let result;

    return (
        <Grid container direction="column" spacing={1}>
            {data.getComments.map((comment) => (
                <Comment key={comment._id} comment={comment} postId={postId} />
            ))}
        </Grid>
    );
}

export default CommentList;
