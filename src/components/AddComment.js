import React, { useState, useContext } from "react";
import {
    // Container,
    Grid,
    TextField,
    Avatar,
    Button,
    Box,
} from "@material-ui/core";
import ky from "ky";
import CircularProgress from "@material-ui/core/CircularProgress";
import UserProvider from "../contexts/UserProvider";

// function sanitize(string) {
//     const map = {
//         "&": "&amp;",
//         "<": "&lt;",
//         ">": "&gt;",
//         '"': "&quot;",
//         "'": "&#x27;",
//         "/": "&#x2F;",
//     };
//     const reg = /[&<>"'/]/gi;
//     return string.replace(reg, (match) => map[match]);
// }

export default function AddComment(props) {
    const { addToAllComments } = props;
    const [comment, setComment] = useState(props.comment || "");
    const [postBtnPressed, setPostBtnPressed] = useState(false);
    const [focus, setFocus] = useState(false);
    // const [postedComments, setPostedComments] = useState([]);
    const userCtx = useContext(UserProvider.context);

    const handleChange = (event, value) => {
        setComment(event.target.value);
    };

    const submitComment = async () => {
        if (!userCtx.token) return;
        if (!comment || comment.length < 2) return;
        setPostBtnPressed(true);
        // const sanitizedComment = sanitize(comment);
        try {
            const response = await ky
                .post("/comments", {
                    headers: {
                        authorization: `Bearer ${userCtx.token}`,
                    },
                    json: {
                        opinion: comment,
                        pageUrl: document.location.origin,
                    },
                })
                .json();
            setComment("");
            addToAllComments(response.data);
        } catch (error) {
            console.error(error);
        }
        setPostBtnPressed(false);
    };

    const onCancel = () => {
        setComment("");
    };

    const buttonComponent = (
        <Box marginY={1}>
            <Button
                variant="outlined"
                color="primary"
                style={{ marginRight: "10px" }}
                onClick={() => {
                    submitComment();
                    setFocus(false);
                }}
                disabled={postBtnPressed}
            >
                Post
            </Button>

            <Button
                variant="outlined"
                color="default"
                onClick={() => {
                    onCancel();
                    setFocus(false);
                }}
                disabled={postBtnPressed}
            >
                Cancel
            </Button>
        </Box>
    );

    return (
        <Grid
            container
            spacing={1}
            style={{ marginTop: "0.5rem", marginBottom: "0.5em" }}
        >
            <Grid item style={{ marginRight: "0.5em", marginTop: "0.5em" }}>
                <Avatar alt={userCtx.name} src={userCtx.photo} />
            </Grid>

            <Grid item xs>
                {postBtnPressed ? (
                    <div
                        style={{
                            position: "absolute",
                            marginLeft: "1em",
                            marginTop: "0.5em",
                        }}
                    >
                        <CircularProgress />
                    </div>
                ) : null}

                <TextField
                    id="add-comment"
                    placeholder={
                        userCtx.token
                            ? "Add a comment"
                            : "Log in to post a comment"
                    }
                    value={comment}
                    fullWidth
                    variant="outlined"
                    multiline
                    onChange={handleChange}
                    onFocus={() => setFocus(true)}
                    disabled={postBtnPressed}
                />

                {focus ? buttonComponent : null}
                {/* userLoggedIn ? buttonComponent : null */}
            </Grid>
        </Grid>
    );
}
