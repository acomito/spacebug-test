import gql from 'graphql-tag';
import { ownerFragment, postFragment, messageFragment, facilityFragment } from './fragments';



// GET_MACHINE_MODELS
// ====================================
export const MACHINE_BY_ID = gql`
  query MachineById($_id: ID!) {
    machineById (_id: $_id) {
      _id
      title
    }
  }
`;
// GET_MACHINE_MODELS
// ====================================
export const MANUFACTURER_BY_ID = gql`
  query ManufacturerById($_id: ID!) {
    manufacturerById (_id: $_id) {
      _id
      title
      website
    }
  }
`;

export const CLIENT_BY_ID = gql`
  query ClientById($_id: ID!) {
    clientById (_id: $_id) {
      _id
      title
      facilities {
        _id
        title
      }
    }
  }
`;


export const FACILITY_BY_ID = gql`
  query FacilityById($_id: ID!) {
    facilityById (_id: $_id) {
      ...facilityFragment
    }
  }
  ${facilityFragment}
`;


export const MACHINE_MODEL_BY_ID = gql`
  query MachineModelById($_id: ID!) {
    machineModelById (_id: $_id) {
      _id
      title
      category
      manufacturer {
        _id
        title
      }
    }
  }
`;

// GET_MACHINE_MODELS
// ====================================
export const GET_MACHINE_MODELS = gql`
  query GetMachineModels {
    machineModels {
      _id
      title
      category
      manufacturerId
      manufacturer {
        _id
        title
      }
    }
  }
`;

// GET_FACILITIES
// ====================================
export const GET_FACILITIES = gql`
  query GetFacilities ($params: FacilityParams) {
    facilities(params: $params) {
      _id
      title
      clientId
      client {
        _id
        title
      }
    }
  }
`;

// GET_FACILITIES
// ====================================
export const GET_MANUFACTURERS = gql`
  query GetManufacturers ($params: ManufacturerParams) {
    manufacturers(params: $params) {
      _id
      title
      website
    }
  }
`;

// GET_MACHINES
// ====================================
export const GET_MACHINES = gql`
  query GetMachines ($params: MachineParams) {
    machines(params: $params) {
      _id
      title
      facility {
        _id
        title
      }
      machineModel {
        _id
        title
        manufacturer {
          _id
          title
        }
      }
    }
  }
`;


// USER QUERIES
// ====================================
export const GET_CLIENTS = gql`
  query GetClients ($params: ClientParams) {
    clients(params: $params) {
      _id
      title
    }
  }
`;

// USER QUERIES
// ====================================
export const USERS_FRIEND_SEARCH = gql`
  query UsersFriendSearch($params: UserSearchParams) {
    usersFriendSearch (params: $params) {
      _id
      profile {
        firstName
        lastName
        image
      }
    }
  }
`;



// GET_INCOMING_FRIEND_REQUESTS QUERIES
// ====================================
export const GET_INCOMING_FRIEND_REQUESTS = gql`
  query getIncomingReqests {
    getIncomingReqests {
      _id
      accepted
      sentById
      recipientId
      sentByUser {
        _id
        profile {
          firstName
          lastName
          image
        }
      }
    }
  }
`;


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
      posts {
        ...postFragment
      }
      profile { 
        firstName, 
        lastName, 
        image 
      }
    }
  }
  ${postFragment}
`;

export const GET_POSTS = gql`
  query GetPosts($params: PostParams) {
    posts (params: $params){
      ...postFragment
    }
  }
  ${postFragment}
`;

export const GET_POST_BY_ID = gql`
  query GetPostById ($_id: ID!) {
    post (_id: $_id) {
      ...postFragment
      comments {
        ...messageFragment
      }
    }
  }
    ${postFragment}
    ${messageFragment}
`;

export const GET_MY_POSTS = gql`
  query GetMyPosts {
    myPosts {
      ...postFragment
    }
  }
  ${postFragment}
`;


export const GET_ALL_POSTS = gql`
  query AllPosts {
    allPosts {
      ...postFragment
    }
  }
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