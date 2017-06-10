
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