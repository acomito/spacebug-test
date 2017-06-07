import React from 'react';
import { browserHistory, Link } from 'react-router';
// ANTD
import Button from 'antd/lib/button';
import Card from 'antd/lib/card';
import message from 'antd/lib/message';
import Tag from 'antd/lib/tag';
import Spin from 'antd/lib/spin';
// APOLLO
import { graphql } from 'react-apollo';
import { USERS_FRIEND_SEARCH } from '/imports/ui/apollo/queries';
import PostCard from '/imports/ui/components/common/PostCard'
import UserCard from '/imports/ui/components/common/UserCard'
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