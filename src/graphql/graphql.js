import { gql } from "@apollo/client";

export const GET_COMMENTS = gql`
    query getComments($postId: ID!) {
        getComments(postId: $postId) {
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
            userLiked
        }
    }
`;

export const CREATE_COMMENT = gql`
    mutation createComment($postId: ID!, $body: String!, $pageUrl: String!) {
        createComment(postId: $postId, body: $body, pageUrl: $pageUrl) {
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
            userLiked
        }
    }
`;

export const LIKE_COMMENT = gql`
    mutation likeComment($commentId: ID!, $postId: ID!) {
        likeComment(commentId: $commentId, postId: $postId) {
            _id
            likes
        }
    }
`;

export const DELETE_COMMENT = gql`
    mutation deleteComment($commentId: ID!) {
        deleteComment(commentId: $commentId)
    }
`;

export const CREATE_POST = gql`
    mutation createPost($postId: ID!, $pageUrl: String!, $title: String) {
        createPost(postId: $postId, pageUrl: $pageUrl, title: $title)
    }
`;

export const UPDATE_POST = gql`
    mutation updatePost($postId: ID!) {
        updatePost(postId: $postId) {
            body
        }
    }
`;

export const CREATE_REPLY = gql`
    mutation createReply($commentId: ID!, $body: String!) {
        createReply(commentId: $commentId, body: $body) {
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

export const GET_REPLIES = gql`
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

export const LIKE_REPLY = gql`
    mutation likeReply($replyId: ID!) {
        likeReply(replyId: $replyId) {
            _id
            likes
        }
    }
`;

export const DELETE_REPLY = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId)
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
