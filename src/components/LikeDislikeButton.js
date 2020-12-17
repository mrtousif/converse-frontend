import React, { useState } from "react";
import { IconButton, Typography } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import UserProvider from "../contexts/UserProvider";

export default function LikeButton(props) {
    const userCtx = React.useContext(UserProvider.context);
    const {
        likes,
        handleLike: updateLike,
        handleDislike: updateDislike,
        userLiked,
    } = props;

    const [liked, setLiked] = useState(userLiked || false);
    const [disliked, setDisliked] = useState(false);
    const [numberOfLikes, setNumberOfLikes] = useState(likes || 0);

    const handleLike = () => {
        if (!userCtx.user) return;
        setDisliked(false);
        setLiked(!liked);
        setNumberOfLikes(!liked ? numberOfLikes + 1 : numberOfLikes - 1);
        updateLike();
    };

    const handleDislike = () => {
        if (!userCtx.user) return;
        if (liked) setNumberOfLikes(numberOfLikes - 1);
        setLiked(false);
        setDisliked(!disliked);
        updateDislike();
    };

    return (
        <React.Fragment>
            <IconButton
                aria-label="like"
                color={liked ? "primary" : undefined}
                onClick={handleLike}
                style={{ fontSize: "1.1em" }}
            >
                <ThumbUpIcon fontSize="inherit" />
            </IconButton>
            <Typography variant="overline">
                {numberOfLikes * 1 > 0 ? numberOfLikes : " "}
            </Typography>
            <IconButton
                aria-label="dislike"
                color={disliked ? "primary" : undefined}
                onClick={handleDislike}
                style={{ fontSize: "1.1em" }}
            >
                <ThumbDownIcon fontSize="inherit" />
            </IconButton>
        </React.Fragment>
    );
}
