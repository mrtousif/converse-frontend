import React, { useState, useContext } from "react";
import {
    Grid,
    Typography,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    useMediaQuery,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ReplyIcon from "@material-ui/icons/Reply";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ReplyList from "./ReplyList";
import ky from "ky";
import { parseISO, formatDistanceToNow } from "date-fns";
import UserProvider from "../contexts/UserProvider";

function Comment(props) {
    const userCtx = useContext(UserProvider.context);
    const { deleteFromAllComments } = props;

    const {
        userName,
        userPhoto,
        id,
        userId,
        opinion,
        createdAt,
        likes,
        replies,
    } = props.comment;

    let commentDate = "";
    if (createdAt) {
        commentDate = formatDistanceToNow(parseISO(createdAt), {
            addSuffix: true,
        });
    }

    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [numberOfLikes, setNumberOfLikes] = useState(likes || 0);
    const [allReplies, setAllReplies] = useState([]);
    const [viewReplies, setViewReplies] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const addToAllReplies = (data) => {
        const temp = [...allReplies];
        temp.unshift(data);
        setAllReplies(temp);
    };

    const handleLike = async (event) => {
        if (!userCtx.token) return;
        setDisliked(false);
        setLiked(!liked);
        setNumberOfLikes(!liked ? numberOfLikes + 1 : numberOfLikes - 1);

        try {
            const response = await ky
                .patch(`http://localhost:4000/api/v1/comments/${id}`, {
                    credentials: "include",
                    json: {
                        liked: !liked,
                        likes,
                    },
                })
                .json();
            setAllReplies(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDislike = async () => {
        if (!userCtx.token) return;
        if (liked) setNumberOfLikes(numberOfLikes - 1);
        setLiked(false);
        setDisliked(!disliked);
        try {
            await ky
                .patch(`http://localhost:4000/api/v1/comments/${id}`, {
                    credentials: "include",
                    json: {
                        liked: !liked,
                        likes,
                    },
                })
                .json();
        } catch (error) {
            console.error(error);
        }
    };

    const getReplies = async () => {
        setViewReplies(!viewReplies);
        // get replies
        try {
            const response = await ky
                .get(`http://localhost:4000/api/v1/comments/${id}/replies`)
                .json();

            setAllReplies(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteComment = async () => {
        try {
            await ky.delete(`http://localhost:4000/api/v1/comments/${id}`, {
                credentials: "include",
            });
            deleteFromAllComments(id);
        } catch (error) {
            console.error(error);
        }
    };

    const reportComment = async () => {};

    return (
        <Grid item container spacing={1} style={{ marginBottom: "0.5em" }}>
            <Grid item style={{ marginRight: "0.5em", marginTop: "0.5em" }}>
                <Avatar alt={userName} src={userPhoto} />
            </Grid>
            <Grid item container xs>
                <Grid item container>
                    <Grid item>
                        <Typography variant="subtitle2">{userName}</Typography>
                    </Grid>
                    <Grid
                        item
                        style={{ marginLeft: "0.5em", marginRight: "0.5em" }}
                    >
                        <Typography variant="caption">{commentDate}</Typography>
                    </Grid>
                </Grid>
                <Grid item container>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="initial">
                            {opinion}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography variant="overline">
                            {numberOfLikes * 1 > 0 ? numberOfLikes : " "}
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

                    <Grid item>
                        <Typography variant="overline">
                            {replies * 1 > 0 ? replies : "  "}
                        </Typography>
                        <IconButton
                            aria-label="reply"
                            onClick={getReplies}
                            style={{ fontSize: "1.2em" }}
                        >
                            <ReplyIcon fontSize="inherit" />
                        </IconButton>
                    </Grid>

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
                    </Grid>
                </Grid>
            </Grid>

            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                // PaperProps={{
                //     style: {
                //         maxHeight: ITEM_HEIGHT * 4.5,
                //         width: '12ch',
                //     },
                // }}
            >
                {userCtx._id === userId ? (
                    <MenuItem
                        onClick={(e) => {
                            handleClose(e);
                            deleteComment();
                        }}
                    >
                        Delete
                    </MenuItem>
                ) : (
                    <MenuItem
                        onClick={(e) => {
                            handleClose(e);
                            reportComment();
                        }}
                    >
                        Report
                    </MenuItem>
                )}
            </Menu>

            <Grid
                item
                container
                style={{ marginLeft: matchesXS ? "2em" : "4em" }}
            >
                {viewReplies ? (
                    <ReplyList
                        allReplies={allReplies}
                        addToAllReplies={addToAllReplies}
                        commentId={id}
                        userName={userName}
                    />
                ) : null}
            </Grid>
        </Grid>
    );
}

export default Comment;
