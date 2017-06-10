import React from 'react';
import { browserHistory, Link } from 'react-router';
// ANTD
import Button from 'antd/lib/button';
import Card from 'antd/lib/card';
import message from 'antd/lib/message';
import Tag from 'antd/lib/tag';
import Spin from 'antd/lib/spin';
import Icon from 'antd/lib/icon';
// APOLLO
import { graphql } from 'react-apollo';
import { USERS_FRIEND_SEARCH } from '/imports/ui/apollo/queries';
// COMPONENTS
import PostCard from '/imports/ui/components/common/PostCard'
import UserCard from '/imports/ui/components/common/UserCard'
import EmptyState from '/imports/ui/components/common/EmptyState'
import InviteModal from '/imports/ui/components/common/InviteModal'
// REDUX
import { connect } from 'react-redux'
import * as actions from '/imports/ui/redux/actions'
//



class UsersSearchList extends React.Component {
	renderUsers = () => {
		const { data } = this.props;
		if (data && data.usersFriendSearch.length > 0){
			return (
				<div>
					{data.usersFriendSearch.map(item => <UserCard key={item._id} user={item} isFriendRequestCard currentUser={this.props.currentUser} />)}
				</div>
			);
		}
	}
	render() {
		if (this.props.data.loading) {
			return <p>searching...</p>
		}

		if (this.props.data.usersFriendSearch && this.props.data.usersFriendSearch.length === 0) {
			return (
				<EmptyState
					header='No Results...'
					subheader="We couldn't find anyone matching your search..." 
					image={<Icon style={{fontSize: 45}} type="team" />}
					actionLink={<InviteModal user={this.props.currentUser} buttonText={'Invite new people'} linkStyles={{marginTop: 10}} />}
				/>
			);
		}

		return (
			<div style={{height: '100%', minHeight: 200, marginTop: 15, display: 'flex', alignItems: 'flex-start', justifyContent: 'top'}}>
				{this.renderUsers()}
			</div>
		);
	}
}

let options = (props) => {
	let params = {
		searchText: props.searchText
	}

	return { 
		variables: { params }
	} 
}

let ComponentWithData = graphql(USERS_FRIEND_SEARCH, { options })(UsersSearchList);


let mapStateToProps = ({ search }) => {
	return {
		searchText: search.searchText_friends,
	}
}


export default connect(mapStateToProps, actions)(ComponentWithData)