import gql from "graphql-tag";

export const GET_MESSAGES = gql`
    query messages {
        messages {
            user
            text
            image
            id
        }
    }
`;


export const ADD_MESSAGE = gql`
    mutation createMessage($user: String!, $text: String!) {
       createMessage(input: {user: $user, text: $text, date: "", image: "$image"}) {
         user
         text
         id
         image
       }
     }
`;
