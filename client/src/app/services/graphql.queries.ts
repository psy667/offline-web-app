import gql from 'graphql-tag';

export const ADD_TASK = gql`
    mutation createTask($user: String!, $text: String!){
        createMessage(input: {user: $user, text: $text, image: "", date: ""}){
            id
            text
            user
            image
        }
    }
`;

export const GET_TASKS = gql`
    query allTasks {
        messages {
            id
            user
            text
#            title
#            description
#            version
#            status
        }
    }
`;

export const DELETE_TASK = gql`
    mutation deleteTask($id: ID!){
        deleteTask(id: $id)
    }
`;

export const UPDATE_TASK = gql`
    mutation updateTask($description: String, $id: ID!, $title: String, $version: Int!, $status: TaskStatus) {
        updateTask(description: $description, id: $id, title: $title, version: $version, status: $status) {
            id
            title
            description
            version
            status
        }
    }
`;

export const TASK_ADDED_SUBSCRIPTION = gql`
    subscription taskAdded {
        taskAdded {
            id
            title
            description
            version
            status
        }
    }
`;

export const TASK_DELETED_SUBSCRIPTION = gql`
    subscription taskDeleted {
        taskDeleted {
            id
            title
            description
            version
            status
        }
    }
`;

export const TASK_UPDATED_SUBSCRIPTION = gql`
    subscription taskUpdated {
        taskUpdated {
            id
            title
            description
            version
            status
        }
    }
`;
