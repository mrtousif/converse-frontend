import React from "react";
import { IconButton, Typography } from "@material-ui/core";
import CommentIcon from "@material-ui/icons/Comment";

export default function CommentButton(props) {
    const { getReplies, numberOfReplies } = props;

    return (
        <React.Fragment>
            <IconButton
                aria-label="reply"
                onClick={getReplies}
                style={{ fontSize: "1.1em" }}
            >
                <CommentIcon fontSize="inherit" />
            </IconButton>
            <Typography variant="overline">
                {numberOfReplies * 1 > 0 ? numberOfReplies : "  "}
            </Typography>
        </React.Fragment>
    );
}
