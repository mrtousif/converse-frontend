import React from "react";
import { IconButton, Typography } from "@material-ui/core";
import CommentIcon from "@material-ui/icons/Comment";

export default function CommentButton(props) {
    const { getComments, comments } = props;

    return (
        <React.Fragment>
            <IconButton
                aria-label="reply"
                onClick={getComments}
                style={{ fontSize: "1.2em" }}
            >
                <CommentIcon fontSize="inherit" />
            </IconButton>
            <Typography variant="overline">
                {comments * 1 > 0 ? comments : "  "}
            </Typography>
        </React.Fragment>
    );
}
