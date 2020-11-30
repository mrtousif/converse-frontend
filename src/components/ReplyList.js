import React from "react";
import { Grid } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { GET_REPLIES_OF_COMMENT } from "../graphql/graphql";
import Loading from "./Loading";
import AddReply from "./AddReply";
import Reply from "./Reply";

function ReplyList(props) {
    const { commentId } = props;
    const { loading, error, data } = useQuery(GET_REPLIES_OF_COMMENT, {
        variables: {
            commentId,
        },
        onError(err) {
            console.log(err);
        },
    });

    if (loading) return <Loading />;
    if (error) return <p>Error :(</p>;
    // React.useEffect(()=> {

    // })

    return (
        <Grid container>
            <AddReply commentId={commentId} />
            {data.getReplies.map((reply) => (
                <Reply key={reply._id} reply={reply} />
            ))}
        </Grid>
    );
}

export default ReplyList;
