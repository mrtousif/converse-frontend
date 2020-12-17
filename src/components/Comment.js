import React, { useState } from "react";
import { Grid, Grow } from "@material-ui/core";
// import { useTheme } from "@material-ui/core/styles";
import UserProvider from "../contexts/UserProvider";
// import { Link as RouterLink } from "react-router-dom";
import ReplyList from "./ReplyList";
import { useMutation } from "@apollo/client";
import { DELETE_COMMENT, GET_COMMENTS, LIKE_COMMENT } from "../graphql/graphql";
import Opinion from "./Opinion";

function Comment(props) {
    const userCtx = React.useContext(UserProvider.context);
    const {
        comment: { _id, replies, userLiked },
        postId,
    } = props;

    console.log(props.comment);
    const [viewReplies, setViewReplies] = useState(false);

    // const theme = useTheme();
    // const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

    const [deleteComment] = useMutation(DELETE_COMMENT, {
        update(proxy, result) {
            try {
                const data = proxy.readQuery({
                    query: GET_COMMENTS,
                    variables: {
                        postId,
                    },
                });
                console.log(data);
                // filtering out the deleted post
                const filteredComments = data.getComments.filter(
                    (comment) => comment._id !== _id
                );
                console.log(filteredComments);
                proxy.writeQuery({
                    query: GET_COMMENTS,
                    variables: {
                        postId,
                    },
                    data: {
                        getComments: filteredComments,
                    },
                });
            } catch (error) {
                console.error(error);
            }
        },

        onError(err) {
            console.warn(err);
            return err;
        },
    });

    const [likeComment] = useMutation(LIKE_COMMENT, {
        onError(err) {
            console.warn(err);
            return err;
        },
    });

    const handleLike = () => {
        if (!userCtx.user) return;
        likeComment({
            variables: {
                commentId: _id,
                postId,
            },
        });
    };

    const handleDislike = () => {
        if (!userCtx.user) return;
        likeComment({
            variables: {
                commentId: _id,
                postId,
            },
        });
    };

    const getReplies = () => {
        setViewReplies(!viewReplies);
    };

    const deleteOpinion = () => {
        deleteComment({
            variables: {
                commentId: _id,
            },
        });
    };

    // const reportComment = () => {};

    return (
        <Grow in={true}>
            <Grid container>
                <Opinion
                    opinion={props.comment}
                    getReplies={getReplies}
                    numberOfReplies={replies}
                    likeOpinion={handleLike}
                    dislikeOpinion={handleDislike}
                    deleteOpinion={deleteOpinion}
                    userLiked={userLiked}
                />
                {viewReplies ? <ReplyList commentId={_id} /> : null}
            </Grid>
        </Grow>
    );
}

export default Comment;
