import React from 'react';
import AddDocument from '/imports/ui/components/common/AddDocument'
import DocumentsList from '/imports/ui/components/common/DocumentsList';
// APOLLO
import { graphql } from 'react-apollo';
import { GET_FRIEND_REQUEST_BY_ID } from '/imports/ui/apollo/queries';
import { CREATE_FRIEND_REQUEST } from '/imports/ui/apollo/mutations';
import PostCard from '/imports/ui/components/common/PostCard'
import DiscussionForm from '/imports/ui/components/common/DiscussionForm'
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

class AppFollowMe extends React.Component {
	onSendFriendRequest = () => {
		let targetUserId = this.props.params._id;
		
		let variables = { targetUserId }
		let refetchQueries = [
			{ query: GET_FRIEND_REQUEST_BY_ID, variables }
		]
		this.props.createFriendRequest({ variables, refetchQueries })
		.then(res => {
			console.log(targetUserId)
		})
	}
	render(){

		const { data, user } = this.props;

		if (data.loading) {
			return null
		}
		if (!data.getFriendRequestById) {
			return (
				<Button onClick={this.onSendFriendRequest}>
					SEND FRIEND REQUEST
				</Button>
			);
		}

		if (data.getFriendRequestById && !data.getFriendRequestById.accepted && user.user._id === data.getFriendRequestById.recipientId) {
			return (
				<Button>
					ACCEPT FRIEND REQUEST
				</Button>
			);
		}

		if (data.getFriendRequestById && data.getFriendRequestById.accepted) {
			return (
				<div>
					Request Accepted!
				</div>
			);
		}

		if (data.getFriendRequestById && !data.getFriendRequestById.accepted && user.user._id === data.getFriendRequestById.sentById) {
			return (
				<div>
					YOUR REQUEST IS PENDING...
				</div>
			);
		}
	}
}

let options = (props) => {
	let variables = {
		targetUserId: props.params._id
	}
	return { variables }
}

export default graphql(GET_FRIEND_REQUEST_BY_ID, { options })(
	graphql(CREATE_FRIEND_REQUEST, { name: 'createFriendRequest' })(AppFollowMe)
)