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

function sanitize(string) {
    const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "/": "&#x2F;",
    };
    const reg = /[&<>"'/]/gi;
    return string.replace(reg, (match) => map[match]);
}

export default function AddReply(props) {
    const { commentId, replyId, addToAllReplies } = props;
    //toUser,replyName
    const [reply, setReply] = useState("");
    const [postBtnPressed, setPostBtnPressed] = useState(false);
    const [focus, setFocus] = useState(false);
    const userCtx = useContext(UserProvider.context);

    const handleChange = (event, value) => {
        setReply(event.target.value);
    };

    const submitReply = async () => {
        if (!userCtx.token) return;
        if (!reply || reply.length < 2) return;
        setPostBtnPressed(true);
        const sanitizedReply = sanitize(reply);

        let url = `/comments/${commentId}/replies`;
        if (replyId) url = `/comments/${commentId}/replies/${replyId}`;

        try {
            const response = await ky
                .post(url, {
                    headers: {
                        authorization: `Bearer ${userCtx.token}`,
                    },
                    json: {
                        opinion: sanitizedReply,
                        pageUrl: document.location.origin,
                    },
                })
                .json();
            setReply("");
            addToAllReplies(response.data);
        } catch (error) {
            console.error(error);
        }
        setPostBtnPressed(false);
    };

    const onCancel = () => {
        setReply("");
    };

    const buttonComponent = (
        <Box marginY={1}>
            <Button
                variant="outlined"
                color="primary"
                style={{ marginRight: "10px" }}
                onClick={() => {
                    submitReply();
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
                <Avatar />
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
                    id="add-Reply"
                    placeholder={
                        userCtx.token ? "Add a Reply" : "Log in to add a reply"
                    }
                    value={reply}
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
