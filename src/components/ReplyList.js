import React from "react";
import { Divider, Grid } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { GET_REPLIES } from "../graphql/graphql";
import Loading from "./Loading";
import Reply from "./Reply";

function ReplyList(props) {
    const { commentId } = props;
    const { loading, error, data } = useQuery(GET_REPLIES, {
        variables: {
            commentId,
        },
    });

    if (loading) return <Loading />;
    if (error) {
        console.log(error);
        return <p>Error :(</p>;
    }
    // React.useEffect(()=> {

    // })

    return (
        <Grid container direction="column">
            {data.getReplies.map((reply) => (
                <Reply key={reply._id} reply={reply} />
            ))}
            <Divider />
        </Grid>
    );
}

export default ReplyList;
