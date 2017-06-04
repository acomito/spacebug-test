import React from 'react';
import AddDocument from '/imports/ui/components/common/AddDocument'
import DocumentsList from '/imports/ui/components/common/DocumentsList';
// APOLLO
import { graphql } from 'react-apollo';
import { GET_FRIEND_REQUEST_BY_ID, GET_INCOMING_FRIEND_REQUESTS, GET_MY_FRIENDS  } from '/imports/ui/apollo/queries';
import { CREATE_FRIEND_REQUEST, ACCEPT_FRIEND_REQUEST } from '/imports/ui/apollo/mutations';
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
import Tag from 'antd/lib/tag';
import message from 'antd/lib/message';


class FriendRequestButton extends React.Component {
	state = {
		loading: false
	}
	onAcceptFriendRequest = () => {
		const { data, acceptFriendRequest } = this.props;
		this.setState({ loading: true });
		let variables = { requestId: data.getFriendRequestById._id }
		let refretchQueries = [
			{ query: GET_INCOMING_FRIEND_REQUESTS },
			{ query: GET_MY_FRIENDS },
			{ query: GET_FRIEND_REQUEST_BY_ID, variables: { targetUserId } }
		]
		acceptFriendRequest({ variables, refretchQueries })
		.then( res => {
			setTimeout(()=>{
				message.success('request accpeted!')
				return this.setState({ loading: false });
			}, 1000);
			
		}).catch(e => {
			this.setState({ loading: false });
		});
	}
	onSendFriendRequest = () => {
		let targetUserId = this.props.targetUserId;
		this.setState({ loading: true });
		let variables = { targetUserId }
		let refetchQueries = [
			{ query: GET_FRIEND_REQUEST_BY_ID, variables }
		]
		this.props.createFriendRequest({ variables, refetchQueries })
		.then(res => {
			setTimeout(()=>{
				return this.setState({ loading: false });
			}, 1000);
			
		})
		.catch(e => {
			this.setState({ loading: false });
		})
	}
	render(){

		const { data, user } = this.props;

		if (data.loading) {
			return null
		}
		if (!data.getFriendRequestById) {
			return (
				<Button loading={this.state.loading} disabled={this.state.loading} type='primary' onClick={this.onSendFriendRequest}>
					{!this.state.loading ? 'SEND FRIEND REQUEST' : 'SENDING'}
				</Button>
			);
		}

		if (data.getFriendRequestById && !data.getFriendRequestById.accepted && user._id === data.getFriendRequestById.recipientId) {
			return (
				<Button onClick={this.onAcceptFriendRequest} type='primary' loading={this.state.loading} disabled={this.state.loading}>
					ACCEPT FRIEND REQUEST
				</Button>
			);
		}

		if (data.getFriendRequestById && data.getFriendRequestById.accepted) {
			return (
				<Tag color='green'>
					in your network
				</Tag>
			);
		}

		if (data.getFriendRequestById && !data.getFriendRequestById.accepted && user._id === data.getFriendRequestById.sentById) {
			return (
				<Button type='default' disabled>
					YOUR REQUEST IS PENDING...
				</Button>
			);
		}
	}
}

let options = (props) => {
	let variables = {
		targetUserId: props.targetUserId
	}
	return { variables }
}

export default graphql(GET_FRIEND_REQUEST_BY_ID, { options })(
	graphql(ACCEPT_FRIEND_REQUEST, { name: 'acceptFriendRequest' })(
		graphql(CREATE_FRIEND_REQUEST, { name: 'createFriendRequest' })(FriendRequestButton)
	)
)