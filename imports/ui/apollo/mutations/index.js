import gql from 'graphql-tag';





export const CREATE_POST = gql`
	mutation CreatePost ( $params: PostParams ){
		createPost (params: $params){
			_id
		}
	}
`;

export const SAVE_POST = gql`
	mutation SavePost ( $_id: ID!, $params: PostParams ){
		savePost (_id: $_id, params: $params){
			_id
		}
	}
`;


export const DELETE_POST = gql`
	mutation DeletePost ( $_id: ID! ){
		deletePost (_id: $_id){
			_id
		}
	}
`;



export const SEND_USER_INVITES = gql`
	mutation SendUserInvites ( $emails: [String]){
		sendUserInvites (emails: $emails){
			_id
		}
	}
`;

export const CREATE_FRIEND_REQUEST = gql`
	mutation CreateFriendRequest ( $targetUserId: ID! ){
		createFriendRequest (targetUserId: $targetUserId){
			_id
		}
	}
`;

export const ADD_FRIEND_ON_INVITE_SIGNUP = gql`
	mutation AddFriendsOnInviteSignup ( $inviterId: ID! ){
		addFriendsOnInviteSignup (inviterId: $inviterId){
			_id
		}
	}
`;


export const ACCEPT_FRIEND_REQUEST = gql`
	mutation AcceptFriendRequest ( $requestId: ID! ){
		acceptFriendRequest (requestId: $requestId){
			_id
		}
	}
`;

export const CREATE_MESSAGE = gql`
	mutation CreateMessage ( $params: MessageParams ){
		createMessage (params: $params){
			_id
		}
	}
`;

export const SAVE_USER_ACCOUNT = gql`
	mutation SaveUserAccount ( $_id: ID, $params: UserParams ){
		saveUserAccount (_id: $_id, params: $params){
			_id
		}
	}
`;



export const ACCEPT_INVITE = gql`
	mutation AcceptInvite( 
		$params: InviteParams, 
		$password: String, 
		$browserToken: String
	) {
	  acceptInvite( 
	  	params: $params, 
	  	password: $password,  
	  	browserToken: $browserToken
	  ) {
	    _id
	  }
	}
`;

export const SEND_INVITE_EMAIL = gql`
	mutation SendInviteEmail( $params: InviteParams) {
	  sendInviteEmail( params: $params ) {
	    _id
	  }
	}
`;


export const ADMIN_DELETE_USER = gql`
	mutation AdminDeleteUser( $_id: ID!) {
	  adminDeleteUser( _id: $_id ) {
	    _id
	  }
	}
`;


export const ADMIN_CREATE_USER = gql`
	mutation AdminCreateUser($params: UserParams){
	  adminCreateUser(params:$params){
	    _id
	  }
	}
`;

export const SAVE_USER_IMAGE = gql`
	mutation saveUserImage($image: String!){
	  saveUserImage(image:$image){
	    _id
	  }
	}
`;



export const ADMIN_SAVE_USERPROFILE = gql`
	mutation AdminSaveUserProfile (
		$_id: ID!
		$email: String
		$firstName: String
		$lastName: String
		$roles: [String]
		){
		adminSaveUserProfile (
			_id: $_id
			email: $email
			firstName: $firstName
			lastName: $lastName
			roles:  $roles
		){
			_id
		}
	}
`;