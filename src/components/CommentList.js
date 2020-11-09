import React from "react";
import Comment from "./Comment";
import { Grid } from "@material-ui/core";
// import { comments } from './data';

function CommentList(props) {
    const { allComments, deleteFromAllComments } = props;

    return (
        <Grid container direction="column">
            {/* <React.StrictMode> */}
            {allComments.map((comment) => (
                <Comment
                    key={comment.id}
                    comment={comment}
                    deleteFromAllComments={deleteFromAllComments}
                />
            ))}
            {/* </React.StrictMode> */}
        </Grid>
    );
}

export default CommentList;
