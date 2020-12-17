import React, { useState, useContext } from "react";
import { Grid, Grow } from "@material-ui/core";
// import ReplyList from "./ReplyList";
import UserProvider from "../contexts/UserProvider";
import Opinion from "./Opinion";
import { LIKE_REPLY } from "../graphql/graphql";
import { useMutation } from "@apollo/client";

function Reply(props) {
    const userCtx = useContext(UserProvider.context);
    // const { deleteFromAllComments } = props;
    const { _id } = props.reply;

    const [likeReply] = useMutation(LIKE_REPLY, {
        update(proxy, result) {
            console.log(result);
        },
        onError(err) {
            console.warn(err);
            return err;
        },
    });

    const handleLike = () => {
        if (!userCtx.user) return;
        likeReply({
            variables: {
                replyId: _id,
            },
        });
    };

    const handleDislike = () => {
        if (!userCtx.user) return;
        likeReply({
            variables: {
                replyId: _id,
            },
        });
    };

    const deleteReply = () => {};

    // const reportComment = () => {};

    return (
        <Grow in={true}>
            <Grid container>
                <Opinion
                    opinion={props.reply}
                    likeOpinion={handleLike}
                    dislikeOpinion={handleDislike}
                    deleteOpinion={deleteReply}
                />
            </Grid>
        </Grow>
    );
}

export default Reply;
