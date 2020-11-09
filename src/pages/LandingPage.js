import React, { useState } from "react";
import { Container } from "@material-ui/core";
import AddComment from "../components/AddComment";
import CommentList from "../components/CommentList";
import Loading from "../components/Loading";
import ky from "ky";
import {
    useQuery,
    // useMutation, useQueryCache
} from "react-query";
// import UserProvider from "../contexts/UserProvider";

function LandingPage(props) {
    const { totalComments, setTotalComments, sortBy } = props;
    const [allComments, setAllComments] = useState([]);
    // const [profile, setProfile] = useState(null);
    // const userContext = useContext(UserProvider.context);
    // let userId;
    // if (userContext.id) userId = userContext.id;

    const dataFetched = (data) => {
        if (data) {
            setAllComments(data.data);
            setTotalComments(data.results);
        }
    };

    const addToAllComments = (comment) => {
        const comments = [...allComments];
        comments.unshift(comment);
        setAllComments(comments);
        setTotalComments(totalComments + 1);
    };

    const deleteFromAllComments = (commentId) => {
        let comments = [...allComments];
        comments = comments.filter((comment) => comment._id !== commentId);
        setAllComments(comments);
        setTotalComments(totalComments - 1);
    };

    const getComments = async (key) => {
        let url;
        if (sortBy) {
            url = `/comments/?sort=-${sortBy}`;
        } else {
            url = `/comments`;
        }

        try {
            const response = await ky.get(url).json();
            return response;
        } catch (error) {
            console.error(error);
        }
    };

    // const getProfile = async () => {
    //     try {
    //         if (userId) {
    //             const response = await ky
    //                 .get(`/profiles/${userId}`)
    //                 .json();

    //             setProfile(response.data);
    //             console.log(response.data);
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // if (allComments) {
    //     getProfile();
    // }

    // Cache
    // const cache = useQueryCache();
    // Queries
    const { status } = useQuery(["comments"], getComments, {
        // staleTime: 6000,
        onSuccess: dataFetched,
    });

    //Mutations
    // const [addComment] = useMutation(postComment, {
    //     onSuccess: () => {
    //         // Query Invalidations
    //         cache.invalidateQueries("comments");
    //     },
    // });

    return (
        <Container component="main" maxWidth="md">
            <AddComment
                allComments={allComments}
                addToAllComments={addToAllComments}
            />
            {status === "success" && (
                <CommentList
                    allComments={allComments}
                    deleteFromAllComments={deleteFromAllComments}
                />
            )}
            {status === "error" && <p>Error fetching data</p>}
            {status === "loading" && <Loading />}
        </Container>
    );
}

export default LandingPage;
