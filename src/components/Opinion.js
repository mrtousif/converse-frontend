import React, { useState } from "react";
import { Grid, Typography, IconButton, Avatar, Menu, MenuItem } from "@material-ui/core";
// import { useTheme } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { parseISO, formatDistanceToNow } from "date-fns";
import LikeDislikeButton from "./LikeDislikeButton";
import CommentButton from "./CommentButton";
import UserProvider from "../contexts/UserProvider";

export default function Opinion(props) {
    const { user, body, createdAt, likes } = props.opinion;
    const {
        likeOpinion,
        dislikeOpinion,
        numberOfReplies,
        getReplies,
        deleteOpinion,
        reportComment,
        userLiked,
    } = props;
    const userCtx = React.useContext(UserProvider.context);

    let commentDate = "";
    if (createdAt) {
        commentDate = formatDistanceToNow(parseISO(createdAt), {
            addSuffix: true,
        });
    }
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
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
                        <LikeDislikeButton
                            likes={likes}
                            handleLike={likeOpinion}
                            handleDislike={dislikeOpinion}
                            userLiked={userLiked}
                        />
                    </Grid>

                    {getReplies ? (
                        <Grid item>
                            <CommentButton
                                numberOfReplies={numberOfReplies}
                                getReplies={getReplies}
                            />
                        </Grid>
                    ) : null}

                    <Grid item style={{ marginLeft: "auto" }}>
                        {userCtx.user ? (
                            <IconButton
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={handleClick}
                                style={{ fontSize: "1.1em" }}
                            >
                                <MoreVertIcon fontSize="inherit" />
                            </IconButton>
                        ) : null}
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
                {userCtx.user && userCtx.user._id === user._id ? (
                    <MenuItem
                        onClick={(e) => {
                            handleClose(e);
                            deleteOpinion();
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
    );
}
