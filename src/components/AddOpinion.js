import React, { useState } from "react";
import {
    // Container,
    Grid,
    TextField,
    Avatar,
    Button,
    Box,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import UserProvider from "../contexts/UserProvider";
// import { useMutation } from "@apollo/client";
// import { CREATE_REPLY, GET_REPLIES_OF_opinion } from "../graphql/graphql";

function AddOpinion(props) {
    const { opinion, setOpinion, loading, postBtnPressed, setPostBtnPressed } = props;
    // const [postBtnPressed, setPostBtnPressed] = useState(false);
    const [focus, setFocus] = useState(false);
    const userCtx = React.useContext(UserProvider.context);

    const handleChange = (event, value) => {
        setOpinion(event.target.value);
    };

    const submitOpinion = () => {
        if (!userCtx.user) return;
        if (!opinion || opinion.length < 2) return;
        setPostBtnPressed(true);
        // const sanitizedOpinion = sanitize(opinion);
        props.submitOpinion();
        setOpinion("");
    };

    const onCancel = () => {
        setOpinion("");
    };

    const buttonComponent = (
        <Box marginY={1}>
            <Button
                variant="outlined"
                color="primary"
                style={{ marginRight: "10px" }}
                onClick={() => {
                    submitOpinion();
                    setFocus(false);
                }}
                disabled={postBtnPressed}
            >
                Submit
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
                <Avatar
                    alt={userCtx.user && userCtx.user.name ? userCtx.user.name : ""}
                    src={userCtx.user && userCtx.user.photo ? userCtx.user.photo : ""}
                />
            </Grid>

            <Grid item xs>
                {loading ? (
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
                    id="add-opinion"
                    placeholder={
                        userCtx.user
                            ? "Share your thought"
                            : "Log in to share your thought"
                    }
                    value={opinion}
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

export default AddOpinion;
