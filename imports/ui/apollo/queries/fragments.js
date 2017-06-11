
import gql from 'graphql-tag';


export const ownerFragment = gql`
  fragment ownerFragment on User {
      _id
      profile {
      	firstName
      	lastName
      	image
      }
    }
`;


export const facilityFragment = gql`
  fragment facilityFragment on Facility {
      _id
      title
      clientId
      client {
        _id
        title
      }
      machines {
        _id
        title
      }
      location {
        street
        street1
        street2
        postal
        city
        state
        country
      }
    }
`;

export const messageFragment = gql`
  fragment messageFragment on Message {
      _id
      messageValue
      parentId
      parentModelType
      owner {
        ...ownerFragment
      }
    }
`;


export const postFragment = gql`
  fragment postFragment on Post {
      _id
      title
      description
      image
      category
      subcategory
      createdAt
      subcategory
      status
      price
      numberOfComments
      owner {
        ...ownerFragment
      }
    }
    ${ownerFragment}
`;