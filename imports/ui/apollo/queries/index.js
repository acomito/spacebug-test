import gql from 'graphql-tag';



export const GET_USERS = gql`
  query getUsers {
    users {
      emails { address, verified },
      roles,
      _id
    }
  }
`;

export const GET_USER = gql`
	query getUserById($_id: ID!) {
		getUserById(_id: $_id) {
			_id
			emails { address, verified }
			roles
			profile { firstName, lastName }
		}
	}
`;


export const GET_USER_DATA = gql`
  query getCurrentUser {
    user {
      emails { address, verified },
      roles,
      _id
    }
  }
`;