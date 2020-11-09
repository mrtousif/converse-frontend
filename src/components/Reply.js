import React, { useState, useContext } from "react";
import {
    Grid,
    Typography,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    // useMediaQuery,
} from "@material-ui/core";
// import { useTheme } from "@material-ui/core/styles";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ky from "ky";
import { parseISO, formatDistanceToNow } from "date-fns";
import UserProvider from "../contexts/UserProvider";

function Reply(props) {
    const {
        userName,
        id,
        userPhoto,
        userId,
        commentId,
        opinion,
        updatedAt,
        likes,
        // replyName,
    } = props.reply;
    // const { toUser } = props;

    const commentDate = formatDistanceToNow(parseISO(updatedAt), {
        addSuffix: true,
    });

    // const [viewDelete, setViewDelete] = useState(false);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [numberOfLikes, setNumberOfLikes] = useState(likes || 0);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const userCtx = useContext(UserProvider.context);
    // const theme = useTheme();
    // const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLike = async (event) => {
        if (!userCtx.token) return;
        setDisliked(false);
        setLiked(!liked);
        setNumberOfLikes(!liked ? numberOfLikes + 1 : numberOfLikes - 1);

        try {
            const response = await ky
                .patch(`/comments/${commentId}/replies/${id}`, {
                    headers: {
                        authorization: `Bearer ${userCtx.token}`,
                    },
                    json: {
                        liked: !liked,
                        likes,
                    },
                })
                .json();
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDislike = async () => {
        if (userCtx) return;
        setLiked(false);
        setDisliked(!disliked);
    };

    const deleteReply = async () => {
        try {
            await ky
                .delete(`/comments/${commentId}/replies/${id}`, {
                    headers: {
                        authorization: `Bearer ${userCtx.token}`,
                    },
                })
                .json();
        } catch (error) {
            console.error(error);
        }
    };

    const DeleteMenu = (
        <Grid item style={{ marginLeft: "auto" }}>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
                style={{ fontSize: "1.2em" }}
            >
                <MoreVertIcon fontSize="inherit" />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
            >
                <MenuItem
                    onClick={(e) => {
                        handleClose(e);
                        deleteReply();
                    }}
                >
                    Delete
                </MenuItem>
            </Menu>
        </Grid>
    );

    return (
        <React.Fragment>
            <Grid item container spacing={1} style={{ marginBottom: "0.5em" }}>
                <Grid item style={{ marginRight: "0.5em", marginTop: "0.5em" }}>
                    <Avatar alt={userName} src={userPhoto} />
                </Grid>
                <Grid item container xs>
                    <Grid item container>
                        <Grid item>
                            <Typography variant="subtitle2">
                                {userName}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            style={{
                                marginLeft: "0.5em",
                                marginRight: "0.5em",
                            }}
                        >
                            <Typography variant="caption">
                                {" "}
                                {commentDate}{" "}
                            </Typography>
                        </Grid>
                        {/* <Grid item>
                            <Typography
                                variant="caption"
                                style={{ fontWeight: 700 }}
                            >
                                {" "}
                                to {replyName || toUser}
                            </Typography>
                        </Grid> */}
                    </Grid>
                    <Grid item container>
                        <Grid item xs={12}>
                            <Typography variant="body2" color="initial">
                                {opinion}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="overline">
                                {numberOfLikes}
                            </Typography>
                            <IconButton
                                aria-label="like"
                                color={liked ? "primary" : undefined}
                                onClick={handleLike}
                                style={{ fontSize: "1.2em" }}
                            >
                                <ThumbUpIcon fontSize="inherit" />
                            </IconButton>
                        </Grid>

                        <Grid item>
                            <IconButton
                                aria-label="dislike"
                                color={disliked ? "primary" : undefined}
                                onClick={handleDislike}
                                style={{ fontSize: "1.2em" }}
                            >
                                <ThumbDownIcon fontSize="inherit" />
                            </IconButton>
                        </Grid>

                        {userCtx._id === userId ? DeleteMenu : null}
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default Reply;
