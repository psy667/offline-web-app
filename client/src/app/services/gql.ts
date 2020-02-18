import gql from "graphql-tag";

export const messageQuery = gql`
    query getMessages {
        messages {
            user
            text
            id
        }
    }
`;


export const addMessage = gql`
    mutation SendMessage($user: String!, $text: String!) {
       createMessage(input: {user: $user, text: $text, date: "", image: ""}) {
         __typename
         user
         text
         id
       }
     }
`

