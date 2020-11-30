import React from "react";
import { IconButton } from "@material-ui/core";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";

export default function DislikeButton(props) {
    const { handleDislike, disliked } = props;

    return (
        <IconButton
            aria-label="dislike"
            color={disliked ? "primary" : undefined}
            onClick={handleDislike}
            style={{ fontSize: "1.2em" }}
        >
            <ThumbDownIcon fontSize="inherit" />
        </IconButton>
    );
}
