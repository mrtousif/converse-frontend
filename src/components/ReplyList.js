import React from "react";
import Reply from "./Reply";
import { Grid, Divider } from "@material-ui/core";
import AddReply from "./AddReply";
// import { comments } from './data';
// import Loading from "./Loading";

function ReplyList(props) {
    const { commentId, allReplies, addToAllReplies } = props;

    // allReplies.map((reply) => {
    //     const { userName, id, updatedAt, likes, userReply } = reply;
    // })

    return (
        <Grid container direction="column">
            <AddReply commentId={commentId} addToAllReplies={addToAllReplies} />
            {/* toUser={userName} */}
            {allReplies.length > 0
                ? allReplies.map((reply) => (
                      <Reply
                          key={reply.id}
                          reply={reply}
                          commentId={commentId}
                          //   toUser={userName}
                      />
                  ))
                : null}

            <Divider />
        </Grid>
    );
}

export default ReplyList;
