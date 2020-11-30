import { gql } from "@apollo/client";

export const GET_COMMENTS = gql`
    query getComments {
        getComments {
            _id
            body
            likes
            replies
            user {
                _id
                name
                photo
            }
            createdAt
        }
    }
`;

export const GET_LIKED_POSTS = gql`
    query getLikedPosts($userId: ID!) {
        getLikedPosts(userId: $userId) {
            postId
            userId
        }
    }
`;

export const UPDATE_POST = gql`
    mutation updatePost($postId: ID!) {
        updatePost(postId: $postId) {
            body
        }
    }
`;

export const GET_REPLIES_OF_COMMENT = gql`
    query getReplies($commentId: ID!) {
        getReplies(commentId: $commentId) {
            _id
            body
            likes
            user {
                _id
                name
                photo
            }
            createdAt
        }
    }
`;

export const CREATE_COMMENT = gql`
    mutation createComment($postId: ID!, $body: String!) {
        createComment(postId: $postId, body: $body) {
            _id
            body
            user
            createdAt
        }
    }
`;

export const LIKE_COMMENT = gql`
    mutation likeComment($commentId: ID!) {
        likeComment(commentId: $commentId)
    }
`;

export const DELETE_COMMENT = gql`
    mutation deleteComment($commentId: ID!) {
        deleteComment(commentId: $commentId)
    }
`;

export const CREATE_REPLY = gql`
    mutation createPost($body: String!) {
        createPost(body: $body) {
            _id
            body
            likes
            comments
            user {
                _id
                name
                photo
            }
            createdAt
        }
    }
`;

export const DELETE_REPLY = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId)
    }
`;

export const LIKE_REPLY = gql`
    mutation likePost($postId: ID!) {
        likePost(postId: $postId) {
            _id
            body
            likes
            createdAt
        }
    }
`;

export const SIGNUP_INPUT = gql`
    mutation signup(
        $name: String!
        $email: EmailAddress!
        $password: String!
        $confirmPassword: String!
    ) {
        signup(
            name: $name
            email: $email
            password: $password
            confirmPassword: $confirmPassword
        ) {
            _id
            email
            photo
            token
        }
    }
`;

export const LOGIN_INPUT = gql`
    mutation login($email: EmailAddress!, $password: String!) {
        login(email: $email, password: $password) {
            _id
            name
            email
            photo
            token
        }
    }
`;
