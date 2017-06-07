import React from 'react';
import UsersSearchList from './UsersSearchList'
// ANTD
import Input from 'antd/lib/input';
// REDUX
import { connect } from 'react-redux'
import * as actions from '/imports/ui/redux/actions'

// CONSTANTS & DESTRUCTURING
// ====================================
const Search = Input.Search;


class UsersSearch extends React.Component {
	render(){
		return (
			<div>
				<Search
				    placeholder="search users..."
				    style={{ width: 225, marginBottom: 5 }}
				    onChange={e => this.props.onFriendSearchTextChange(e.target.value)}
				  />
				<UsersSearchList currentUser={this.props.currentUser} />
			</div>
		);
	}
}

let mapStateToProps = ({ search }) => {
	return {
		searchText: search.searchText_friends,
	}
}


export default connect(mapStateToProps, actions)(UsersSearch)