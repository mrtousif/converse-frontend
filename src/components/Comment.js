import React, { useState } from "react";
import {
    Grid,
    Typography,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    Grow,
} from "@material-ui/core";
// import { useTheme } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { parseISO, formatDistanceToNow } from "date-fns";
import UserProvider from "../contexts/UserProvider";
// import { Link as RouterLink } from "react-router-dom";
import LikeButton from "./LikeButton";
import DislikeButton from "./DislikeButton";
import CommentButton from "./CommentButton";
import ReplyList from "./ReplyList";
import { useMutation } from "@apollo/client";
import { DELETE_COMMENT, GET_COMMENTS, LIKE_COMMENT } from "../graphql/graphql";

function Comment(props) {
    const userCtx = React.useContext(UserProvider.context);
    const {
        comment: { _id, user, body, createdAt, likes, replies },
        userLiked,
    } = props;

    let commentDate = "";
    if (createdAt) {
        commentDate = formatDistanceToNow(parseISO(createdAt), {
            addSuffix: true,
        });
    }

    const [liked, setLiked] = useState(userLiked || false);
    const [disliked, setDisliked] = useState(false);
    const [numberOfLikes, setNumberOfLikes] = useState(likes || 0);
    const [viewReplies, setViewReplies] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    // const theme = useTheme();
    // const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

    const [deletePost] = useMutation(DELETE_COMMENT, {
        update(proxy, result) {
            try {
                const data = proxy.readQuery({
                    query: GET_COMMENTS,
                });
                // filtering out the deleted post
                const filteredPosts = data.getPosts.filter((post) => post._id !== _id);
                proxy.writeQuery({
                    query: GET_COMMENTS,
                    data: {
                        getPosts: filteredPosts,
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

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLike = async (event) => {
        if (!userCtx.user) return;
        setDisliked(false);
        setLiked(!liked);
        setNumberOfLikes(!liked ? numberOfLikes + 1 : numberOfLikes - 1);

        likeComment({
            variables: {
                commentId: _id,
            },
        });
    };

    const handleDislike = async () => {
        if (!userCtx.user) return;
        if (liked) setNumberOfLikes(numberOfLikes - 1);
        setLiked(false);
        setDisliked(!disliked);

        likeComment({
            variables: {
                commentId: _id,
            },
        });
    };

    const getReplies = async () => {
        setViewReplies(!viewReplies);
    };

    const reportComment = async () => {};

    return (
        <Grow in={true}>
            <Grid item container spacing={1} style={{ marginBottom: "0.5em" }}>
                <Grid item style={{ marginRight: "0.5em", marginTop: "0.5em" }}>
                    <Avatar alt={user.name} src={user.photo} />
                </Grid>
                <Grid item container xs>
                    <Grid item container>
                        <Grid item>
                            <Typography variant="subtitle2">{user.name}</Typography>
                        </Grid>
                        <Grid item style={{ marginLeft: "0.5em", marginRight: "0.5em" }}>
                            <Typography variant="caption">{commentDate}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item container>
                        <Grid
                            item
                            xs={12}
                            style={{
                                textDecoration: "none",
                                color: "inherit",
                                overflowWrap: "break-word",
                                wordBreak: "break-word",
                            }}
                        >
                            <Typography variant="body2">{body}</Typography>
                        </Grid>
                        <Grid item>
                            <LikeButton
                                handleLike={handleLike}
                                liked={liked}
                                numberOfLikes={numberOfLikes}
                            />
                        </Grid>

                        <Grid item>
                            <DislikeButton
                                handleDislike={handleDislike}
                                disliked={disliked}
                            />
                        </Grid>

                        <Grid item>
                            <CommentButton comments={replies} getComments={getReplies} />
                        </Grid>

                        <Grid item style={{ marginLeft: "auto" }}>
                            {userCtx.user ? (
                                <IconButton
                                    aria-label="more"
                                    aria-controls="long-menu"
                                    aria-haspopup="true"
                                    onClick={handleClick}
                                    style={{ fontSize: "1.2em" }}
                                >
                                    <MoreVertIcon fontSize="inherit" />
                                </IconButton>
                            ) : null}
                        </Grid>
                    </Grid>
                    <Grid item container>
                        {viewReplies ? <ReplyList commentId={_id} /> : null}
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
                    {userCtx.user && userCtx.user._id === user._id ? (
                        <MenuItem
                            onClick={(e) => {
                                handleClose(e);
                                deletePost({
                                    variables: {
                                        postId: _id,
                                    },
                                });
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
            </Grid>
        </Grow>
    );
}

export default Comment;
