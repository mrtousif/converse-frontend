import React from "react";
import { IconButton, Typography } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

export default function LikeButton(props) {
    const { handleLike, liked, numberOfLikes } = props;

    return (
        <React.Fragment>
            <IconButton
                aria-label="like"
                color={liked ? "primary" : undefined}
                onClick={handleLike}
                style={{ fontSize: "1.2em" }}
            >
                <ThumbUpIcon fontSize="inherit" />
            </IconButton>
            <Typography variant="overline">
                {numberOfLikes * 1 > 0 ? numberOfLikes : " "}
            </Typography>
        </React.Fragment>
    );
}
