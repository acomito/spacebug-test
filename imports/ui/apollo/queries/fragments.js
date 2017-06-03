
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


export const postFragment = gql`
  fragment postFragment on Post {
      _id
      title
      description
      image
      category
      subcategory
      createdAt
    }
`;