import React, { useState } from "react";
import UserProvider from "../contexts/UserProvider";
import { useMutation } from "@apollo/client";
import { CREATE_COMMENT, GET_COMMENTS } from "../graphql/graphql";
import AddOpinion from "./AddOpinion";

function AddComment(props) {
    const { postId, pageUrl } = props;
    const [comment, setComment] = useState("");
    const [postBtnPressed, setPostBtnPressed] = useState(false);
    // const [postedComments, setPostedComments] = useState([]);
    const userCtx = React.useContext(UserProvider.context);

    const [addComment, { loading }] = useMutation(CREATE_COMMENT, {
        update(proxy, result) {
            try {
                const data = proxy.readQuery({
                    query: GET_COMMENTS,
                    variables: { postId },
                });

                // console.log(data);
                proxy.writeQuery({
                    query: GET_COMMENTS,
                    variables: { postId },
                    data: {
                        getComments: [result.data.createComment, ...data.getComments],
                    },
                });
                setComment("");
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

    const submitComment = () => {
        if (!userCtx.user) return;
        // const sanitizedComment = sanitize(comment);
        addComment({
            variables: {
                body: comment,
                postId,
                pageUrl,
            },
        });
    };

    return (
        <AddOpinion
            opinion={comment}
            setOpinion={setComment}
            submitOpinion={submitComment}
            loading={loading}
            postBtnPressed={postBtnPressed}
            setPostBtnPressed={setPostBtnPressed}
        />
    );
}

export default AddComment;
