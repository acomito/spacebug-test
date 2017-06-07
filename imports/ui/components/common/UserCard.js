// TOP LEVE IMPORTS
import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory, Link } from 'react-router';
// ANTD
import Button from 'antd/lib/button';
import Card from 'antd/lib/card';
import message from 'antd/lib/message';
import Tag from 'antd/lib/tag';
import Icon from 'antd/lib/icon';
import Popconfirm from 'antd/lib/popconfirm';
// MODULES
import { DEFAULT_AVATAR, DEFAULT_POST_IMAGE } from '/imports/modules/config';
import { timeAgo } from '/imports/modules/helpers';
import FriendRequestButton from './FriendRequestButton'
//APOLLO
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { CREATE_FRIEND_REQUEST } from '/imports/ui/apollo/mutations'

const PostOwner = ({ user, isFriendRequestCard, currentUser }) => {
	return (
		<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
			<div style={{flex: 1}}>
				<Link to={`/app/users/${user._id}`}>
					<img 
						alt="post-avatar" 
						style={{height: 40, width: 40, borderRadius: '50%'}} 
						src={user && user.profile.image || DEFAULT_AVATAR} 
					/>
				</Link>
			</div>
			<div style={{flex: 3}}>
				<Link style={{fontSize: 17, marginLeft: 3}} to={`/app/users/${user._id}`}>
						{`${user.profile.firstName} ${user.profile.lastName}`}
				</Link>
			</div>
			<div style={{flex: 2}}>
				{isFriendRequestCard && <FriendRequestButton targetUserId={user._id} user={currentUser} />}
			</div>
		</div>
	);
}


const UserCardTop = ({ user, isFriendRequestCard, currentUser }) => {
	return (
		<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
			<div style={{flex: 1, height: 60, width: '100%'}}>
		      	<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
			      	<div style={{flex: 3}}>
				      <PostOwner user={user} isFriendRequestCard={isFriendRequestCard} currentUser={currentUser} />
				    </div>
				    <div style={{flex: 1}}>
				    </div>
			    </div>
		    </div>
	    </div>
	);
}


class UserCard extends React.Component {
	render() {
		const { user, isFriendRequestCard } = this.props;
		return (
			<Card 
				style={{marginTop: '20px', maxWidth: '99%', width: 500}} 
				bodyStyle={{paddingBottom: 5}}
			>
				<UserCardTop user={user} isFriendRequestCard={isFriendRequestCard} currentUser={this.props.currentUser} />
			</Card>
		);
	}
}

UserCard.propTypes = {
  user: PropTypes.object,
  currentUser: PropTypes.object,
  isFriendRequestCard: PropTypes.boolean,
};

// Specifies the default values for props:
UserCard.defaultProps = {
  user: null,
  currentUser: null,
  isFriendRequestCard: false
};



export default UserCard
