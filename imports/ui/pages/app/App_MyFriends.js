import React from 'react';
import { Link } from 'react-router';
import AddDocument from '/imports/ui/components/common/AddDocument'
import UserCard from '/imports/ui/components/common/UserCard';
//antd
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';
import Card from 'antd/lib/card';
import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import InputNumber from 'antd/lib/input-number';
import Select from 'antd/lib/select';
import message from 'antd/lib/message';
// APOLLO
import { graphql } from 'react-apollo';
import { GET_INCOMING_FRIEND_REQUESTS, GET_MY_FRIENDS } from '/imports/ui/apollo/queries';
import { ACCEPT_FRIEND_REQUEST } from '/imports/ui/apollo/mutations';
// MODULES
import { DEFAULT_AVATAR } from '/imports/modules/config';
// COMPONETS
import PostCard from '/imports/ui/components/common/PostCard'
import DiscussionForm from '/imports/ui/components/common/DiscussionForm';
import UsersSearch from '/imports/ui/components/common/UsersSearch'
import InviteModal from '/imports/ui/components/common/InviteModal'
import FriendRequestButton from '/imports/ui/components/common/FriendRequestButton'
import EmptyState from '/imports/ui/components/common/EmptyState'



const FriendList = () => {
	return (
		<div style={{padding: 20}}>
			<Card>
				FRIEND
			</Card>
			<Card>
				FRIEND
			</Card>
			<Card>
				FRIEND
			</Card>
			<Card>
				FRIEND
			</Card>
			<Card>
				FRIEND
			</Card>
		</div>
	);
}
 
class AppMyFriends extends React.Component {
	
	onAcceptFriendRequest = (requestId) => {
		console.log(requestId)
		let variables = { requestId }
		let refretchQueries = [
			{ query: GET_INCOMING_FRIEND_REQUESTS },
			{ query: GET_MY_FRIENDS }
		]
		this.props.acceptFriendRequest({ variables, refretchQueries }).then( res => {
			message.success('request accpeted!')
		});
	}
	renderFriendsList = () => {
		const { myFriendsData } = this.props;
		if (!myFriendsData || myFriendsData.loading || myFriendsData.myFriends.length < 0) {
			return (
				<EmptyState 
					header='No Friends Yet!'
					subheader={''}
				/>
			);
		}
		return (
			<div>
				{myFriendsData.myFriends.map( item => {
					let { friend } = item;
					return (
						<UserCard key={item._id} user={friend} />
					)
				})}
			</div>
		);
	}
	renderIncomingRequests = () => {
		const { getIncomingReqests }= this.props.data;

		if (getIncomingReqests && getIncomingReqests.length === 0) {
			return (
				<EmptyState
					header='No requests right now...'
					subheader="You should invite friends to the app..."
					image={<Icon style={{fontSize: 35}} type='user' />}
				/>
			);
		}
		return (
			<div>
				{getIncomingReqests.map(item => {
					console.log(item.sentById)
					return (
						<Card key={item._id}>
							<div style={{display: 'flex'}}>
								<div style={{flex: 1}}>
									<img 
										src={item.sentByUser.profile.image || DEFAULT_AVATAR} 
										style={{height: 40, width: 40, borderRadius: '50%'}}
									/>
								</div>
								<div style={{flex: 1}}>
									<p>
										{item.sentByUser.profile.firstName}
										{item.sentByUser.profile.lastName}
									</p>
								</div>
								<div style={{flex: 3}}>
									<FriendRequestButton user={this.props.user.user} targetUserId={item.sentById} />
								</div>
							</div>
						</Card>
					)
				})}
			</div>
		)
	}
	render(){

		if (this.props.data.loading) {
			return null
		}

		return (
			<div style={{width: 600, maxWidth: '98%', margin: 'auto'}}>
				<div style={{marginTop: 20, minHeight: 550}}>
					<h2>CONNECT</h2>
					<UsersSearch currentUser={this.props.user.user} />
				</div>
					<InviteModal 
						user={this.props.user.user} 
						buttonText={'or, Invite new people'}
						linkStyles={{}} 
					/>
				<div style={{marginTop: 50, minHeight: 300}}>
					<h2>PENDING REQUESTS</h2>
					{this.renderIncomingRequests()}
				</div>
				<div style={{marginTop: 50, minHeight: 300}}>
					<h2>MY FRIENDS</h2>
					{this.renderFriendsList()}
				</div>
			</div>
		);
	}
}

export default graphql(GET_INCOMING_FRIEND_REQUESTS)(
	graphql(ACCEPT_FRIEND_REQUEST, { name: 'acceptFriendRequest' })(
		graphql(GET_MY_FRIENDS, { name: 'myFriendsData' })(AppMyFriends)
	)
);