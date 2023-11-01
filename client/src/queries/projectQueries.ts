import { gql } from "@apollo/client";

const GET_PROJECT = gql`
  query getProjects {
    projects {
      id
      name
      status
    }
  }
`;

const GET_SINGLE_PROJECT = gql`
  query getProject($id: ID!) {
    project(id: $id) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

export { GET_PROJECT, GET_SINGLE_PROJECT };
