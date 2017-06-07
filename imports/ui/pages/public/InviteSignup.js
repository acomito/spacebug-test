import React from 'react';
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
//
import SignupForm from '/imports/ui/components/common/SignupForm';
// APOLLO
import { graphql } from 'react-apollo';
import { ADD_FRIEND_ON_INVITE_SIGNUP, ACCEPT_FRIEND_REQUEST } from '/imports/ui/apollo/mutations';
//common
import { AlreadyLoggedIn } from '/imports/ui/components/common/AlreadyLoggedIn'


class InviteSignup extends React.Component {
	getContent = () => {
		const { data, params, addFriendsOnInviteSignup } = this.props;
		if (!data || !data.user || data.user === null) {
			return <SignupForm inviteForm inviterId={params._id} addFriendsOnInviteSignup={addFriendsOnInviteSignup} /> 
		} else {
			return <AlreadyLoggedIn user={data.user} />
		}

	}
	render(){
		const { data } = this.props.data
		return (
			<div>
				{this.getContent()}
			</div>
		);
	}
}

export default graphql(ADD_FRIEND_ON_INVITE_SIGNUP, { name: 'addFriendsOnInviteSignup'})(InviteSignup);