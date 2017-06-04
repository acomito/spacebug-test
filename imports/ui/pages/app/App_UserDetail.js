import React from 'react';
import AddDocument from '/imports/ui/components/common/AddDocument'
import DocumentsList from '/imports/ui/components/common/DocumentsList';
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
import Tag from 'antd/lib/tag';

// APOLLO
import { graphql } from 'react-apollo';
import { GET_USER_BY_ID } from '/imports/ui/apollo/queries';
import PostCard from '/imports/ui/components/common/PostCard'
import FriendRequestButton from '/imports/ui/components/common/FriendRequestButton'

// MODULES
import { DEFAULT_AVATAR } from '/imports/modules/config'

const UserCard = ({ item, user, targetUserId, getUserById }) => {
	return (
		<Card style={{width: 500, maxWidth: '99%', margin: 'auto'}}>
			<div style={{textAlign: 'center'}}>
				<img src={ item.profile.image || DEFAULT_AVATAR } style={{width: 75, height: 75, borderRadius: '50%'}} />
				<h2>{ item.profile.firstName } { item.profile.lastName }</h2>
				{!getUserById.isFriend && targetUserId !== user._id ? <FriendRequestButton targetUserId={targetUserId} user={user} /> : null}
				{getUserById.isFriend && <Tag color='green'>in your network</Tag>}
			</div>
		</Card>
	);
}

const EmptyState = ({ header, subheader, image }) => {
	return (
		<div style={{width: 500, margin: 'auto', maxWidth: '99%', minHeight: 250, display:'flex', alignItems: 'center', justifyContent: 'center'}}>
			<div style={{textAlign: 'center'}}>
				{image && image}
				<h3>{ header }</h3>
				<h4 style={{color: '#888', margin: 0}}>{ subheader }</h4>
			</div>
		</div>
	);
}

const UserPostList = ({ posts, user, getUserById }) => {
	if (!getUserById.isFriend) {
		return (
			<EmptyState 
				header={'You Are not Friends Yet!'}
				subheader={`Send a friend request to see ${ getUserById.profile.firstName }'s Posts`}
				image={<Icon style={{fontSize: 35}} type="user" />}
			/>
		); 
	}
	
	return (
		<div>
			{posts.map(item => {
				return (
					<PostCard key={item._id} item={item} user={user} />
				);
			})}
		</div>
	);
}
 
class AppUserDetail extends React.Component {
	render(){

		if (this.props.data.loading) {
			return null
		}

		return (
			<div style={{width: 600, maxWidth: '98%', margin: 'auto'}}>
				<UserCard 
					getUserById={this.props.data.getUserById}
					item={this.props.data.getUserById} 
					user={this.props.user.user} 
					targetUserId={this.props.params._id} 
				/>
				<h2 style={{textAlign: 'center'}}>{ this.props.data.getUserById.profile.firstName }'s Posts</h2>
				<UserPostList getUserById={this.props.data.getUserById} posts={this.props.data.getUserById.posts} user={this.props.user} />
			</div>
		);
	}
}

let options = (props) =>  {
	let variables = {
		_id: props.params._id
	};
	return { variables }
}

export default graphql(GET_USER_BY_ID, { options })(AppUserDetail);

