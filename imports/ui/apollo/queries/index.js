import gql from 'graphql-tag';
import { ownerFragment, postFragment } from './fragments';


// USER QUERIES
// ====================================
export const GET_USERS_ADMIN = gql`
  query getUsersAdmin {
    usersAdmin {
      emails { address, verified },
      roles,
      profile {
        firstName
        lastName
        groupId
        workPhone
        cellPhone
      }
      _id
    }
  }
`;

export const ADMIN_GET_USER_BY_ID = gql`
  query GetUserByIdAdmin($_id: ID!)  {
    getUserByIdAdmin (_id: $_id) {
      emails { address, verified },
      roles,
      profile {
        firstName
        lastName
        groupId
        workPhone
        cellPhone
      }
      _id
    }
  }
`;

export const GET_USERS_FORM = gql`
  query getUsers {
    users {
       _id
      profile {
        firstName
        lastName
      }
    }
  }
`;

export const GET_USERS = gql`
  query getUsers {
    users {
      emails { address, verified },
      roles,
      profile {
        firstName
        lastName
      }
      _id
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query getUserById($_id: ID!) {
    getUserById(_id: $_id) {
      _id
      emails { address, verified }
      roles
      profile { firstName, lastName }
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      ...postFragment
      owner {
        ...ownerFragment
      }
    }
  }
  ${ownerFragment}
  ${postFragment}
`;

export const GET_POST_BY_ID = gql`
  query GetPostById ($_id: ID!) {
    post (_id: $_id) {
      ...postFragment
      owner {
        ...ownerFragment
      }
    }
  }
    ${ownerFragment}
    ${postFragment}
`;

export const GET_MY_POSTS = gql`
  query GetMyPosts {
    myPosts {
      ...postFragment
      owner {
        ...ownerFragment
      }
    }
  }
  ${ownerFragment}
  ${postFragment}
`;


export const GET_USER_DATA = gql`
  query getCurrentUser {
    user {
      emails { address, verified },
      roles,
      profile {
        firstName
        lastName
        cellPhone
        image
        workPhone
      }
      _id
    }
  }
`;