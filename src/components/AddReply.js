import React, { useState } from "react";
import {
    // Container,
    Grid,
} from "@material-ui/core";
import UserProvider from "../contexts/UserProvider";
import AddOpinion from "./AddOpinion";
import { useMutation } from "@apollo/client";
import { CREATE_REPLY, GET_REPLIES } from "../graphql/graphql";

function AddReply(props) {
    const { commentId } = props;
    const [reply, setReply] = useState("");
    const [postBtnPressed, setPostBtnPressed] = useState(false);
    // const [postedComments, setPostedComments] = useState([]);
    const userCtx = React.useContext(UserProvider.context);

    const [addReply, { loading }] = useMutation(CREATE_REPLY, {
        update(proxy, result) {
            try {
                const data = proxy.readQuery({
                    query: GET_REPLIES,
                    variables: {
                        commentId,
                    },
                });

                // console.log(data);
                // console.log(result);
                proxy.writeQuery({
                    query: GET_REPLIES,
                    variables: {
                        commentId,
                    },
                    data: {
                        getReplies: [result.data.createReply, ...data.getReplies],
                    },
                });
                setReply("");
                setPostBtnPressed(false);
            } catch (error) {
                console.error(error);
            }
        },

        onError(err) {
            console.warn(err);
            return err;
        },
    });

    const submitReply = () => {
        if (!userCtx.user) return;
        // const sanitizedComment = sanitize(comment);
        addReply({
            variables: {
                body: reply,
                commentId,
            },
        });
    };

    return (
        <Grid container>
            <AddOpinion
                opinion={reply}
                setOpinion={setReply}
                submitOpinion={submitReply}
                loading={loading}
                postBtnPressed={postBtnPressed}
                setPostBtnPressed={setPostBtnPressed}
            />
        </Grid>
    );
}

export default AddReply;
