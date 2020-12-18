import React from "react";
import { Container } from "@material-ui/core";
import CommentList from "../components/CommentList";
import AddComment from "../components/AddComment";
// import Notification from "../components/Notification";
// import { GET_LIKED_POSTS } from "../graphql/graphql";
// import { useLazyQuery } from "@apollo/client";
// import UserProvider from "../contexts/UserProvider";
import NavBar from "../components/NavBar";

function Home(props) {
    // console.log(props.hostData);
    const { postId, pageUrl } = props.hostData;
    // const [totalComments, setTotalComments] = useState(0);
    // const [sortBy, setSortBy] = useState(null);
    // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

    // const sortComments = (key) => {
    //     switch (key) {
    //         case "likes":
    //             setSortBy("likes");
    //             break;
    //         case "newest":
    //             setSortBy("createdAt");
    //             break;

    //         default:
    //             break;
    //     }
    // };
    // const { data } = useQuery(GET_LIKED_POSTS, {
    //     variables: {
    //         userId: userCtx.user._id,
    //     },
    // });

    //totalComments={totalComments} sortComments={sortComments}

    return (
        <Container maxWidth="md">
            <NavBar />
            <AddComment postId={postId} pageUrl={pageUrl} />
            <CommentList postId={postId} pageUrl={pageUrl} />
        </Container>
    );
}

export default Home;
